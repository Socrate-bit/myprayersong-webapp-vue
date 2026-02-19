<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../../../services/firebase'
import { useFunnelStore } from '../../../stores/funnel'
import { PRICE_NOW, PRICE_EXPRESS } from '@/constants'

declare global {
  interface Window {
    dlocalGo: {
      initialize(key: string, token: string): Promise<void>
      fields(): { create(type: string, options?: object): DlocalField }
      createCardToken(field: DlocalField, opts: { name: string }): Promise<{ token: string }>
      onInstallmentsChange(cb: (opts: DlocalInstallmentOption[]) => void): void
    }
  }
}

interface DlocalField {
  mount(el: HTMLElement | string): void
  unmount(): void
}

interface DlocalInstallmentOption {
  id: string
  installments: number
  installment_amount: number
  total_amount: number
  currency: string
}

const props = defineProps<{
  isOpen: boolean
  email: string
  name: string
}>()

const emit = defineEmits(['close', 'success', 'error'])

const { t } = useI18n()
const store = useFunnelStore()

// Form state
const fullName = ref(props.name)
const localEmail = ref(props.email)
const confirmEmail = ref(props.email)
const cpf = ref('')
const selectedMethod = ref<'credit_card' | 'pix'>('credit_card')

// SmartFields state
const checkoutToken = ref('')
const paymentId = ref('')
const panField = ref<DlocalField | null>(null)
const expirationField = ref<DlocalField | null>(null)
const cvvField = ref<DlocalField | null>(null)
const dlocalInstallments = ref<DlocalInstallmentOption[]>([])
const selectedInstallmentId = ref('')
const isLoading = ref(false)
const initError = ref('')
const isSmartFieldsReady = ref(false)

// Submission state
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Sync props
watch(() => props.email, (v) => { localEmail.value = v; confirmEmail.value = v })
watch(() => props.name, (v) => { fullName.value = v })

// Init / cleanup on modal open/close
watch(() => props.isOpen, async (open) => {
  if (open) {
    errors.value = {}
    initError.value = ''
    await initPayment()
  } else {
    cleanup()
  }
})

const cleanup = () => {
  panField.value?.unmount()
  expirationField.value?.unmount()
  cvvField.value?.unmount()
  panField.value = null
  expirationField.value = null
  cvvField.value = null
  checkoutToken.value = ''
  paymentId.value = ''
  dlocalInstallments.value = []
  selectedInstallmentId.value = ''
  isSmartFieldsReady.value = false
}

const loadSdk = (): Promise<void> => {
  if (window.dlocalGo) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.dlocalgo.com/js/dlocalgo-smartfields-bundled.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Dlocal SDK'))
    document.head.appendChild(script)
  })
}

const initPayment = async () => {
  isLoading.value = true
  initError.value = ''
  try {
    const fn = httpsCallable<object, { checkoutToken: string; paymentId: string; smartFieldsKey: string }>(
      functions, 'createDlocalTransparentPayment'
    )
    const result = await fn({
      email: props.email,
      isExpress: store.answers.isExpress,
      origin: window.location.origin,
      recipientName: store.answers.recipientName,
      recipient: store.answers.recipient,
      genre: store.answers.genre,
      voiceGender: store.answers.voiceGender,
      qualities: store.answers.qualities,
      memories: store.answers.memories,
      specialMessage: store.answers.specialMessage,
    })

    console.log('result', result.data)
    checkoutToken.value = result.data.checkoutToken
    paymentId.value = result.data.paymentId

    await loadSdk()
    isLoading.value = false
    await nextTick()
    await initSmartFields(result.data.smartFieldsKey)
  } catch (err) {
    console.error('Error initializing payment:', err)
    initError.value = t('payment.genericError')
    isLoading.value = false
  }
}

const initSmartFields = async (smartFieldsKey: string) => {
  await window.dlocalGo.initialize(smartFieldsKey, checkoutToken.value)
  const fields = window.dlocalGo.fields()
  const style = {
    base: {
      fontSize: '14px',
      fontFamily: 'inherit',
      color: '#374151',
      '::placeholder': { color: '#9ca3af' },
    },
  }

  panField.value = fields.create('pan', { style })
  expirationField.value = fields.create('expiration', { style })
  cvvField.value = fields.create('cvv', { style })

  const panEl = document.getElementById('dlocal-pan')
  const expEl = document.getElementById('dlocal-expiration')
  const cvvEl = document.getElementById('dlocal-cvv')
  if (!panEl || !expEl || !cvvEl) throw new Error('Dlocal containers not found in DOM')

  panField.value.mount(panEl)
  expirationField.value.mount(expEl)
  cvvField.value.mount(cvvEl)

  window.dlocalGo.onInstallmentsChange((options) => {
    dlocalInstallments.value = options
    console.log('dlocalInstallments', dlocalInstallments.value)
    if (options.length > 0) selectedInstallmentId.value = options[0].id
  })
  isSmartFieldsReady.value = true
}

const validate = () => {
  errors.value = {}
  if (!fullName.value.trim()) errors.value.name = t('paymentModal.nameLabel') + ' é obrigatório'
  if (!localEmail.value) errors.value.email = t('payment.emailRequiredError')
  else if (!localEmail.value.includes('@')) errors.value.email = t('payment.validEmailError')
  if (confirmEmail.value !== localEmail.value) errors.value.confirmEmail = 'Os e-mails não coincidem'
  if (!cpf.value) errors.value.cpf = t('paymentModal.cpfLabel') + ' é obrigatório'
  return Object.keys(errors.value).length === 0
}

const handlePayment = async () => {
  if (!validate()) return
  if (selectedMethod.value === 'credit_card' && !isSmartFieldsReady.value) return

  isSubmitting.value = true
  try {
    if (selectedMethod.value === 'credit_card') {
      const tokenResult = await window.dlocalGo.createCardToken(panField.value!, { name: fullName.value })

      const nameParts = fullName.value.trim().split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ') || firstName

      const rawDoc = cpf.value.replace(/\D/g, '')
      const docType = rawDoc.length > 11 ? 'CNPJ' : 'CPF'

      const fn = httpsCallable<object, { status: string; redirectUrl: string | null }>(
        functions, 'confirmDlocalCardPayment'
      )
      const result = await fn({
        checkoutToken: checkoutToken.value,
        cardToken: tokenResult.token,
        clientFirstName: firstName,
        clientLastName: lastName,
        clientDocumentType: docType,
        clientDocument: rawDoc,
        clientEmail: localEmail.value,
        installmentsId: selectedInstallmentId.value || undefined,
        paymentId: paymentId.value,
      })

      if (result.data.redirectUrl) {
        window.location.href = result.data.redirectUrl
        return
      }

      if (result.data.status === 'PAID' || result.data.status === 'PENDING') {
        emit('success', { paymentId: paymentId.value })
      } else {
        emit('error', 'Pagamento recusado. Verifique os dados e tente novamente.')
      }
    } else if (selectedMethod.value === 'pix') {
      const fn = httpsCallable<object, { checkoutUrl: string; paymentId: string }>(
        functions, 'createPixPayment'
      )
      const result = await fn({
        email: localEmail.value,
        name: fullName.value,
        document: cpf.value,
        isExpress: store.answers.isExpress,
        origin: window.location.origin,
        paymentId: paymentId.value,
      })
      if (!result.data.checkoutUrl) throw new Error('No checkout URL received from Pix payment')
      window.location.href = result.data.checkoutUrl
    }
  } catch (err) {
    emit('error', err)
  } finally {
    isSubmitting.value = false
  }
}

const formatCpf = (e: Event) => {
  const target = e.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  if (value.length > 14) value = value.substring(0, 14)
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  } else {
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
  cpf.value = value
}

const formatInstallment = (opt: DlocalInstallmentOption) => {
  const amount = (opt.installment_amount).toFixed(2).replace('.', ',')
  return `${opt.installments}x de R$ ${amount}`
}

const currentPriceDisplay = () => store.answers.isExpress ? PRICE_EXPRESS : PRICE_NOW
const priceForFallback = () => {
  const s = store.answers.isExpress ? PRICE_EXPRESS : PRICE_NOW
  return (parseFloat(s.replace('R$ ', '').replace(',', '.')) / 12).toFixed(2).replace('.', ',')
}

const close = () => emit('close')
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 md:p-4 overflow-y-auto">
      <div class="bg-white w-full max-w-2xl min-h-[400px] my-auto rounded-xl shadow-2xl relative flex flex-col"
        @click.stop>

        <!-- Close Button -->
        <button @click="close"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="p-6 md:p-8">
          <!-- Product Info -->
          <div class="flex items-start gap-4 pb-6 border-b border-gray-100 mb-6">
            <div
              class="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
              <img src="/logo_color.png" alt="Logo" class="w-full h-full object-cover" />
            </div>
            <div class="flex-grow pt-1 text-left">
              <h2 class="text-lg md:text-xl font-bold text-gray-800 leading-tight mb-1">{{
                t('paymentModal.product.name') }}</h2>
              <span class="text-secondary text-xl md:text-2xl font-extrabold">{{ currentPriceDisplay() }}</span>
              <p class="text-xs text-secondary/60 font-medium">{{ t('paymentModal.product.priceInfoPreview', {
                price: priceForFallback()
              }) }}</p>
            </div>
          </div>

          <!-- Init Error -->
          <div v-if="initError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {{ initError }}
          </div>

          <!-- Form -->
          <div class="space-y-4">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">{{ t('paymentModal.nameLabel') }}</label>
              <input v-model="fullName" type="text" :placeholder="t('paymentModal.namePlaceholder')"
                class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-secondary transition-all text-sm"
                :class="errors.name ? 'border-red-300 bg-red-50' : ''" />
              <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">{{ t('paymentModal.emailLabel') }}</label>
              <input v-model="localEmail" type="email" :placeholder="t('paymentModal.emailPlaceholder')"
                class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-secondary transition-all text-sm"
                :class="errors.email ? 'border-red-300 bg-red-50' : ''" />
              <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
            </div>

            <!-- Confirm Email -->
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">{{ t('paymentModal.confirmEmailLabel') }}</label>
              <input v-model="confirmEmail" type="email" :placeholder="t('paymentModal.confirmEmailPlaceholder')"
                class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-secondary transition-all text-sm"
                :class="errors.confirmEmail ? 'border-red-300 bg-red-50' : ''" />
              <p v-if="errors.confirmEmail" class="mt-1 text-xs text-red-500">{{ errors.confirmEmail }}</p>
            </div>

            <!-- CPF -->
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">{{ t('paymentModal.cpfLabel') }}</label>
              <input v-model="cpf" @input="formatCpf" type="text" :placeholder="t('paymentModal.cpfPlaceholder')"
                class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-secondary transition-all text-sm"
                :class="errors.cpf ? 'border-red-300 bg-red-50' : ''" />
              <p v-if="errors.cpf" class="mt-1 text-xs text-red-500">{{ errors.cpf }}</p>
            </div>

            <!-- Payment Method Tabs -->
            <div class="grid grid-cols-2 gap-2 mt-6">
              <button @click="selectedMethod = 'credit_card'"
                class="flex items-center justify-center p-3 rounded-lg border-2 transition-all gap-2"
                :class="selectedMethod === 'credit_card' ? 'border-secondary bg-secondary/5 text-secondary' : 'border-gray-100 text-gray-400'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                <span class="text-xs font-bold">{{ t('paymentModal.paymentMethods.creditCard') }}</span>
              </button>
              <button @click="selectedMethod = 'pix'"
                class="flex items-center justify-center p-3 rounded-lg border-2 transition-all gap-2"
                :class="selectedMethod === 'pix' ? 'border-secondary bg-secondary/5 text-secondary' : 'border-gray-100 text-gray-400'">
                <div class="w-5 h-5 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                    <path d="M12 2L4 10l8 8 8-8-8-8zM12 22l8-8-8 8-8-8 8 8z" />
                  </svg>
                </div>
                <span class="text-xs font-bold">{{ t('paymentModal.paymentMethods.pix') }}</span>
              </button>
            </div>

            <!-- Credit Card Section -->
            <div v-show="selectedMethod === 'credit_card'"
              class="p-6 bg-[#fcfcfc] rounded-lg border border-gray-100 space-y-4">

              <!-- Loading SmartFields -->
              <div v-if="isLoading" class="flex flex-col items-center justify-center py-6 gap-3 text-gray-400">
                <svg class="animate-spin h-8 w-8 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span class="text-sm">Carregando checkout seguro...</span>
              </div>

              <template v-else>
                <!-- Card Number -->
                <div>
                  <label class="block text-[11px] font-bold text-gray-400 uppercase mb-2">Número do cartão</label>
                  <div id="dlocal-pan" class="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-lg min-h-[48px]"></div>
                </div>

                <!-- Expiration + CVV -->
                <div class="grid grid-cols-3 gap-3">
                  <div class="col-span-2">
                    <label class="block text-[11px] font-bold text-gray-400 uppercase mb-2">Validade</label>
                    <div id="dlocal-expiration" class="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-lg min-h-[48px]"></div>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-gray-400 uppercase mb-2">CVV</label>
                    <div id="dlocal-cvv" class="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-lg min-h-[48px]"></div>
                  </div>
                </div>

                <!-- Installments -->
                <div class="border-t border-gray-100 pt-4">
                  <label class="block text-[11px] font-bold text-gray-600 uppercase mb-2">{{
                    t('paymentModal.installmentsLabel') }}</label>

                  <!-- Real installments from Dlocal -->
                  <div v-if="dlocalInstallments.length > 0" class="relative">
                    <select v-model="selectedInstallmentId"
                      class="w-full px-4 py-3 bg-white border border-green-200 rounded-lg outline-none font-medium text-gray-700 appearance-none cursor-pointer">
                      <option v-for="opt in dlocalInstallments" :key="opt.id" :value="opt.id">
                        {{ formatInstallment(opt) }}
                      </option>
                    </select>
                    <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                          d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <!-- Placeholder before card BIN lookup -->
                  <p v-else class="text-xs text-gray-400 italic">
                    As opções de parcelamento aparecerão após informar o cartão.
                  </p>
                </div>
              </template>
            </div>

            <!-- Pix Section -->
            <div v-show="selectedMethod === 'pix'"
              class="p-8 bg-gray-50/50 rounded-lg border border-gray-100 flex flex-col items-center gap-6">
              <p class="text-sm text-gray-500 text-center">
                Ao confirmar, você será redirecionado para concluir o pagamento via Pix.
              </p>
              <div class="w-32 opacity-80">
                <img src="/pix-seeklogo.png" alt="Pix" class="w-full h-auto object-contain" />
              </div>
            </div>

            <!-- Submit -->
            <div class="pt-6 mt-4 border-t border-gray-100">
              <button @click="handlePayment" :disabled="isSubmitting || isLoading || !!initError"
                class="w-full bg-[#00a859] hover:bg-[#008f4c] text-white font-bold py-4 rounded-lg text-lg transition-all active:scale-[0.98] mt-2 shadow-md flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed">
                <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {{ isSubmitting ? 'Processando...' : t('paymentModal.buyNow') }}
              </button>
            </div>

            <div class="flex items-center justify-center gap-2 text-gray-300 font-black text-[10px] uppercase tracking-widest pt-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clip-rule="evenodd" />
              </svg>
              {{ t('paymentModal.securePayment') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from .bg-white {
  transform: scale(0.95) translateY(20px);
}
</style>
