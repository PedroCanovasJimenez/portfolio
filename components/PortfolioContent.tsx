"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const expertise = [
  {
    number: "01",
    title: "Creative web design",
    description:
      "Landing pages, portfolios, interfaces y experiencias scrollytelling con un lenguaje visual limpio, moderno y muy controlado.",
    skills: ["Next.js", "React", "Tailwind", "Framer Motion", "Canvas", "UI / UX"],
  },
  {
    number: "02",
    title: "FiveM development",
    description:
      "Sistemas a medida para QB-Core: scripts, NUI, inventarios, cámaras, menús y experiencias completas para servidores.",
    skills: ["Lua", "JavaScript", "QB-Core", "NUI", "HTML / CSS", "SQL"],
  },
  {
    number: "03",
    title: "AI creative direction",
    description:
      "Imagen, vídeo y workflows generativos con un enfoque creativo, técnico y orientado a identidad visual.",
    skills: ["ComfyUI", "Veo", "Prompt systems", "Image generation", "Video generation", "Automation"],
  },
  {
    number: "04",
    title: "Creative systems",
    description:
      "Concepto, prototipado, dirección visual y soluciones híbridas donde diseño, código e IA trabajan juntos.",
    skills: ["Art direction", "Branding", "Motion", "Strategy", "Content", "Rapid prototyping"],
  },
];

const capabilities = [
  "Interactive storytelling",
  "Scrollytelling design",
  "Responsive web systems",
  "FiveM / QB-Core architecture",
  "NUI interface building",
  "AI image direction",
  "AI video direction",
  "Prompt engineering",
  "Workflow design",
  "Creative prototyping",
  "Visual systems",
  "Digital concepts",
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 34, filter: "blur(7px)" }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionIndex({ children }: { children: string }) {
  return (
    <span className="micro-label inline-flex min-w-12 items-center gap-3">
      <span className="h-px w-7 bg-black/[0.28]" />
      {children}
    </span>
  );
}

export default function PortfolioContent() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="bg-canvas">
      <section
        id="expertise"
        className="section-shell scroll-mt-20 px-4 py-20 sm:scroll-mt-28 sm:px-9 sm:py-28 lg:px-[5vw] lg:py-40"
      >
        <div className="mx-auto max-w-[1640px]">
          <div className="grid gap-14 sm:gap-20 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
            <Reveal className="lg:sticky lg:top-24 lg:h-fit">
              <div className="relative border-l border-black/[0.18] pl-5 sm:pl-9">
                <span className="corner-mark -left-px -top-px" />
                <SectionIndex>01</SectionIndex>
                <p className="micro-label mt-5 sm:mt-7">Expertise</p>
                <h2 className="outline-display mt-5 max-w-3xl text-[clamp(3.45rem,16vw,5rem)] font-light sm:mt-7 sm:text-[clamp(4.6rem,8.7vw,10rem)]">
                  Diseño.
                  <br />
                  Ingeniería.
                  <br />
                  Dirección.
                </h2>
                <p className="mt-6 max-w-md text-[0.98rem] leading-7 text-black/[0.64] sm:mt-8 sm:text-lg sm:leading-8">
                  Trabajo en la intersección entre estética, estructura y ejecución.
                  El objetivo no es solo que algo se vea bien, sino que tenga sistema.
                </p>
              </div>
            </Reveal>

            <div className="border-t border-black/[0.16]">
              {expertise.map((item, index) => (
                <motion.article
                  key={item.number}
                  initial={reducedMotion ? false : { opacity: 0, x: 36 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.68, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={reducedMotion ? undefined : { x: 6 }}
                  className="group relative border-b border-black/[0.16] bg-white/[0.035] py-8 transition-colors duration-500 hover:bg-white/[0.13] sm:py-11"
                >
                  <div className="grid gap-4 px-4 sm:grid-cols-[68px_1fr_auto] sm:items-start sm:gap-6 sm:px-8">
                    <span className="micro-label text-black/[0.42] sm:pt-2">{item.number}</span>
                    <div className="min-w-0">
                      <h3 className="break-words text-[clamp(2.15rem,10.8vw,3.2rem)] font-normal leading-[1.06] tracking-[-0.028em] text-black/[0.9] sm:text-[clamp(2.5rem,4.25vw,5.1rem)] sm:leading-[1.04] sm:tracking-[-0.032em]">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-3xl text-[0.94rem] leading-7 text-black/[0.62] sm:mt-5 sm:text-base sm:leading-8">
                        {item.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3 sm:mt-7 sm:gap-x-5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="border-l border-black/[0.2] pl-2.5 text-[0.68rem] font-medium uppercase leading-5 tracking-[0.11em] text-black/[0.62] sm:pl-3 sm:text-[13px] sm:tracking-[0.14em]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.span
                      aria-hidden="true"
                      className="hidden pt-1 text-4xl font-light text-black/[0.22] sm:block"
                      animate={reducedMotion ? undefined : { x: [0, 4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
                    >
                      ↗
                    </motion.span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="work"
        className="section-shell scroll-mt-20 px-4 py-20 sm:scroll-mt-28 sm:px-9 sm:py-28 lg:px-[5vw] lg:py-40"
      >
        <div className="mx-auto max-w-[1640px]">
          <Reveal>
            <div className="flex flex-col gap-8 border-b border-black/[0.18] pb-9 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pb-12">
              <div className="min-w-0">
                <SectionIndex>02</SectionIndex>
                <p className="micro-label mt-5 sm:mt-7">Selected project</p>
                <h2 className="outline-display word-safe mt-5 text-[clamp(3rem,14vw,4.4rem)] font-light sm:mt-7 sm:text-[clamp(5rem,9.4vw,11rem)]">
                  itinocontext
                </h2>
              </div>
              <a
                href="https://www.instagram.com/itinocontext/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-12 w-full items-center justify-between gap-6 border border-black/[0.24] bg-white/[0.09] px-5 py-4 text-xs font-medium uppercase tracking-[0.14em] text-black/[0.74] transition duration-300 hover:bg-black hover:text-canvas sm:min-h-0 sm:w-fit sm:px-7 sm:py-5 sm:text-sm sm:tracking-[0.16em]"
              >
                View project
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </div>
          </Reveal>

          <div className="grid gap-0 border-x border-b border-black/[0.16] lg:grid-cols-[1.25fr_0.75fr]">
            <Reveal className="min-w-0" delay={0.08}>
              <motion.div
                whileInView={reducedMotion ? undefined : { backgroundPosition: ["0px 0px", "52px 52px"] }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="animated-grid relative min-h-[460px] overflow-hidden border-b border-black/[0.16] bg-white/[0.04] sm:min-h-[560px] lg:min-h-[720px] lg:border-b-0 lg:border-r"
              >
                <motion.div
                  aria-hidden="true"
                  initial={reducedMotion ? false : { scale: 0.82, rotate: -6, opacity: 0 }}
                  whileInView={reducedMotion ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[8%] top-[10%] h-[43%] w-[48%] border border-black/[0.17] bg-white/[0.08] sm:left-[10%] sm:top-[12%] sm:h-[48%]"
                />
                <motion.div
                  aria-hidden="true"
                  animate={reducedMotion ? undefined : { y: [0, -14, 0], rotate: [0, 1.4, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-[7%] top-[18%] h-[38%] w-[42%] border border-black/[0.22] bg-[linear-gradient(145deg,rgba(255,255,255,0.28),rgba(255,255,255,0.02))] shadow-[0_35px_85px_rgba(16,17,18,0.08)] sm:right-[10%] sm:top-[22%] sm:h-[42%] sm:w-[38%]"
                />
                <motion.div
                  aria-hidden="true"
                  animate={reducedMotion ? undefined : { x: ["-12%", "115%"] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 w-px bg-black/[0.18]"
                />
                <div className="absolute inset-x-5 bottom-6 sm:inset-x-12 sm:bottom-12">
                  <p className="micro-label">AI imagery · Creative direction</p>
                  <p className="mt-4 max-w-4xl text-[clamp(2.15rem,10.2vw,3.2rem)] font-normal leading-[1.02] tracking-[-0.035em] text-black/[0.86] sm:mt-6 sm:text-[clamp(2.9rem,5.3vw,6.2rem)] sm:leading-[0.98] sm:tracking-[-0.045em]">
                    Imágenes generadas con una idea clara, una estética definida y una dirección consistente.
                  </p>
                </div>
              </motion.div>
            </Reveal>

            <Reveal delay={0.16} className="flex h-full flex-col justify-between bg-white/[0.045] p-5 sm:p-10 lg:p-12">
              <div>
                <p className="micro-label">Project note</p>
                <p className="mt-5 text-[0.98rem] leading-7 text-black/[0.64] sm:mt-7 sm:text-lg sm:leading-8">
                  Proyecto visual en Instagram donde trabajo dirección creativa,
                  estética editorial e imágenes generadas con IA. La diferencia
                  está en el criterio: no es solo producir, es decidir cómo debe
                  verse, sentirse y comunicarse.
                </p>
              </div>
              <div className="mt-12 border-t border-black/[0.16] pt-6 sm:mt-16 sm:pt-7">
                <p className="micro-label">Role</p>
                <p className="mt-4 text-2xl font-normal leading-tight tracking-[-0.035em] text-black/[0.84] sm:text-3xl sm:tracking-[-0.045em]">
                  Founder · Creative Director · AI Artist
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-20 sm:px-9 sm:py-28 lg:px-[5vw] lg:py-40">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid gap-12 sm:gap-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            <Reveal>
              <SectionIndex>03</SectionIndex>
              <p className="micro-label mt-5 sm:mt-7">Capabilities</p>
              <h2 className="outline-display mt-5 max-w-4xl text-[clamp(3.45rem,16vw,5rem)] font-light sm:mt-7 sm:text-[clamp(4.7rem,8.5vw,10rem)]">
                Del concepto al sistema.
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 border-l border-t border-black/[0.16]">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.16 }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.045, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={reducedMotion ? undefined : { backgroundColor: "rgba(255,255,255,0.18)" }}
                  className="group min-h-32 border-b border-r border-black/[0.16] bg-white/[0.025] p-4 sm:min-h-36 sm:p-7"
                >
                  <div className="flex h-full flex-col justify-between gap-6 sm:gap-8">
                    <span className="text-[1.02rem] font-normal leading-snug tracking-[-0.015em] text-black/[0.8] sm:text-2xl sm:tracking-[-0.02em]">
                      {capability}
                    </span>
                    <span className="micro-label self-end text-black/[0.34]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="section-shell scroll-mt-20 px-4 py-20 sm:scroll-mt-28 sm:px-9 sm:py-28 lg:px-[5vw] lg:py-44"
      >
        <div className="mx-auto max-w-[1640px]">
          <Reveal>
            <SectionIndex>04</SectionIndex>
            <p className="micro-label mt-5 sm:mt-7">Available for selected projects</p>
            <h2 className="outline-display mt-7 max-w-[1540px] text-balance text-[clamp(3.35rem,15.2vw,4.8rem)] font-light sm:mt-10 sm:text-[clamp(5rem,10.8vw,12.8rem)]">
              Hagamos algo que se vea tan bien como funciona.
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="mt-12 grid border border-black/[0.18] sm:mt-20 lg:grid-cols-[1fr_auto]">
            <div className="p-5 sm:p-10 lg:p-12">
              <p className="text-[1.75rem] font-normal leading-tight tracking-[-0.025em] text-black/[0.88] sm:text-4xl sm:tracking-[-0.032em]">
                Pedro Cánovas
              </p>
              <p className="mt-4 max-w-4xl text-[0.98rem] leading-7 text-black/[0.66] sm:mt-5 sm:text-xl sm:leading-9">
                Diseño web, FiveM, inteligencia artificial y dirección creativa.
                Si necesitas una pieza digital con identidad, sistema y ejecución,
                podemos hablar.
              </p>
            </div>

            <div className="grid border-t border-black/[0.18] min-[500px]:grid-cols-2 lg:min-w-[430px] lg:border-l lg:border-t-0">
              <a
                href="https://www.instagram.com/pedrocanvass/"
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-24 items-center justify-between border-b border-black/[0.18] px-5 text-xs font-medium uppercase tracking-[0.12em] text-black/[0.74] transition-colors hover:bg-black hover:text-canvas min-[500px]:border-b-0 min-[500px]:border-r sm:min-h-36 sm:px-7 sm:text-base sm:tracking-[0.15em] lg:border-b lg:border-r-0"
              >
                @pedrocanvass
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
              <a
                href="https://www.instagram.com/itinocontext/"
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-24 items-center justify-between px-5 text-xs font-medium uppercase tracking-[0.12em] text-black/[0.74] transition-colors hover:bg-black hover:text-canvas sm:min-h-36 sm:px-7 sm:text-base sm:tracking-[0.15em]"
              >
                @itinocontext
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="safe-footer border-t border-black/[0.18] px-4 py-9 sm:px-9 sm:py-14 lg:px-[5vw]">
        <div className="mx-auto flex max-w-[1640px] flex-col gap-3 text-[0.78rem] font-medium uppercase leading-5 tracking-[0.1em] text-black/[0.64] sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:text-[clamp(0.86rem,0.8vw,1rem)] sm:leading-6 sm:tracking-[0.14em]">
          <p>© 2026 Pedro Cánovas</p>
          <p>Human vision · Machine precision</p>
        </div>
      </footer>
    </div>
  );
}
