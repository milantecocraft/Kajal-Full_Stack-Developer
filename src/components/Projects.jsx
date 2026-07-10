import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from './Reveal.jsx'
import { projects } from '../data/content.js'

const categories = ['All', ...new Set(projects.map((p) => p.category))]

export default function Projects() {
  const [active, setActive] = useState('All')
  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Selected work"
          title="Products I've shipped."
          sub="Live platforms across AI, travel, e-commerce and fintech — the pattern is always the same: launch fast, scale safely."
        />

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                active === category
                  ? 'text-white'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {active === category && (
                <motion.span
                  layoutId="project-filter-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-ink"
                />
              )}
              <span className="relative">{category}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-colors hover:border-ink"
              >
                {/* Thumbnail */}
                <div
                  className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
                >
                  <span className="text-4xl transition-transform duration-300 group-hover:scale-125">
                    {project.emoji}
                  </span>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={`${project.title} website`}
                      loading="lazy"
                      onError={(e) => e.currentTarget.remove()}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute top-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold text-ink backdrop-blur-sm">
                    {project.category}
                  </span>
                  {project.outcome && (
                    <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-emerald-600/90 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                      ▲ {project.outcome}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold text-ink">
                    {project.title}
                  </h3>
                  {project.role && (
                    <p className="mt-1 text-[11px] font-semibold tracking-wide text-accent">
                      {project.role}
                    </p>
                  )}
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">
                    {project.text}
                  </p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-ink transition-colors hover:text-accent"
                    >
                      {new URL(project.url).hostname.replace('www.', '')}
                      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
