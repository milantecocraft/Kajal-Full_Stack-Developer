import Reveal, { SectionHeader } from './Reveal.jsx'
import { skillGroups, topSkills } from '../data/content.js'

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Skills"
          title="The toolbox behind the work."
          sub="Deep in the JavaScript ecosystem, fluent across the whole stack."
        />

        {/* Top skills */}
        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {topSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-ink px-5 py-2.5 font-display text-sm font-semibold text-white"
            >
              {skill}
            </span>
          ))}
        </Reveal>

        {/* Groups */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-sm font-bold tracking-wide text-accent uppercase">
                  {group.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line bg-paper px-3 py-1.5 text-[13px] font-medium text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
