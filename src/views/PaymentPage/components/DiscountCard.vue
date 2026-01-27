<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <div class="bg-[#FFFBF2] rounded-2xl border-2 border-[#EAD798] p-6 shadow-sm w-full mb-6">
        <div class="flex items-start gap-4 mb-4">
            <div class="text-4xl">🎁</div>
            <div>
                <h3 class="font-bold text-xl text-[#A05E35] mb-4">
                    {{ t('payment.discountCard.title') }}
                </h3>
                <p class="text-[#A05E35] mb-4 leading-relaxed">
                    <span class="line-through opacity-70">$199</span>
                    <span class="font-bold">$99 USD</span>
                    {{ t('payment.discountCard.p1').replace('$199', '').replace('$99 USD', '') }}
                </p>
                <p class="text-[#A05E35] font-bold text-sm leading-relaxed opacity-90">
                    {{ t('payment.discountCard.p2') }}
                </p>
            </div>
        </div>
    </div>
</template>
