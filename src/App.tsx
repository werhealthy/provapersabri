import { HeroVisual } from './components/HeroVisual'
import { MethodStory } from './components/MethodStory'
import { siteContent } from './content/site'

export default function App() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero__panel">
          <header className="nav-shell">
            <a className="brand" href="#top" aria-label="Senty home">
              <img src={siteContent.brand.logoSrc} alt={siteContent.brand.name} />
            </a>

            <nav className="nav-links" aria-label="Navigazione principale">
              {siteContent.nav.links.map((link) => (
                <a href={link.href} key={link.href}>{link.label}</a>
              ))}
            </nav>

            <a className="button button--light nav-cta" href={siteContent.nav.cta.href}>
              {siteContent.nav.cta.label}
            </a>
          </header>

          <div className="hero__grid">
            <div className="hero__copy">
              <p className="eyebrow">{siteContent.hero.eyebrow}</p>
              <h1>
                {siteContent.hero.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p className="hero__body">{siteContent.hero.body}</p>

              <div className="hero__actions">
                <a className="button button--light" href={siteContent.hero.primaryCta.href}>
                  {siteContent.hero.primaryCta.label}
                </a>
                <a className="button button--ghost" href={siteContent.hero.secondaryCta.href}>
                  {siteContent.hero.secondaryCta.label} <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>

            <HeroVisual />
          </div>
        </div>
      </section>

      <MethodStory />

      <section className="placeholder-section" id="insight" aria-label="Prossimo step">
        <p>Step successivo: rendere visibili gli insight e il valore del prodotto.</p>
      </section>
    </main>
  )
}
