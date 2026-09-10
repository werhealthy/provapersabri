import { siteContent } from '../content/site'

const sentimentClass = {
  Positivo: 'is-positive',
  Misto: 'is-neutral',
  Negativo: 'is-negative',
} as const

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Esempio di segnali trasformati in insight da Senty">
      <div className="signal-orbit" aria-hidden="true" />

      <div className="signal-stack">
        {siteContent.heroSignals.map((signal, index) => (
          <article className={`signal-card signal-card--${index + 1}`} key={signal.quote}>
            <div className="signal-card__topline">
              <span>{signal.source}</span>
              <span className={`sentiment ${sentimentClass[signal.sentiment]}`}>{signal.sentiment}</span>
            </div>
            <p>{signal.quote}</p>
          </article>
        ))}
      </div>

      <article className="insight-card">
        <span className="insight-card__badge">◆ {siteContent.insight.label}</span>
        <h2>{siteContent.insight.title}</h2>
        <p>{siteContent.insight.meta}</p>
      </article>
    </div>
  )
}
