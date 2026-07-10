import { motion } from 'framer-motion'
import { profile, stats, techStack } from '../data/content.js'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background: soft grid + gradient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(17,17,19,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,19,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 right-[8%] h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-40 pb-16 text-center sm:px-6 sm:pt-44"
      >
        {/* Availability badge */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-[13px] font-medium text-muted shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {profile.availability}
          <span className="text-line">|</span>
          {profile.location.split(',')[0]}, UK
        </motion.div>

        {/* Intro line */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-sm font-semibold tracking-[0.2em] text-accent uppercase"
        >
          {profile.shortName} · {profile.pronouns} · {profile.role}
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="mt-5 max-w-4xl font-display text-4xl leading-[1.06] font-bold tracking-tight text-ink sm:text-6xl md:text-7xl"
        >
          Building web &amp; mobile apps,{' '}
          <span className="bg-gradient-to-r from-accent via-violet-500 to-amber-500 bg-clip-text text-transparent">
            APIs &amp; AI-powered
          </span>{' '}
          solutions.
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ink/10 transition-colors hover:bg-accent"
          >
            View my work
          </motion.a>
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            {profile.email}
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.dl
          variants={fadeUp}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col bg-white px-4 py-6">
              <dt className="order-2 mt-1 text-xs leading-snug text-muted">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold tracking-tight text-ink">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Tech marquee */}
        <motion.div
          variants={fadeUp}
          className="relative mt-14 w-full max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="flex w-max gap-3"
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-muted"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.a
          href="#about"
          variants={fadeUp}
          className="mt-16 flex flex-col items-center gap-2 text-xs font-medium tracking-widest text-muted uppercase"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}
