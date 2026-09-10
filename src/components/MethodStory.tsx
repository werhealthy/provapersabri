import { useEffect, useRef, useState } from 'react'
import { siteContent } from '../content/site'

type MethodStep = (typeof siteContent.method.steps)[number]

function MethodVisual({ step, index }: { step: MethodStep; index: number }) {
  return (
    <div className={`method-visual method-visual--${step.visual}`} aria-hidden="true">
      <div className="method-visual__chrome">
        <span>Senty</span>
        <span>{step.number} / 05</span>
      </div>

      <div className="method-visual__stage">
        <div className="method-orbit method-orbit--outer" />
        <div className="method-orbit method-orbit--inner" />

        <div className="method-source method-source--one">Review</div>
        <div className="method-source method-source--two">Survey</div>
        <div className="method-source method-source--three">Social</div>
        <div className="method-source method-source--four">Support</div>

        <div className="method-core">
          <span className="method-core__kicker">{step.title}</span>
          <strong>{step.note}</strong>
        </div>

        <div className="method-signal method-signal--one" />
        <div className="method-signal method-signal--two" />
        <div className="method-signal method-signal--three" />
        <div className="method-signal method-signal--four" />
      </div>

      <div className="method-visual__footer">
        <span>Noise</span>
        <div className="method-progress" aria-hidden="true">
          <span style={{ width: `${((index + 1) / siteContent.method.steps.length) * 100}%` }} />
        </div>
        <span>Action</span>
      </div>
    </div>
  )
}

export function MethodStory() {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef<Array<HTMLElement | null>>([])

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
      {
        rootMargin: '-24% 0px -38% 0px',
        threshold: [0.15, 0.35, 0.6, 0.85],
      },
    )

    stepRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const activeStep = siteContent.method.steps[activeIndex]

  return (
    <section className="method" id="metodo">
      <div className="method__intro">
        <p className="section-eyebrow">{siteContent.method.eyebrow}</p>
        <h2>{siteContent.method.title}</h2>
        <p>{siteContent.method.intro}</p>
      </div>

      <div className="method__story">
        <div className="method__copy-column">
          {siteContent.method.steps.map((step, index) => (
            <article
              className={`method-step${activeIndex === index ? ' is-active' : ''}`}
              data-index={index}
              key={step.id}
              ref={(node) => { stepRefs.current[index] = node }}
            >
              <span className="method-step__number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <strong>{step.note}</strong>
              </div>
            </article>
          ))}
        </div>

        <div className="method__visual-column">
          <div className="method__sticky">
            <MethodVisual step={activeStep} index={activeIndex} />
          </div>
        </div>
      </div>
    </section>
  )
}
