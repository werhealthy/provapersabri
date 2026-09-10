export const siteContent = {
  brand: {
    name: 'Senty',
    logoSrc: 'https://raw.githubusercontent.com/SabRo11/Senty/main/public/senty-logo.svg',
  },
  nav: {
    links: [
      { label: 'Metodo', href: '#metodo' },
      { label: 'Insight', href: '#insight' },
      { label: 'Perché Senty', href: '#perche-senty' },
    ],
    cta: { label: 'Richiedi una demo', href: '#demo' },
  },
  hero: {
    eyebrow: 'SENTIMENT INTELLIGENCE',
    title: ['Capisci cosa sentono', 'le persone.', 'E cosa farne.'],
    body: 'Senty raccoglie feedback, recensioni e conversazioni e li trasforma in segnali chiari, confrontabili e pronti per diventare decisioni.',
    primaryCta: { label: 'Richiedi una demo', href: '#demo' },
    secondaryCta: { label: 'Scopri come funziona', href: '#metodo' },
  },
  heroSignals: [
    { source: 'Google', quote: 'Prodotto ottimo, consegna lenta.', sentiment: 'Misto' },
    { source: 'Instagram', quote: 'Esperienza super intuitiva ✨', sentiment: 'Positivo' },
    { source: 'Survey', quote: 'Vorrei tempi di risposta più rapidi.', sentiment: 'Negativo' },
  ],
  insight: {
    label: 'Senty ha trovato un pattern',
    title: 'Il servizio sta diventando il principale driver del sentiment.',
    meta: '+18% menzioni nelle ultime 4 settimane',
  },
} as const
