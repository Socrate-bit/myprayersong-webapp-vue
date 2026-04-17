import { createI18n } from 'vue-i18n'

const messages = {
  'pt-BR': {
    title: '{siteName}',
    mail: "{email}",
    common: {
      cancel: 'Cancelar',
      save: 'Salvar Alterações'
    },
    header: {
      home: 'Início',
      trackOrder: 'Rastrear Pedido',
      reviews: 'Depoimentos',
      createSong: 'Criar Minha Música'
    },
    hero: {
      listenExample: 'Ouvir Exemplo',
      pauseExample: 'Pausar Exemplo',
      placeholder: '[Vídeo/Imagem de Exemplo]'
    },
    valueProp: {
      badge: 'A Plataforma nº 1 de Músicas Cristãs Personalizadas',
      headline: '"Essa canção me levou às lágrimas!"',
      subheadline: 'Surpreenda quem você ama com um louvor exclusivo que ficará marcado para sempre no coração',
      cta: 'Criar Minha Música Personalizada',
      delivery: 'Feito com fé, oração e carinho — Entrega em 7 dias',
      lovedBy: 'Amado por mais de 4.000+ famílias'
    },
    howItWorks: {
      title: 'Como Funciona o {siteName}',
      step1: 'Responda ao nosso questionário',
      step2: 'Nossa equipe compõe sua música',
      step3: 'Receba em 7 dias (ou 24h no plano Express) no seu e-mail',
      cta: 'Começar Minha Música'
    },
    testimonials: {
      title: 'Por que mais de 4.000+ clientes amam a {siteName}',
      card: {
        quote: '"Glória a Deus! Isso é verdadeiramente magnífico. Estou ansiosa para fazer essa surpresa no domingo. Vamos ouvir a caminho do culto! Que Deus abençoe esse ministério lindo."',
        author: 'Waleska B.',
        verified: 'Compra Verificada',
        songTitle: 'Presente de Deus é Você'
      },
      testimonial1: {
        quote: '"Um trabalho de uma beleza surreal. Está sendo difícil guardar segredo até o final de semana! Parabéns pelo talento e por tocarem o coração das pessoas."',
        songTitle: 'Três Toques de Carinho',
        artist: '{siteName}'
      },
      testimonial2: {
        quote: '"Uma experiência maravilhosa. Eu e o Davi amamos cada detalhe! Foi o melhor presente de aniversário que já dei."',
        author: 'Marquise B.',
        songTitle: 'Mais Forte Agora',
        artist: '{siteName}'
      },
      seeMore: 'Veja mais depoimentos'
    },
    giftGrid: {
      title: 'Um Presente para Cada Momento da Vida',
      categories: {
        partner: 'Para seu Amor',
        children: 'Para os Filhos',
        loss: 'Em Memória / Luto',
        parents: 'Para os Pais',
        yourself: 'Meu Momento com Deus',
        strength: 'Força e Encorajamento',
        healing: 'Cura e Restauração',
        prayers: 'Orações e Clamor',
        breakthroughs: 'Vitórias e Conquistas'
      },
      cta: 'Criar Música Agora'
    },
    whatYouGet: {
      title: 'O Que Você Irá Receber',
      subtitle: 'Assim que terminarmos, você receberá um link exclusivo para ouvir, baixar e compartilhar seu louvor personalizado!',
      duration: '3:47'
    },
    features: {
      radio: {
        title: 'Qualidade Profissional',
        desc: 'Áudio de estúdio pronto para tocar no rádio ou redes sociais'
      },
      lyrics: {
        title: 'Letra Personalizada',
        desc: 'Composição baseada na sua história e em princípios bíblicos'
      },
      delivery: {
        title: 'Entrega em 7 Dias',
        desc: 'Prazo padrão com opção de entrega urgente em 24h'
      },
      cta: 'Quero Minha Música',
      guarantee: 'Satisfação Garantida • Reembolso em até 30 dias'
    },
    faq: {
      title: 'Dúvidas Frequentes',
      questions: [
        {
          q: 'O que torna essas músicas especiais?',
          a: 'Cada canção é única, composta do zero com base nos detalhes que você nos envia. Unimos sua história a temas bíblicos com produção profissional.'
        },
        {
          q: 'Qual o prazo de entrega?',
          a: 'O prazo padrão é de 7 dias. Se tiver pressa, oferecemos o serviço Express de 24 horas por uma taxa adicional, disponível para seleção no momento da compra.'
        },
        {
          q: 'Posso pedir para entregar em 24 horas?',
          a: 'Sim! Selecione o upgrade de Entrega Prioritária após a compra e nossa equipe finalizará sua música em apenas um dia.'
        },
        {
          q: 'Quais temas posso escolher?',
          a: 'Qualquer tema que honre a Deus e a pessoa presenteada: aniversários, casamentos, testemunhos, cura, luto ou orações de fé.'
        },
        {
          q: 'Como as músicas são produzidas?',
          a: 'Unimos o sentimento humano à tecnologia. Nossos compositores escrevem a letra com base no seu relato e nossos produtores utilizam ferramentas modernas de áudio para garantir som de alta qualidade por um preço acessível. Cada obra passa por um controle de qualidade rigoroso.'
        },
        {
          q: 'Como vou receber a música?',
          a: 'Enviamos um link seguro por e-mail para você ouvir em qualquer dispositivo e compartilhar facilmente com amigos e familiares.'
        },
        {
          q: 'Posso tocar a música na igreja?',
          a: 'Com certeza! Você tem total liberdade para tocar sua música em cultos, casamentos ou eventos privados.'
        }
      ]
    },
    footer: {
      tagline: 'Criando canções de fé para celebrar seus marcos e glorificar o amor de Deus através da música.',
      contact: {
        title: 'Contato',
        email: "{email}"
      },
      trackOrder: {
        title: 'Suporte',
        link: 'Rastrear Pedido'
      },
      links: {
        title: 'Links Úteis',
        reviews: 'Depoimentos',
        terms: 'Termos de Uso',
        privacy: 'Privacidade'
      },
      copyright: '© 2026 {siteName}. Todos os direitos reservados.'
    },
    funnel: {
      step1: {
        title: 'O Começo de Tudo',
        subtitle: 'Conte-nos sobre a pessoa especial que vamos homenagear',
        question1: 'Para quem é a música?',
        options: {
          husband: 'Marido',
          wife: 'Esposa',
          boyfriend: 'Namorado',
          girlfriend: 'Namorada',
          children: 'Filhos',
          father: 'Pai',
          mother: 'Mãe',
          sibling: 'Irmão(ã)',
          friend: 'Amigo(a)',
          myself: 'Para Mim',
          other: 'Outra Pessoa'
        },
        question2: 'Qual o nome dela?',
        placeholder: 'Primeiro nome',
        tip: 'Dica: Se o nome for incomum, escreva como se pronuncia.'
      },
      step2: {
        title: 'Estilo Musical',
        question1: 'Escolha o Ritmo',
        options: {
          pop: 'Pop Gospel',
          country: 'Sertanejo Cristão',
          rock: 'Rock Cristão',
          rnb: 'Black Music / Soul',
          jazz: 'Jazz Contemporâneo',
          worship: 'Louvor e Adoração',
          rap: 'Rap / Hip-Hop Cristão'
        },
        question2: 'Estilo da Voz',
        tip: 'Recomendamos escolher o gênero da sua própria voz para que a mensagem soe mais pessoal.',
        genderOptions: {
          female: 'Voz Feminina',
          male: 'Voz Masculina',
          none: 'Tanto faz'
        }
      },
      step3: {
        title: 'Qualidades Dela',
        subtitle: 'Quais virtudes mais te admiram nessa pessoa?',
        question: 'Pontos Fortes',
        placeholder: 'Ela é paciente, sábia, engraçada, protetora? O que a torna única?'
      },
      step4: {
        title: 'Momentos Marcantes',
        subtitle: 'Quais lembranças você mais valoriza?',
        question: 'Compartilhe uma História',
        placeholder: 'Uma viagem, um desafio vencido juntos, ou aquele momento em que vocês sentiram a presença de Deus...'
      },
      step5: {
        title: 'Uma Mensagem do Coração',
        subtitle: 'Há algo específico que você faz questão que esteja na letra?',
        question: 'Nota Pessoal',
        placeholder: 'Um versículo favorito, um pedido de perdão, um "eu te amo"...'
      },
      navigation: {
        back: 'Voltar',
        next: 'Continuar',
        step: 'Etapa {current} de {total}',
        complete: '{percent}% Concluído'
      },
      footer: {
        text: 'Ao continuar, você concorda com nossos ',
        terms: 'Termos',
        privacy: 'Política de Privacidade'
      }
    },
    promoBanner: {
      text: 'APROVEITE O FERIADO COM PAZ: 50% DE DESCONTO 🙏'
    },
    paymentModal: {
      changeCountry: 'Alterar país',
      product: {
        name: 'Sua Canção Personalizada',
        author: '{siteName}',
        priceInfoPreview: 'ou em 12 x de R$ {price} * no cartão'
      },
      nameLabel: 'Nome completo',
      namePlaceholder: 'Digite seu nome completo',
      emailLabel: 'Seu email',
      emailPlaceholder: 'Digite seu email para receber a compra',
      confirmEmailLabel: 'Confirme seu email',
      confirmEmailPlaceholder: 'Digite novamente seu email',
      cpfLabel: 'CPF/CNPJ',
      cpfPlaceholder: 'Digite o número do seu CPF ou CNPJ',
      couponLabel: 'Tem um cupom de desconto?',
      paymentMethods: {
        creditCard: 'Cartão de crédito',
        pix: 'Pix'
      },
      cardNumber: 'Número do cartão',
      cardNameLabel: 'Nome do titular',
      cardNamePlaceholder: 'Digite o nome impresso no cartão',
      cardMonth: 'Mês',
      cardYear: 'Ano',
      cardCvv: 'CVV',
      installmentsLabel: 'Selecione o número de parcelas',
      purchaseDetails: 'Detalhes da compra',
      buyNow: 'Comprar agora',
      securePayment: 'Compra 100% Segura',
      lgpdProtection: 'Seus dados estão protegidos pela LGPD e o pagamento é processado com segurança via dLocal',
      copyright: '© CançãoOração. Todos os direitos reservados.',
      invalidDocumentError: 'CPF/CNPJ inválido. Verifique o documento e tente novamente.',
      paymentDeclinedError: 'Pagamento recusado. Verifique os dados e tente novamente.'
    },
    payment: {
      title: 'Falta Pouco! Finalize seu Pedido',
      subtitle: 'Você está a um passo de criar um presente inesquecível para {name} 💝',
      deliveryDate: 'Entrega prevista para: {date}',
      emailLabel: 'Seu E-mail de Contato',
      emailPlaceholder: "seu{'@'}email.com.br",
      cta: 'Confirmar e Criar Música',
      guarantee: 'Garantia de Reembolso de 30 dias inclusa',
      summary: {
        title: 'Resumo do Pedido',
        songFor: 'Homenageado:',
        delivery: 'Prazo:',
        customSong: 'Música Personalizada',
        discount: '50% DESCONTO',
        discountUrgency: '[ÚLTIMO DIA]',
        originalPrice: '{price}',
        price: '{price}',
        express: 'Entrega Expressa 24h',
        expressDesc: 'Receba amanhã em vez de esperar 7 dias.',
        expressPrice: '+ {price}',
        totalExpress: '{price}',
        review: 'Revisar Questionário',
        guarantee: 'Garantia de Reembolso de 30 dias inclusa'
      },
      urgency: {
        title: 'ATENÇÃO',
        justification: 'Devido à altíssima demanda desta semana, limitamos nossas vagas para garantir nosso padrão de qualidade.',
        status: 'Pedidos restantes esta semana',
        spotsUsed: '{used}/{total} pedidos preenchidos',
        reserved: 'Seu pedido está reservado por',
        expired: 'Reserva expirada. Finalize agora para garantir seu pedido.',
      },
      discountCard: {
        title: 'Oferta Especial de Feriado 🙏',
        p1: 'A alegria do Senhor é a nossa força! Normalmente nossas produções custam {originalPrice}, mas neste feriado, seu louvor sai por apenas {price}.',
        p2: 'Aproveite esta oferta por tempo limitado, válida apenas para esta semana especial, para criar uma lembrança eterna que traz a verdadeira paz ao coração.'
      },
      whatYouGet: {
        title: 'O Que Você Leva',
        item1: {
          title: 'Áudio de Alta Fidelidade',
          desc: 'Qualidade de estúdio profissional'
        },
        item2: {
          title: 'Letra Exclusiva',
          desc: 'Escrita especialmente para {name}'
        },
        item3: {
          title: 'Entrega Garantida',
          desc: 'Compromisso total com o seu prazo'
        }
      },
      whyChoose: {
        title: 'Por que escolher a {siteName}?',
        item1: 'Mais de 4.000+ famílias impactadas',
        item2: 'Satisfação 100% garantida',
        item3: 'Pagamento seguro e criptografado',
        item4: 'Entrega pontual em 7 dias'
      },
      authority: {
        title: 'Quem Somos',
        badge1: '4.000+ famílias impactadas',
        badge2: 'Músicos e compositores cristãos',
        badge3: 'Produção profissional de estúdio',
        desc: 'Somos um grupo de quatro apaixonados pela música cristã que acredita no poder do louvor para transformar vidas. Nosso propósito é transbordar a alegria do Senhor nas famílias, unindo pessoas através de canções que seguem a ordem e o querer de Deus. Mais do que uma plataforma, somos um ministério dedicado a eternizar sua caminhada com Cristo e seus momentos mais preciosos em forma de adoração.'
      },
      guaranteeFull: {
        title: 'Garantia de Satisfação Total',
        item1: {
          title: 'Não gostou? Devolvemos seu dinheiro',
          desc: 'Sem perguntas, sem burocracia.'
        },
        item2: {
          title: 'Prazo de 30 Dias',
          desc: 'Você tem um mês inteiro para avaliar o resultado.'
        },
        item3: {
          title: 'Compra Sem Risco',
          desc: 'Sua paz de espírito é nossa prioridade.'
        }
      },
      socialProof: {
        title: 'Ouça Outras Criações Recentes',
        orderedBy: 'Pedido por',
        songs: [
          {
            title: 'Presente de Deus',
            author: 'Luciano P.',
            audio: '/songs/mariana_woman.mp3',
            duration: '4:35',
            quote: '"Ficou perfeito. Vocês captaram cada detalhe... nós dois choramos muito ouvindo."'
          },
          {
            title: 'Nossa História',
            author: 'Gabriela S.',
            audio: '/songs/carlos_woman.mp3',
            duration: '2:48',
            quote: '"Um trabalho maravilhoso. O Carlos ficou sem palavras com o presente, foi emocionante demais!"'
          },
          {
            title: 'Graça que Salva',
            author: 'Ricardo O.',
            audio: '/songs/ana_masculine.mp3',
            duration: '2:59',
            quote: '"Qualidade impressionante. Mal posso esperar para mostrar na igreja no próximo culto."'
          },

        ]
      },
      readyToProceed: 'Pronto para continuar?',
      forLovedOne: 'Dedicado a {name}',
      defaultLovedOne: 'quem você ama',
      processing: 'Processando Conexão...',
      validEmailError: 'E-mail inválido',
      emailRequiredError: 'O e-mail é obrigatório',
      paymentSuccess: '✓ Sucesso! Seu pedido está sendo processado.',
      genericError: 'Algo deu errado. Por favor, tente novamente.',
      acceptPix: 'Aceitamos Pix',
      instantApproval: 'Aprovação instantânea',
      generatingLink: 'Gerando Link Seguro...',
      securePayment: 'Pagamento Seguro'
    },
    legal: {
      header: {
        siteName: '{siteName}',
        backHome: '← Voltar para a Home'
      },
      nav: {
        title: 'Documentos Legais',
        terms: 'Termos de Serviço',
        privacy: 'Política de Privacidade'
      },
      footer: {
        copyright: '© 2025 {siteName}. Todos os direitos reservados.',
        contact: 'Fale conosco'
      },
      terms: {
        title: 'Termos de Serviço',
        lastUpdated: 'Última Atualização: 27 de janeiro de 2026',
        sections: {
          acceptance: {
            title: '1. Aceitação dos Termos',
            content: 'Ao acessar e usar o site {siteUrl} (o "Site"), você aceita e concorda em cumprir os termos e disposições deste acordo. A {siteName} ("Empresa", "nós", "nos" ou "nosso") opera este Site e fornece serviços de criação de músicas personalizadas.'
          },
          company: {
            title: '2. Informações da Empresa',
            content: "A {siteName} é uma marca operada pela ECOM-PARIS LC, sociedade de responsabilidade limitada registrada nos Estados Unidos sob o EIN 93-2737442. A ECOM-PARIS LC opera a plataforma {siteUrl} e é responsável pela prestação de todos os serviços oferecidos sob a marca {siteName}. Para qualquer dúvida ou preocupação, entre em contato conosco pelo e-mail {email}."
          },
          services: {
            title: '3. Descrição dos Serviços',
            content: 'Oferecemos serviços de criação de músicas cristãs personalizadas. Nossos serviços incluem:',
            items: [
              'Escrita de letras personalizadas com base nas informações fornecidas pelo cliente',
              'Produção musical e gravação profissional',
              'Entrega digital da música finalizada',
              'Licença de uso pessoal para a música criada'
            ]
          },
          orders: {
            title: '4. Pedidos e Pagamento',
            content: 'Ao fazer um pedido através do nosso Site, você concorda em fornecer informações de compra e de conta atuais, completas e precisas. Você concorda em atualizar prontamente sua conta e outras informações para que possamos concluir suas transações e contatá-lo conforme necessário. Todos os pagamentos são processados de forma segura através do nosso processador de pagamentos.'
          },
          pricing: {
            title: '5. Preços e Promoções',
            content: 'Os preços dos nossos serviços estão sujeitos a alterações sem aviso prévio. Reservamo-nos o direito de modificar ou descontinuar ofertas promocionais a qualquer momento. O preço que você paga será o preço exibido no momento da compra.'
          },
          delivery: {
            title: '6. Entrega',
            content: 'O prazo de entrega padrão é de 7 dias úteis a partir da data de confirmação do pedido. A entrega prioritária em 24 horas está disponível mediante uma taxa adicional. As músicas são entregues digitalmente via e-mail para o endereço fornecido no checkout. É sua responsabilidade garantir que o e-mail fornecido esteja correto e acessível.'
          },
          refund: {
            title: '7. Política de Reembolso',
            content: "Oferecemos uma garantia de reembolso de 30 dias. Se você não estiver satisfeito com sua música personalizada, poderá solicitar o reembolso total no prazo de 30 dias após a entrega. Para solicitar um reembolso, entre em contato conosco em {email} com os detalhes do seu pedido."
          },
          intellectual: {
            title: '8. Propriedade Intelectual',
            content: 'Todo o conteúdo deste Site, incluindo, mas não se limitando a, textos, gráficos, logotipos, imagens, clipes de áudio e software, é de propriedade da {siteName} ou de seus fornecedores de conteúdo e é protegido por leis internacionais de direitos autorais. As músicas personalizadas que criamos tornam-se sua propriedade após o pagamento integral, sujeitas aos termos de licença descritos abaixo.'
          },
          license: {
            title: '9. Licença de Uso de Músicas Personalizadas',
            content: 'Após o pagamento integral, você recebe uma licença não exclusiva e livre de royalties para usar sua música personalizada para fins pessoais e não comerciais. Você pode compartilhar e tocar sua música em eventos privados e reuniões da igreja. O uso comercial, reprodução para venda ou distribuição com fins lucrativos é proibido sem permissão expressa por escrito da {siteName}.'
          },
          prohibited: {
            title: '10. Usos Proibidos',
            items: [
              'Usar nossos serviços para qualquer finalidade ilegal',
              'Solicitar conteúdo que seja ofensivo, odioso ou discriminatório',
              'Tentar fazer engenharia reversa ou copiar nossos métodos de produção',
              'Revender ou redistribuir nossos serviços sem autorização',
              'Usar as músicas para fins comerciais sem o licenciamento adequado'
            ]
          },
          liability: {
            title: '11. Limitação de Responsabilidade',
            content: 'A {siteName} não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos resultantes do seu uso ou da incapacidade de usar o serviço. Nossa responsabilidade total não excederá o valor pago por você pelo serviço.'
          },
          governing: {
            title: '12. Lei Aplicável',
            content: 'Estes Termos serão regidos e interpretados de acordo com as leis da jurisdição em que a {siteName} está registrada, sem considerar o conflito de disposições legais.'
          },
          changes: {
            title: '13. Alterações nos Termos',
            content: 'Reservamo-nos o direito de modificar estes Termos a qualquer momento. Notificaremos os usuários sobre quaisquer alterações materiais publicando os novos Termos nesta página e atualizando a data de "Última Atualização". O uso continuado do serviço após tais modificações constitui sua aceitação dos Termos atualizados.'
          },
          contact: {
            title: '14. Informações de Contato',
            content: 'Para qualquer dúvida sobre estes Termos, entre em contato conosco:'
          }
        }
      },
      privacy: {
        title: 'Política de Privacidade',
        lastUpdated: 'Última Atualização: 27 de janeiro de 2026',
        sections: {
          introduction: {
            title: '1. Introdução',
            content: 'A {siteName} ("nós", "nos" ou "nosso") opera o site {siteUrl}. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site e utiliza nossos serviços. Leia esta política de privacidade com atenção.'
          },
          collection: {
            title: '2. Informações que Coletamos',
            content: 'Coletamos informações que você nos fornece diretamente, incluindo:',
            items: [
              'Informações de identificação pessoal (nome, endereço de e-mail)',
              'Informações de pagamento (processadas de forma segura através do nosso processador de pagamentos)',
              'Informações fornecidas no questionário de criação de música (histórias, memórias, preferências)',
              'Registros de comunicação quando você entra em contato conosco',
              'Dados de uso e análises através de cookies e tecnologias semelhantes'
            ]
          },
          usage: {
            title: '3. Como Usamos Suas Informações',
            content: 'Usamos as informações que coletamos para:',
            items: [
              'Criar sua música personalizada com base nas informações fornecidas',
              'Processar seus pagamentos e entregar seu pedido',
              'Comunicar-nos com você sobre seu pedido e nossos serviços',
              'Melhorar nossos serviços e a experiência do cliente',
              'Enviar comunicações de marketing (com seu consentimento)',
              'Cumprir obrigações legais e proteger nossos direitos'
            ]
          },
          sharing: {
            title: '4. Compartilhamento de Informações',
            content: 'Podemos compartilhar suas informações com:',
            items: [
              'Prestadores de serviços que auxiliam em nossas operações (processadores de pagamento, serviços de e-mail)',
              'Letristas e produtores profissionais que criam sua música (apenas as informações necessárias para a criação)',
              'Autoridades legais quando exigido por lei ou para proteger nossos direitos',
              'Nós não vendemos suas informações pessoais a terceiros'
            ]
          },
          cookies: {
            title: '5. Cookies e Rastreamento',
            content: 'Usamos cookies e tecnologias de rastreamento semelhantes para monitorar a atividade em nosso site e manter certas informações. Você pode configurar seu navegador para recusar todos os cookies ou indicar quando um cookie está sendo enviado. No entanto, se não aceitar cookies, poderá não conseguir utilizar algumas partes do nosso serviço.'
          },
          security: {
            title: '6. Segurança de Dados',
            content: 'Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger suas informações, não podemos garantir sua segurança absoluta.'
          },
          retention: {
            title: '7. Retenção de Dados',
            content: 'Retemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei. As informações de criação de música são retidas para nos permitir cumprir nossa garantia de reembolso de 30 dias e para fins de melhoria de qualidade.'
          },
          rights: {
            title: '8. Seus Direitos de Privacidade',
            content: 'Dependendo da sua localização, você pode ter os seguintes direitos:',
            items: [
              'Acesso às informações pessoais que mantemos sobre você',
              'Correção de informações imprecisas ou incompletas',
              'Exclusão de suas informações pessoais',
              'Objeção ou restrição a certos processamentos',
              'Portabilidade de dados',
              'Retirada de consentimento para comunicações de marketing'
            ]
          },
          children: {
            title: '9. Privacidade de Crianças',
            content: 'Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações pessoais de crianças menores de 18 anos. Se você é pai ou responsável e acredita que seu filho nos forneceu informações pessoais, entre em contato conosco.'
          },
          thirdParty: {
            title: '10. Links de Terceiros',
            content: 'Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas práticas de privacidade ou pelo conteúdo desses sites. Recomendamos que você leia as políticas de privacidade de qualquer site de terceiro que visitar.'
          },
          changes: {
            title: '11. Alterações na Política de Privacidade',
            content: 'Podemos atualizar esta Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova Política nesta página e atualizando a data de "Última Atualização". Recomendamos que você revise esta Política periodicamente.'
          },
          contact: {
            title: '12. Entre em Contato Conosco',
            content: 'Se você tiver dúvidas sobre esta Política de Privacidade ou nossas práticas de dados, entre em contato conosco:'
          }
        }
      }
    },
    reviewsPage: {
      hero: {
        title: 'Mais de 4.000+ Histórias de Fé',
        subtitle: 'Veja por que tantas famílias confiam na {siteName} para criar homenagens que tocam a alma.',
        verified: 'Depoimentos Reais',
        happyCustomers: '4.000+ Clientes Felizes',
        cta: 'Começar Minha Música'
      },
      common: {
        verifiedCustomer: 'Cliente Verificado'
      },
      ctaSection: {
        cta: 'Quero Minha Música Personalizada'
      },
      shareExperience: {
        title: 'Como foi sua experiência com a {siteName}?',
        subtitle: 'Sua música já chegou? Queremos muito conhecer a emoção desse momento!',
        card: {
          title: 'Conte sua História',
          text1: 'Compartilhe seu relato através do e-mail {email} para que possamos inspirar outras famílias!',
          text2: 'Deseja nos enviar um vídeo de reação? Caso o arquivo seja pesado, solicite um link exclusivo de upload enviando um e-mail com o assunto "Meu Relato {siteName}".',
          cta: 'Quero Compartilhar'
        }
      }
    },
    trackOrder: {
      title: 'Rastrear Meu Pedido',
      subtitle: 'Digite seu e-mail para ver o status da sua música.',
      guarantee: {
        title: 'Sua música será entregue!',
        text: 'Temos 100% de taxa de entrega. Se não encontrar o e-mail, verifique sua caixa de spam ou fale conosco em {email}. Respondemos em até 24h.',
        email: "{email}"
      },
      form: {
        placeholder: 'Seu e-mail de compra',
        button: 'Ver Status',
        checking: 'Verificando...',
        notFound: 'Não encontramos nenhum pedido com este e-mail.'
      },
      status: {
        waitingPayment: 'Aguardando Pagamento',
        confirmed: 'Confirmado — Em Produção',
        completed: 'Concluído'
      },
      popup: {
        title: 'Pedido Encontrado!',
        songFor: 'Música para {name}',
        orderDate: 'Data do Pedido',
        status: 'Status',
        close: 'Fechar'
      },
      help: {
        title: 'Precisa de Ajuda?',
        text: 'Nossa equipe está à disposição no e-mail {email} para qualquer dúvida.',
        email: "{email}",
        button: 'Falar com Suporte'
      },
    },
    success: {
      title: 'Pagamento Realizado com Sucesso!',
      subtitle: 'Obrigado por sua compra. Você receberá todas as informações por e-mail em breve.',
      button: 'Voltar ao Início'
    },
    failure: {
      title: 'O Pagamento Falhou',
      subtitle: 'Não conseguimos processar seu pagamento. Verifique seus dados e tente novamente.',
      button: 'Tentar Novamente'
    }

  },
}

const i18n = createI18n({
  legacy: false, // you must set `legacy: false` for Composition API
  locale: 'pt-BR', // set locale
  fallbackLocale: 'en', // set fallback locale
  missingWarn: true,
  fallbackWarn: true,
  messages, // set locale messages
})

// const _t = i18n.global.t.bind(i18n.global)

// i18n.global.t = ((...args: Parameters<typeof _t>) => {
//   try {
//     console.log('t() key:', args[0])
//     return _t(...args)
//   } catch (e) {
//     console.error('❌ i18n error on key:', args[0])
//     throw e
//   }
// }) as typeof _t



export default i18n
