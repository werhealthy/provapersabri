import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { siteContent } from '../content/site'

export function MethodStory() {
  const [activeIndex, setActiveIndex] = useState(0)
  const markers = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return
        const index = Number((visible.target as HTMLElement).dataset.index)
        if (!Number.isNaN(index)) setActiveIndex(index)
      },
      { rootMargin: '-30% 0px -48% 0px', threshold: [0.2, 0.45, 0.7] },
    )

    markers.current.forEach((marker) => marker && observer.observe(marker))
    return () => observer.disconnect()
  }, [])

  const activeStep = siteContent.method.steps[activeIndex]

  const jumpToStep = (index: number) => {
    markers.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="method-klarna" id="metodo">
      <div className="method-klarna__sticky">
        <div className="method-klarna__visuals" aria-live="polite">
          {siteContent.method.steps.map((step, index) => {
            const offset = index - activeIndex
            return (
              <figure
                className={`method-shot${index === activeIndex ? ' is-active' : ''}`}
                key={step.id}
                style={{ '--offset': offset } as CSSProperties}
              >
                <img src={step.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
                <figcaption className="method-shot__ui">
                  <span>{step.number}</span>
                  <strong>{step.note}</strong>
                </figcaption>
              </figure>
            )
          })}
        </div>

        <div className="method-klarna__content">
          <p className="section-eyebrow">{siteContent.method.eyebrow}</p>
          <div className="method-klarna__active-copy" key={activeStep.id}>
            <h2>{activeStep.title}</h2>
            <p>{activeStep.body}</p>
          </div>

          <div className="method-klarna__menu" aria-label="Fasi del metodo Senty">
            {siteContent.method.steps.map((step, index) => (
              <button
                type="button"
                className={index === activeIndex ? 'is-active' : ''}
                onClick={() => jumpToStep(index)}
                aria-current={index === activeIndex ? 'step' : undefined}
                key={step.id}
              >
                <span>{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="method-klarna__scroll-track" aria-hidden="true">
        {siteContent.method.steps.map((step, index) => (
          <div
            className="method-klarna__marker"
            data-index={index}
            key={step.id}
            ref={(node) => { markers.current[index] = node }}
          />
        ))}
      </div>
    </section>
  )
}
