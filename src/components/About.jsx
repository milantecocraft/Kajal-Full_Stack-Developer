import Reveal, { SectionHeader } from './Reveal.jsx'
import { about, partnerPoints, profile } from '../data/content.js'

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="About"
          title="Commercial ambition, meet technical execution."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Narrative */}
          <Reveal>
            <div className="space-y-5 text-[15px] leading-relaxed text-muted sm:text-base">
              <p className="font-display text-xl leading-snug font-semibold text-ink sm:text-2xl">
                {about.paragraphs[0]}
              </p>
              {about.paragraphs.slice(1).map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              📩 Direct advisory · {profile.email}
            </a>
          </Reveal>

          {/* How I partner */}
          <div className="grid gap-4 sm:grid-cols-2">
            {partnerPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-lg">
                  <span className="font-display text-xs font-bold text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {point.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
