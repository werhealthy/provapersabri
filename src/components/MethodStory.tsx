import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { siteContent } from '../content/site'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function materialStandardEase(t: number) {
  // Material 3 Standard easing: cubic-bezier(0.2, 0, 0, 1)
  const x1 = 0.2
  const y1 = 0
  const x2 = 0
  const y2 = 1

  const sample = (a1: number, a2: number, value: number) => {
    const c = 3 * a1
    const b = 3 * (a2 - a1) - c
    const a = 1 - c - b
    return ((a * value + b) * value + c) * value
  }

  let low = 0
  let high = 1
  let guess = t

  for (let i = 0; i < 10; i += 1) {
    guess = (low + high) / 2
    const x = sample(x1, x2, guess)
    if (x < t) low = guess
    else high = guess
  }

  return sample(y1, y2, guess)
}

function titlePosition(index: number, activeIndex: number) {
  const activeBlock = 2.72
  if (index < activeIndex) return index - activeIndex
  if (index === activeIndex) return 0
  return activeBlock + (index - activeIndex - 1)
}

export function MethodStory() {
  const steps = siteContent.method.steps
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef(0)
  const targetRef = useRef(0)
  const frameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const readTarget = () => {
      const rect = scene.getBoundingClientRect()
      const sceneTop = window.scrollY + rect.top
      const available = Math.max(1, scene.offsetHeight - window.innerHeight)
      const normalized = clamp((window.scrollY - sceneTop) / available, 0, 1)
      targetRef.current = normalized * (steps.length - 1)
    }

    const tick = (time: number) => {
      const lastTime = lastTimeRef.current ?? time
      const dt = Math.min(40, time - lastTime)
      lastTimeRef.current = time

      const target = targetRef.current
      const current = progressRef.current
      const follow = reducedMotion.matches ? 1 : 1 - Math.exp(-dt / 92)
      const next = current + (target - current) * follow

      progressRef.current = Math.abs(target - next) < 0.0005 ? target : next
      setProgress(progressRef.current)

      if (Math.abs(target - progressRef.current) > 0.0005) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        frameRef.current = null
        lastTimeRef.current = null
      }
    }

    const requestTick = () => {
      readTarget()
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(tick)
    }

    readTarget()
    progressRef.current = targetRef.current
    setProgress(targetRef.current)

    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', requestTick)
    reducedMotion.addEventListener('change', requestTick)

    return () => {
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', requestTick)
      reducedMotion.removeEventListener('change', requestTick)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [steps.length])

  const segment = Math.min(steps.length - 1, Math.floor(progress))
  const nextSegment = Math.min(steps.length - 1, segment + 1)
  const phase = segment === nextSegment ? 0 : progress - segment
  const easedPhase = materialStandardEase(phase)
  const activeIndex = clamp(Math.round(progress), 0, steps.length - 1)

  const jumpToStep = (index: number) => {
    const scene = sceneRef.current
    if (!scene) return
    const rect = scene.getBoundingClientRect()
    const sceneTop = window.scrollY + rect.top
    const available = Math.max(1, scene.offsetHeight - window.innerHeight)
    const top = sceneTop + available * (index / Math.max(1, steps.length - 1))
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section className="method-klarna" id="metodo">
      <header className="method-klarna__intro">
        <h2>{siteContent.method.title}</h2>
        <p>{siteContent.method.intro}</p>
      </header>

      <div
        className="method-klarna__scene"
        ref={sceneRef}
        style={{ '--scene-height': `${100 + (steps.length - 1) * 72}vh` } as CSSProperties}
      >
        <div className="method-klarna__sticky">
          <div className="method-klarna__visuals" aria-hidden="true">
            {steps.map((step, index) => {
              const distance = index - progress
              const absDistance = Math.abs(distance)
              const opacity = clamp(1 - Math.max(0, absDistance - 1.15) * 0.7, 0, 1)
              const uiOpacity = clamp(1 - absDistance * 1.8, 0, 1)

              return (
                <figure
                  className="method-shot"
                  key={step.id}
                  style={{
                    '--visual-y': distance * 56,
                    '--visual-opacity': opacity,
                    '--ui-opacity': uiOpacity,
                    zIndex: 10 + index,
                  } as CSSProperties}
                >
                  <img src={step.image} alt="" loading={index < 2 ? 'eager' : 'lazy'} />
                  <figcaption className="method-shot__ui">
                    <span>{step.number}</span>
                    <strong>{step.note}</strong>
                  </figcaption>
                </figure>
              )
            })}
          </div>

          <div className="method-klarna__content">
            <div className="method-klarna__copy-stage">
              {steps.map((step, index) => {
                const yFrom = titlePosition(index, segment)
                const yTo = titlePosition(index, nextSegment)
                const y = yFrom + (yTo - yFrom) * easedPhase
                const distance = Math.abs(index - progress)
                const activeWeight = clamp(1 - distance, 0, 1)
                const bodyOpacity = materialStandardEase(activeWeight)
                const titleOpacity = 0.27 + activeWeight * 0.73

                return (
                  <button
                    type="button"
                    className="method-klarna__step"
                    key={step.id}
                    onClick={() => jumpToStep(index)}
                    aria-current={index === activeIndex ? 'step' : undefined}
                    style={{
                      '--copy-y': y,
                      '--title-opacity': titleOpacity,
                      '--body-opacity': bodyOpacity,
                      '--body-shift': (1 - bodyOpacity) * 12,
                    } as CSSProperties}
                  >
                    <span className="method-klarna__step-title">{step.title}</span>
                    <span className="method-klarna__step-body">{step.body}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
