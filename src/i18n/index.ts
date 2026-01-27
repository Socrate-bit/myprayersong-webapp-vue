import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    header: {
      trackOrder: 'Track Order',
      reviews: 'Reviews',
      createSong: 'Create Your Song'
    },
    hero: {
      listenExample: 'Listen to Example',
      badge: 'The #1 Custom Christian Song Platform'
    },
    valueProp: {
      badge: 'The #1 Custom Christian Song Platform',
      headline: '"This PrayerSong Brought Me To Tears!"',
      subheadline: 'Surprise Your Loved One with a Custom Christian Song They\'ll Never Forget',
      cta: 'Start My Custom Song',
      delivery: 'Delivered With Love, Prayer, & Care In 7 Days',
      lovedBy: 'Loved by 1000+ families'
    },
    howItWorks: {
      title: 'How PrayerSong Works',
      step1: 'Fill out the survey',
      step2: 'We create your song',
      step3: 'Delivered in 7 days to your email',
      cta: 'Start My Custom Song'
    },
    testimonials: {
      title: 'Why 1000+ Customers Love PrayerSong',
      card: {
        quote: '"Oh praise God! This is absolutely breathtaking. I can\'t believe it... I am going to have a hard time keeping this a secret until Sunday. We will listen to it on our way to church! God bless this work you are doing."',
        author: 'Wendy B.',
        verified: 'Verified Customer',
        songTitle: 'God Gave Me You'
      }
    },
    giftGrid: {
      title: 'Gift a PrayerSong to a Loved One, or to Yourself!',
      categories: {
        partner: 'For Your Partner',
        children: 'For Children',
        loss: 'For Loss',
        parents: 'For Parents',
        yourself: 'For Yourself',
        strength: 'For Strength',
        healing: 'For Healing',
        prayers: 'For Prayers',
        breakthroughs: 'For Breakthroughs'
      },
      cta: 'Start Creating Your Song'
    },
    whatYouGet: {
      title: 'What You Get',
      subtitle: 'Once we finish your song, you\'ll get an email with a link to play your PrayerSong like below!',
      duration: '3:54'
    },
    features: {
      radio: {
        title: 'Radio-Quality Song',
        desc: 'Radio-quality PrayerSong, ready to share'
      },
      lyrics: {
        title: 'Personalized Lyrics',
        desc: 'Custom lyrics inspired by your story'
      },
      delivery: {
        title: '7-Day Delivery',
        desc: 'Receive your finished song in just 7 days'
      },
      cta: 'Create My Custom Song',
      guarantee: 'Risk-Free Purchase • 30 day money back guarantee'
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          q: 'What makes these songs special?',
          a: 'Each PrayerSong is custom-written from your story. It is a one-of-a-kind gift rooted in Scripture, prayer, and genuine care.'
        },
        {
          q: 'How long does it take to receive the song?',
          a: 'Your finished PrayerSong is delivered in 7 days. Optionally, if you need your song faster, we can deliver in 24 hours for an extra fee of $59 - simply select the priority delivery upgrade after you purchase your song.'
        },
        {
          q: 'Can I get my PrayerSong faster in 24 hours?',
          a: 'Yes! While standard delivery is 7 days, we offer priority 24 hour delivery for an additional $59. Simply select the priority delivery upgrade after you purchase your song, and we\'ll have your PrayerSong ready in just 24 hours.'
        },
        {
          q: 'What themes can I write about?',
          a: 'Anything that honors God and your loved one: birthdays, anniversaries, weddings, grief, encouragement, testimonies, or prayers for strength and healing.'
        },
        {
          q: 'What is your process?',
          a: 'Every PrayerSong is created to the same standard as the songs you hear on the radio, and goes through several quality checks for both lyrics and production before completion. Our lyricists pour their hearts into making each lyrics personal and meaningful, then our producers use the help of the latest music production technology, including modern artificial intelligence assisted music production tools, to bring your heartfelt lyrics to life at an affordable price. In fact, we often refine and reproduce the song multiple times until we find the best version, so the final version you receive has the best melody, lyrics, and production. Each song typically reaches at least 3 separate team members (lyricist, producer, and quality control) before reaching your inbox. We\'re so confident in our process that we offer a full refund if you\'re not satisfied. That said, it rarely comes up, most people love their PrayerSong :)'
        },
        {
          q: 'How will I receive the finished song?',
          a: 'You will receive a secure link via email to play your PrayerSong on any device and to easily share it with family and friends.'
        },
        {
          q: 'Can I use the song in a church or event?',
          a: 'Yes, you may share and play your PrayerSong at private events and church gatherings.'
        }
      ]
    },
    footer: {
      tagline: 'We create custom songs rooted in faith, to honor your loved ones and glorify God\'s love through music.',
      contact: {
        title: 'Contact',
        email: 'hello@prayersong.com'
      },
      trackOrder: {
        title: 'Track Order',
        link: 'Track Your Song'
      },
      links: {
        title: 'Links',
        reviews: 'Reviews',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy'
      },
      copyright: '© 2025 PrayerSong. All rights reserved.'
    },
    funnel: {
      step1: {
        title: 'Let\'s start with the basics',
        subtitle: 'Tell us about the special person in your life',
        question1: 'Who\'s this for?',
        options: {
          husband: 'Husband',
          wife: 'Wife',
          boyfriend: 'Boyfriend',
          girlfriend: 'Girlfriend',
          children: 'Children',
          father: 'Father',
          mother: 'Mother',
          sibling: 'Sibling',
          friend: 'Friend',
          myself: 'Myself',
          other: 'Other'
        },
        question2: 'What\'s their name?',
        placeholder: 'Enter their first name',
        tip: 'Tip: add pronunciation for clarity (e.g. Alicia: ah-lee-sha)'
      },
      step2: {
        title: 'Choose a Genre',
        question1: 'Preferred Genre',
        options: {
          pop: 'Pop',
          country: 'Country',
          rock: 'Rock',
          rnb: 'R&B',
          jazz: 'Jazz',
          worship: 'Worship',
          rap: 'Rap / Hip-Hop'
        },
        question2: 'Preferred Voice Gender',
        tip: 'We recommend choosing your own gender so the vocals feel personal.',
        genderOptions: {
          female: 'Female Voice',
          male: 'Male Voice',
          none: 'No Preference'
        }
      },
      step3: {
        title: 'What makes them special?',
        subtitle: 'Describe their character and the qualities you love most',
        question: 'Their beautiful qualities',
        placeholder: 'Are they patient, wise, funny, protective, encouraging? What makes them the incredible person they are?'
      },
      step4: {
        title: 'Share your favorite memories',
        subtitle: 'What moments with them do you treasure most?',
        question: 'Special moments together',
        placeholder: 'What memories do you always come back to? A moment you laugh about every time? Something you went through together that brought you closer?'
      },
      step5: {
        title: 'A message from your heart',
        subtitle: 'Write anything else that you feel would be relevant to include in your song, and we\'ll do our best to include it!',
        question: 'Special message',
        placeholder: 'What do you want them to know, feel, or remember?'
      },
      navigation: {
        back: 'Back',
        next: 'Next',
        step: 'Step {current} of {total}',
        complete: '{percent}% Complete'
      }
    },
    payment: {
      title: 'Almost There! Complete Your Order',
      subtitle: 'You\'re just one click away from creating a beautiful, personalized song for {name}.',
      deliveryDate: 'Expected song delivery date: {date}',
      emailLabel: 'Your Email Address',
      emailPlaceholder: 'you@email.com',
      cta: 'Create My Song',
      guarantee: '30-Day Money Back Guarantee',
      summary: {
        title: 'Your Custom Song Order',
        songFor: 'Song for:',
        delivery: 'Delivery:',
        customSong: 'Custom Song',
        discount: '50% OFF',
        originalPrice: '$199',
        price: '$99 USD',
        review: 'Review or Edit Survey'
      },
      discountCard: {
        title: 'Limited Time Sibling Discount',
        p1: 'Our songs typically cost $199, but we believe every sibling deserves to be celebrated for just $99 USD for a limited time only.',
        p2: 'Why only $99 USD? Thanks to generous donations and tips from our amazing customers, we\'re able to temporarily offer this special price for PrayerSongs made for siblings.'
      },
      whatYouGet: {
        title: 'What You\'ll Get',
        item1: {
          title: 'Radio-Quality Song',
          desc: 'Radio-quality PrayerSong, ready to share'
        },
        item2: {
          title: 'Personalized Lyrics',
          desc: 'Custom written just for {name}'
        },
        item3: {
          title: '7-Day Delivery',
          desc: 'Perfect for last-minute gifts'
        }
      },
      whyChoose: {
        title: 'Why Choose PrayerSong?',
        item1: 'Over 1,000 satisfied customers',
        item2: '100% satisfaction guarantee',
        item3: 'Secure payment processing',
        item4: 'Delivered in just 7 days'
      },
      guaranteeFull: {
        title: '100% Money Back Guarantee',
        item1: {
          title: 'Not satisfied? Get a full refund',
          desc: 'No questions asked, no hassle'
        },
        item2: {
          title: '30-day guarantee',
          desc: 'Plenty of time to listen and decide'
        },
        item3: {
          title: 'Risk-free purchase',
          desc: 'Your satisfaction is our priority'
        }
      },
      socialProof: {
        title: 'Hear Other PrayerSongs We Made',
        songs: [
          {
            title: 'Sent to Me from God',
            author: 'Pamela S.',
            quote: '"Absolutely beautiful, you captured such special moments... we both were crying."'
          },
          {
            title: 'Saving Grace',
            author: 'Wendy B.',
            quote: '"This is absolutely breathtaking. I can\'t believe it... I am going to have a hard time keeping this a secret until Sunday."'
          },
          {
            title: 'Stronger Now',
            author: 'Markeeta B.',
            quote: '"Very very wonderful song. I absolutely loved it and so did Dave!"'
          }
        ]
      }
    }
  }
}

const i18n = createI18n({
  legacy: false, // you must set `legacy: false` for Composition API
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})

export default i18n
