import { motion } from 'framer-motion'
import Reveal, { SectionHeader } from './Reveal.jsx'
import { services } from '../data/content.js'

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Services"
          title="What I do for founders & CTOs."
          sub="From surgical MVPs to scaling legacy platforms — every engagement is built to protect your runway and maximize velocity."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group h-full rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-ink"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-xl shadow-sm">
                  {service.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
