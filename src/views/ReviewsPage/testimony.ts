const img1 = '/Comments/1.jpg'
const img2 = '/Comments/2.jpg'
const img3 = '/Comments/3.jpg'
const img7 = '/Comments/7.jpg'

const exemplePoster = '/posters/Exemple1_poster.jpg'
const deadPoster = '/posters/dead_poster.jpg'
const love1Poster = '/posters/love_1_poster.jpg'
const love2Poster = '/posters/love_2_poster.jpg'
const motherPoster = '/posters/mother_poster.jpg'

// Import videos from assets
const exempleVideo = '/testimonies/testimony_exemple1.mp4'
const deadVideo = '/testimonies/testimony_dead.mp4'
const love1Video = '/testimonies/testimony_love1.mp4'
const love2Video = '/testimonies/testimony_love2.mp4'
const motherVideo = '/testimonies/testimony_mother.mp4'

// Import songs from assets
const exempleSong = '/songs/Exemple1.mp3'
const deadSong = '/songs/dead.mp3'
const love1Song = '/songs/love_1.mp3'
const love2Song = '/songs/love_2.mp3'
const motherSong = '/songs/mother.mp3'

export interface Review {
  id: number
  author: string
  verified: boolean
  rating: number
  text: string
  type: 'text' | 'image' | 'video'
  mediaUrl?: string
  songTitle?: string
  songUrl?: string
  date?: string
  showLanding?: boolean
  poster?: string
}
export const reviews: Review[] = [
  {
    id: 1,
    showLanding: true,
    author: 'Luciana M.',
    verified: true,
    rating: 5,
    text: "Gente, eu me emocionei demais kkkkk sério, as lágrimas não param de cair. 😭 Não sei como vcs transformaram nossa história em algo tão profissional e pessoal. Parece que vcs conhecem a nossa vida! Essa melodia é um verdadeiro presente de Deus.",
    type: 'text',
    date: '12/01/2026'
  },
  {
    id: 2,
    showLanding: true,
    author: 'Sandra G.',
    verified: true,
    rating: 5,
    text: "Todo dia eu tento manter viva a memória da minha sobrinha, e encontrar vcs no Face foi uma benção. Chorei na primeira estrofe. Obrigada por me ajudarem a honrar o espírito dela de um jeito tão doce, vcs estão trazendo alegria e cura para muitas vidas com esse dom.",
    type: 'text',
    date: '18/01/2026'
  },
  {
    id: 3,
    author: 'Beatriz F.',
    verified: true,
    rating: 5,
    text: "Música maravilhosa!! Estávamos atrasados e escolhemos o serviço expresso. Recebemos a canção já no início do dia seguinte. Eu amei mto e o Dave também ficou encantado. Já postei no meu Face e mandei pro grupo dos filhos pra eles ouvirem nossa história. Deus abençoe esse trabalho!",
    type: 'image',
    mediaUrl: img3,
    showLanding: true,
    songTitle: 'Três Apertos e um Milagre',
    date: '31/01/2026'
  },
  {
    id: 4,
    showLanding: true,
    author: 'Tatiana K.',
    verified: true,
    rating: 4.5,
    text: "Esse foi o MELHOR presente, o mais carinhoso que já recebi na vida. Fiquei sem palavras e com o coração batendo forte só de imaginar a reação dele hoje à noite. Vcs tocaram minha alma com essa letra... mal posso esperar!",
    type: 'text',
    date: '25/01/2026'
  },
  {
    id: 6,
    showLanding: true,
    author: 'Diana',
    verified: true,
    rating: 5,
    text: "Estou sem palavras! É absolutamente deslumbrante e não tenho como agradecer por essa letra tão poderosa. Vcs pegaram nossa história e tornaram o aniversário do meu marido algo inesquecível. Valeu cada centavo.",
    type: 'text',
    date: '14/01/2026'
  },
  {
    id: 7,
    author: 'Juliana Melo',
    verified: true,
    rating: 5,
    text: "Simplesmente incrível. Eu confesso que estava meio ansiosa pra ver como ia ficar, mas UAU. A letra foi na mosca e a melodia não sai da nossa cabeça. Uma benção real para a nossa jornada juntos!",
    type: 'image',
    mediaUrl: img7,
    songTitle: 'Nossa Jornada',
    date: '02/02/2026'
  },
  {
    id: 8,
    author: 'Ricardo Oliveira',
    verified: true,
    rating: 5,
    text: "Eu não sou muito de demonstrar sentimento, mas cara... isso me pegou. Nunca reagi assim com um presente, mas ouvir minha vida como pai transformada em música assim bateu forte no coração. Sem palavras.",
    type: 'image',
    showLanding: true,
    mediaUrl: img1,
    songTitle: 'Amor de Pai',
    date: '06/01/2026'
  },
  {
    id: 9,
    author: 'Jéssica Santos',
    verified: true,
    rating: 5,
    text: "Que surpresa inacreditável. Vcs capturaram os 50 anos dos meus pais com perfeição, parece música de rádio, mas é sobre a MINHA família. Obrigada por nos ajudarem a celebrar eles de um jeito tão profundo.",
    type: 'image',
    showLanding: true,
    mediaUrl: img2,
    songTitle: '50 Anos Juntos',
    date: '20/01/2026'
  },
  {
    id: 10,
    author: 'Marcelo D.',
    verified: true,
    rating: 5,
    text: "Eu não sou bom com as palavras, mas essa música disse tudo o que eu sempre quis dizer pra ela. Traduziu cada emoção minha em uma melodia linda. Senti que Deus estava em cada nota.",
    type: 'video',
    showLanding: true,
    mediaUrl: love2Video,
    poster: love2Poster,
    songTitle: 'Meu Eterno Amor',
    songUrl: love2Song,
    date: '08/01/2026'
  },
  {
    id: 11,
    author: 'Bruno Teixeira',
    verified: true,
    rating: 5,
    text: "Ela caiu no choro ao ouvir a música. Ver a reação dela não tem preço. Eu estava apreensivo com os detalhes, mas vocês foram extremamente atenciosos e captaram nossa história perfeitamente.",
    type: 'video',
    showLanding: true,
    mediaUrl: exempleVideo,
    poster: exemplePoster,
    songTitle: 'Nossa História',
    songUrl: exempleSong,
    date: '10/01/2026'
  },
  {
    id: 12,
    author: 'Diego M.',
    verified: true,
    rating: 4.5,
    text: "Ela começou a chorar em segundos. Dei pra minha esposa no nosso aniversário e ela ficou em total estado de graça... foi uma emoção indescritível. Foi o melhor presente que já dei em todo o nosso casamento.",
    type: 'video',
    showLanding: true,
    mediaUrl: love1Video,
    poster: love1Poster,
    songTitle: 'Minha Linda Esposa',
    songUrl: love1Song,
    date: '28/01/2026'
  },
  {
    id: 13,
    author: 'Amanda Souza',
    verified: true,
    rating: 5,
    text: "Tocando isso pra ele uma última vez hoje. 🕊️ Capturou perfeitamente o amor que construímos com a graça de Deus. É um conforto ter essa memória preciosa. Sei que ele está ouvindo lá de cima e sorrindo.",
    type: 'video',
    showLanding: true,
    mediaUrl: deadVideo,
    poster: deadPoster,
    songTitle: 'Até nos Encontrarmos de Novo',
    songUrl: deadSong,
    date: '15/01/2026'
  },
  {
    id: 14,
    author: 'Dani Silva',
    verified: true,
    rating: 5,
    text: "Minha mãe não para de falar desse presente! Ela disse que é a coisa mais especial que ela já teve na vida. Ficou tão doce e sincero, uma verdadeira 'oração' em forma de música que nossa família vai guardar pra sempre.",
    type: 'video',
    showLanding: true,
    mediaUrl: motherVideo,
    poster: motherPoster,
    songTitle: 'Obrigado Mãe',
    songUrl: motherSong,
    date: '22/01/2026'
  },

  {
    id: 21,
    showLanding: true,
    author: 'Nathália S.',
    verified: true,
    rating: 5,
    text: "gente, não segurei a emoção kkkk serio dei o presente pra ele agora e o homem nao parava de chorar. falou q foi o melhor presente da vida dele. Deus é mt bom obrigada por isso msm",
    type: 'text',
    date: '03/02/2026'
  },
  {
    id: 22,
    author: 'Camila Lima',
    verified: true,
    rating: 5,
    text: "Serviço de alta qualidade e entrega pontual. A composição musical reflete profissionalismo e o atendimento é bastante prestativo durante todo o processo.",
    type: 'text',
    date: '11/01/2026'
  },
  {
    id: 23,
    author: 'Lúcia G',
    verified: true,
    rating: 5,
    text: "5 estrelas!!! meu marido ficou tao feliz q quase chorou e ele NUNCA chora kkkk. mostrou real nosso amor e a benção de Deus na nossa vida. vlw msm",
    type: 'text',
    date: '29/01/2026'
  },
  {
    id: 24,
    author: 'Renato V',
    verified: true,
    rating: 5,
    text: "Excelente padrão de produção e musicalidade. O resultado final está em total conformidade com o que foi solicitado, atendendo muito bem às expectativas.",
    type: 'text',
    date: '16/01/2026'
  },
  {
    id: 25,
    author: 'Letícia Ju',
    verified: true,
    rating: 5,
    text: "vcs conseguiram passar nossa conexão de um jeito q nem sei explicar. to sem palavras. chorei do começo ao fim ouvindo kkkk. q benção pro nosso aniversario!!",
    type: 'text',
    date: '23/01/2026'
  },
  {
    id: 26,
    author: 'Bernadete F.',
    verified: true,
    rating: 5,
    text: "eu errei as infos q mandei mas eles deixaram eu ajustar tudo. to mto feliz q escolhi a CançãoOração. nao pensem duas vezes gente vale cada centavo",
    type: 'text',
    date: '05/01/2026'
  },
  {
    id: 27,
    author: 'Carol Rocha',
    verified: true,
    rating: 5,
    text: "vi no face e achei q podia ser fake ou ruim mas quebrei a cara. parece musica de radio de verdade. meu namorado ficou em choque. melhor presente",
    type: 'text',
    date: '01/02/2026'
  },
  {
    id: 28,
    author: 'Cristina Silva',
    verified: true,
    rating: 5,
    text: "eu e meu marido amamos mto. ouvimos juntos e parece q uniu mais a gente ainda. Deus abençoe vcs pelo trabalho",
    type: 'text',
    date: '19/01/2026'
  },
  {
    id: 29,
    author: 'Fernanda Costa',
    verified: true,
    rating: 5,
    text: "melhor presente de todos!!! ele ficou mto emocionado. vamos tocar pra familia toda no domingo. mto mto obrigada CançãoOração!!",
    type: 'text',
    date: '27/01/2026'
  },
  {
    id: 30,
    author: 'Joyce S.',
    verified: true,
    rating: 5,
    text: "fiquei com os olhos cheios de d'água… meu marido ficou em choque nao sabia nem o que falar. melhor presente q ja dei. obrigada por essa benção! 🙏",
    type: 'text',
    date: '13/01/2026'
  },
  {
    id: 31,
    author: 'Talita K.',
    verified: true,
    rating: 5,
    text: "esqueci de colocar a data do nosso casamento mas deixaram eu refazer e incluir. ainda bem pq ficou perfeito. Deus abençoe vcs!!",
    type: 'text',
    date: '07/01/2026'
  },
  {
    id: 33,
    author: 'Alice S.',
    verified: true,
    rating: 5,
    text: "presente de milhões!!! ele nao para de ouvir kkkk. mostra real o amor que a gente tem um pelo outro e por Deus.",
    type: 'text',
    date: '21/01/2026'
  },
  {
    id: 34,
    author: 'Bruna Lopes',
    verified: true,
    rating: 4.5,
    text: "Eles sao mt pacientes! Nao gostei de uma frase e mudaram pra mim sem problema nenhum. raro ver gente que se importa de vdd se a gente gostou ou nao. coisa linda",
    type: 'text',
    date: '30/01/2026'
  },
  {
    id: 35,
    author: 'Raquel Silva',
    verified: true,
    rating: 5,
    text: "lindo dms… ficamos os dois sem palavras. que letra profunda. obrigada",
    type: 'text',
    date: '24/01/2026'
  },
  {
    id: 36,
    author: 'Silvia G.',
    verified: true,
    rating: 5,
    text: "meu esposo quase caiu pra tras quando ouviu o nome dele. falou que foi a coisa mais linda que ja fizeram por ele. trabalho top",
    type: 'text',
    date: '17/01/2026'
  },
  {
    id: 37,
    author: 'Douglas M.',
    verified: true,
    rating: 5,
    text: "Trabalho musical de primeira linha e pontualidade na entrega. A comunicação foi clara e os elementos da história foram bem integrados à melodia.",
    type: 'text',
    date: '09/01/2026'
  },
  {
    id: 38,
    author: 'Kátia',
    verified: true,
    rating: 5,
    text: "Essa musica é a nossa cara. nao consigo parar de ouvir. tava com medo de parecer 'ia' ou fake mas parece cantor de verdade. impressionada",
    type: 'text',
    date: '26/01/2026'
  },
  {
    id: 39,
    author: 'Vanessa B.',
    verified: true,
    rating: 5,
    text: "Virei a esposa favorita hoje!! kkkk. ele amou a musica dele. uma benção pro nosso casamento. valeu time CançãoOração!",
    type: 'text',
    date: '12/01/2026'
  },
  {
    id: 40,
    author: 'Simone R. Alves',
    verified: true,
    rating: 5,
    text: "Ainda estou tremendo. Dei pro meu marido no nosso aniversário e ele ficou sem fôlego de tanta surpresa. Me disse que foi o melhor presente que já ganhou na vida! Capturou perfeitamente o amor que construímos com a graça de Deus. Ver ele feliz assim valeu cada centavo.",
    type: 'text',
    date: '03/01/2026'
  },
  {
    id: 41,
    author: 'Júlia M.',
    verified: true,
    rating: 5,
    text: "Acabei de ouvir e sério, fiquei com um nó na garganta… mas do melhor jeito possível. 😭 Não sei como vcs transformaram nossa história em algo tão profissional e pessoal ao mesmo tempo. Parece que vcs conhecem a nossa vida. Obrigada, obrigada!",
    type: 'text',
    date: '18/01/2026'
  },
  {
    id: 42,
    author: 'Maria Vitória',
    verified: true,
    rating: 5,
    text: "Meu marido é a pessoa mais difícil do mundo de presentear, mas vcs conseguiram. Ele ficou em silêncio só absorvendo, e depois pediu pra ouvir de novo na hora. Falou que foi a coisa mais especial que ele já teve. Uma benção pro nosso lar.",
    type: 'text',
    date: '28/01/2026'
  },
  {
    id: 43,
    author: 'Cadu Ramos',
    verified: true,
    rating: 5,
    text: "Vi o anúncio e confesso que fiquei meio assim, mas UAU. Superou tudo. A voz do cantor parece de um anjo. Já mandei o link no grupo da igreja toda. 5 estrelas é pouco!",
    type: 'text',
    date: '11/01/2026'
  },
  {
    id: 44,
    author: 'Danielle S.',
    verified: true,
    rating: 5,
    text: "Tivemos um ano muito pesado e essa música foi como um fôlego novo. É mais que música, é um lembrete da fidelidade de Deus na nossa história. Vou guardar pra sempre. Vcs têm um dom!",
    type: 'text',
    date: '15/01/2026'
  },
  {
    id: 45,
    author: 'Talita B.',
    verified: true,
    rating: 5,
    text: "Meu Deus!! Eu ia esperar até domingo pra mostrar, mas não aguentei kkkk! Já ouvi umas 20 vezes hoje. É lindo demais. Vcs pegaram a personalidade dele direitinho. To mto feliz!",
    type: 'text',
    date: '22/01/2026'
  },
  {
    id: 46,
    author: 'Roberto H. Santos',
    verified: true,
    rating: 5,
    text: "Fiz para os meus filhos terem uma 'oração' minha em forma de música. Ficou tão doce e sincero. É algo que eles vão ter pra sempre pra lembrar de mim. A letra ficou perfeita e a melodia gruda na cabeça. Obrigada por facilitarem tanto.",
    type: 'text',
    date: '07/01/2026'
  },
  {
    id: 47,
    author: 'Aline W.',
    verified: true,
    rating: 4.5,
    text: "Vou ser sincera, não achei que ia soar tão bem. Parece música de rádio, mas é sobre a MINHA família. Tô chocada. Como vcs fazem tão rápido?! Deus com certeza está no negócio!",
    type: 'text',
    date: '02/02/2026'
  },
  {
    id: 48,
    author: 'Marcos Goulart',
    verified: true,
    rating: 5,
    text: "Melhor presente de aniversário de casamento. Ponto final. Minha esposa começou a chorar nos primeiros 30 segundos. Às vezes é difícil colocar o que a gente sente em palavras, mas vcs fizeram isso por mim. Tornou nossos 20 anos inesquecíveis.",
    type: 'text',
    date: '25/01/2026'
  },
  {
    id: 49,
    author: 'Sra. Dirce Pires',
    verified: true,
    rating: 5,
    text: "Simplesmente lindo. Puro e simples. Tocou meu coração e me lembrou de todas as bençãos que a gente esquece no dia a dia. Vou recomendar pra todo mundo. Deus abençoe!",
    type: 'text',
    date: '10/01/2026'
  },
  {
    id: 50,
    author: 'Thiago D.',
    verified: true,
    rating: 5,
    text: "Eu não sou muito de demonstrar sentimento, mas cara… isso me pegou. Uma coisa é dizer que ama, outra é ouvir sua história em forma de música. Fiquei sem palavras. Trabalho incrível.",
    type: 'text',
    date: '20/01/2026'
  },
  {
    id: 51,
    author: 'Guilherme L.',
    verified: true,
    rating: 4,
    text: "Boa experiência de personalização. A letra interpretou bem as informações enviadas e a produção sonora demonstrou um padrão profissional adequado.",
    type: 'text',
    date: '30/01/2026'
  },
  {
    id: 52,
    author: 'Alessandra K.',
    verified: true,
    rating: 5,
    text: "Meu noivo ficou com a voz embargada. Não conseguia nem falar depois que a música acabou. Só perguntava: 'como eles sabem tanto da gente?'. Parece que vcs leram nossa alma. Se quer mostrar que alguém é seu mundo, faça isso. Deus abençoe!",
    type: 'text',
    date: '14/01/2026'
  },
  {
    id: 53,
    author: 'Breno T.',
    verified: true,
    rating: 5,
    text: "Equipe profissional e comprometida com a qualidade do projeto. A produção final atendeu plenamente ao planejamento, apresentando ótima fidelidade de áudio.",
    type: 'text',
    date: '24/01/2026'
  },
  {
    id: 54,
    author: 'Elena & Jorge',
    verified: true,
    rating: 5,
    text: "Isso não é só uma música, é uma oração. Refletiu nosso amor de um jeito que eu não achava possível. Meu parceiro disse que foi uma benção direta de Deus. Ficamos os dois chorando de mãos dadas ouvindo. É o nosso maior tesouro agora.",
    type: 'text',
    date: '05/01/2026'
  },
  {
    id: 55,
    author: 'Patrícia Mendes',
    verified: true,
    rating: 5,
    text: "Meu marido me disse hoje que em 30 anos esse foi o melhor presente que ele já ganhou. Ficou muito tocado com a descrição do nosso amor e da nossa caminhada com Cristo. É forte. Emocionante. Tudo. Obrigada por me fazerem brilhar!",
    type: 'text',
    date: '29/01/2026'
  },
  {
    id: 56,
    author: 'Kevin P.',
    verified: true,
    rating: 5,
    text: "O que eu mais amei foi essa troca. Eu queria um 'estilo' específico e quando pedi um ajuste, vcs fizeram na hora. Dá pra ver que vcs querem que a gente ame o resultado. Dá paz saber que se não gostar de algo, vcs refazem. Ficou a nossa cara. Deus abençoe esse time!",
    type: 'text',
    date: '17/01/2026'
  },
  {
    id: 57,
    author: 'Ana',
    verified: true,
    rating: 5,
    text: "coisa mais linda 😭",
    type: 'text',
    date: '08/01/2026'
  },
  {
    id: 58,
    author: 'Lucas',
    verified: true,
    rating: 5,
    text: "melhor presente da vida",
    type: 'text',
    date: '21/01/2026'
  },
  {
    id: 59,
    author: 'Pri',
    verified: true,
    rating: 5,
    text: "simplesmente incrível 🙏",
    type: 'text',
    date: '27/01/2026'
  },
  {
    id: 60,
    author: 'Renato',
    verified: true,
    rating: 5,
    text: "uau… sem palavras",
    type: 'text',
    date: '04/01/2026'
  },
  {
    id: 61,
    author: 'Felipe',
    verified: true,
    rating: 5,
    text: "Deus é bom dms",
    type: 'text',
    date: '16/01/2026'
  },
  {
    id: 62,
    author: 'Gabi',
    verified: true,
    rating: 4,
    text: "bom",
    type: 'text',
    date: '23/01/2026'
  },
  {
    id: 63,
    author: 'Ju',
    verified: true,
    rating: 5,
    text: "ele amou!!",
    type: 'text',
    date: '13/01/2026'
  },
  {
    id: 64,
    author: 'Matheus',
    verified: true,
    rating: 5,
    text: "benção pura",
    type: 'text',
    date: '31/01/2026'
  },
  {
    id: 65,
    author: 'Cláudia',
    verified: true,
    rating: 4.5,
    text: "to mto tocada",
    type: 'text',
    date: '01/01/2026'
  },
  {
    id: 66,
    author: 'Vini',
    verified: true,
    rating: 4.5,
    text: "qualidade top",
    type: 'text',
    date: '19/01/2026'
  },
  {
    id: 67,
    author: 'Suelen',
    verified: true,
    rating: 5,
    text: "mto feliz!!!",
    type: 'text',
    date: '22/01/2026'
  },
  {
    id: 68,
    author: 'Bia',
    verified: true,
    rating: 5,
    text: "lágrimas de alegria",
    type: 'text',
    date: '26/01/2026'
  },
  {
    id: 69,
    author: 'Dani',
    verified: true,
    rating: 5,
    text: "choquei.",
    type: 'text',
    date: '09/01/2026'
  },
  {
    id: 70,
    author: 'Edu',
    verified: true,
    rating: 5,
    text: "absolutamente perfeito",
    type: 'text',
    date: '03/02/2026'
  },
  {
    id: 71,
    author: 'Lê',
    verified: true,
    rating: 4.5,
    text: "recomendo mto",
    type: 'text',
    date: '28/01/2026'
  },
  {
    id: 72,
    author: 'Rafa',
    verified: true,
    rating: 5,
    text: "mto emocionante",
    type: 'text',
    date: '29/01/2026'
  },
  {
    id: 73,
    author: 'Thais',
    verified: true,
    rating: 5,
    text: "coração derreteu",
    type: 'text',
    date: '14/01/2026'
  },
  {
    id: 74,
    author: 'Sérgio',
    verified: true,
    rating: 5,
    text: "Deus abençoe vcs",
    type: 'text',
    date: '06/01/2026'
  },
  {
    id: 75,
    author: 'Bel',
    verified: true,
    rating: 5,
    text: "o melhor de todos!!!!",
    type: 'text',
    date: '18/01/2026'
  },
  {
    id: 76,
    author: 'Luan',
    verified: true,
    rating: 5,
    text: "música maravilhosa",
    type: 'text',
    date: '05/02/2026'
  },
  {
    id: 77,
    author: 'Vitor',
    verified: true,
    rating: 5,
    text: "simplesmente o melhor",
    type: 'text',
    date: '02/02/2026'
  },
  {
    id: 78,
    author: 'Tati',
    verified: true,
    rating: 4,
    text: "ele chorou kkk",
    type: 'text',
    date: '11/01/2026'
  },
  {
    id: 79,
    author: 'Mônica',
    verified: true,
    rating: 4.5,
    text: "mto mto especial",
    type: 'text',
    date: '21/01/2026'
  },
  {
    id: 80,
    author: 'Caio',
    verified: true,
    rating: 5,
    text: "atendimento nota 10",
    type: 'text',
    date: '30/01/2026'
  },
  {
    id: 81,
    author: 'Zeca',
    verified: true,
    rating: 5,
    text: "sem palavras… uau",
    type: 'text',
    date: '25/01/2026'
  },
  {
    id: 82,
    author: 'J. Tomaz',
    verified: true,
    rating: 3,
    text: "a musica ficou ok mas tive que pedir pra refazer pq erraram um nome. mas corrigiram rapido até. 3 estrelas",
    type: 'text',
    date: '03/02/2026'
  }
];
