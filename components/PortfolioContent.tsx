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
      initial={reducedMotion ? false : { opacity: 0, y: 46, filter: "blur(10px)" }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
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
      <section id="expertise" className="section-shell px-5 py-28 sm:px-9 lg:px-[5vw] lg:py-40">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid gap-20 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
            <Reveal className="lg:sticky lg:top-24 lg:h-fit">
              <div className="relative border-l border-black/[0.18] pl-6 sm:pl-9">
                <span className="corner-mark -left-px -top-px" />
                <SectionIndex>01</SectionIndex>
                <p className="micro-label mt-7">Expertise</p>
                <h2 className="outline-display mt-7 max-w-3xl text-[clamp(4.6rem,8.7vw,10rem)] font-light">
                  Diseño.
                  <br />
                  Ingeniería.
                  <br />
                  Dirección.
                </h2>
                <p className="mt-8 max-w-md text-base leading-8 text-black/[0.58] sm:text-lg">
                  Trabajo en la intersección entre estética, estructura y ejecución.
                  El objetivo no es solo que algo se vea bien, sino que tenga sistema.
                </p>
              </div>
            </Reveal>

            <div className="border-t border-black/[0.16]">
              {expertise.map((item, index) => (
                <motion.article
                  key={item.number}
                  initial={reducedMotion ? false : { opacity: 0, x: 70 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={reducedMotion ? undefined : { x: 8 }}
                  className="group relative border-b border-black/[0.16] bg-white/[0.035] px-0 py-9 transition-colors duration-500 hover:bg-white/[0.13] sm:py-11"
                >
                  <div className="grid gap-6 px-5 sm:grid-cols-[68px_1fr_auto] sm:items-start sm:px-8">
                    <span className="micro-label pt-2 text-black/[0.38]">{item.number}</span>
                    <div>
                      <h3 className="text-[clamp(2.5rem,4.25vw,5.1rem)] font-normal leading-[1.04] tracking-[-0.032em] text-black/[0.88]">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-3xl text-sm leading-7 text-black/[0.56] sm:text-base sm:leading-8">
                        {item.description}
                      </p>
                      <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="border-l border-black/[0.2] pl-3 text-[12px] font-medium uppercase leading-5 tracking-[0.14em] text-black/[0.56] sm:text-[13px]"
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

      <section id="work" className="section-shell px-5 py-28 sm:px-9 lg:px-[5vw] lg:py-40">
        <div className="mx-auto max-w-[1640px]">
          <Reveal>
            <div className="flex flex-col gap-10 border-b border-black/[0.18] pb-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionIndex>02</SectionIndex>
                <p className="micro-label mt-7">Selected project</p>
                <h2 className="outline-display mt-7 text-[clamp(5rem,9.4vw,11rem)] font-light">
                  itinocontext
                </h2>
              </div>
              <a
                href="https://www.instagram.com/itinocontext/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-6 border border-black/[0.24] bg-white/[0.09] px-7 py-5 text-sm font-medium uppercase tracking-[0.16em] text-black/[0.7] transition duration-300 hover:bg-black hover:text-canvas"
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
                className="animated-grid relative min-h-[520px] overflow-hidden border-b border-black/[0.16] bg-white/[0.04] lg:min-h-[720px] lg:border-b-0 lg:border-r"
              >
                <motion.div
                  aria-hidden="true"
                  initial={reducedMotion ? false : { scale: 0.78, rotate: -8, opacity: 0 }}
                  whileInView={reducedMotion ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[10%] top-[12%] h-[48%] w-[48%] border border-black/[0.17] bg-white/[0.08]"
                />
                <motion.div
                  aria-hidden="true"
                  animate={reducedMotion ? undefined : { y: [0, -18, 0], rotate: [0, 1.8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-[10%] top-[22%] h-[42%] w-[38%] border border-black/[0.22] bg-[linear-gradient(145deg,rgba(255,255,255,0.28),rgba(255,255,255,0.02))] shadow-[0_35px_85px_rgba(16,17,18,0.08)]"
                />
                <motion.div
                  aria-hidden="true"
                  animate={reducedMotion ? undefined : { x: ["-12%", "115%"] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 w-px bg-black/[0.18]"
                />
                <div className="absolute inset-x-7 bottom-8 sm:inset-x-12 sm:bottom-12">
                  <p className="micro-label">AI imagery · Creative direction</p>
                  <p className="mt-6 max-w-4xl text-[clamp(2.9rem,5.3vw,6.2rem)] font-normal leading-[0.98] tracking-[-0.045em] text-black/[0.84]">
                    Imágenes generadas con una idea clara, una estética definida y una dirección consistente.
                  </p>
                </div>
              </motion.div>
            </Reveal>

            <Reveal delay={0.16} className="flex h-full flex-col justify-between bg-white/[0.045] p-7 sm:p-10 lg:p-12">
              <div>
                <p className="micro-label">Project note</p>
                <p className="mt-7 text-base leading-8 text-black/[0.58] sm:text-lg">
                  Proyecto visual en Instagram donde trabajo dirección creativa,
                  estética editorial e imágenes generadas con IA. La diferencia
                  está en el criterio: no es solo producir, es decidir cómo debe
                  verse, sentirse y comunicarse.
                </p>
              </div>
              <div className="mt-16 border-t border-black/[0.16] pt-7">
                <p className="micro-label">Role</p>
                <p className="mt-4 text-2xl font-normal leading-tight tracking-[-0.045em] text-black/[0.82] sm:text-3xl">
                  Founder · Creative Director · AI Artist
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell px-5 py-28 sm:px-9 lg:px-[5vw] lg:py-40">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid gap-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            <Reveal>
              <SectionIndex>03</SectionIndex>
              <p className="micro-label mt-7">Capabilities</p>
              <h2 className="outline-display mt-7 max-w-4xl text-[clamp(4.7rem,8.5vw,10rem)] font-light">
                Del concepto al sistema.
              </h2>
            </Reveal>

            <div className="grid border-l border-t border-black/[0.16] sm:grid-cols-2">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: (index % 4) * 0.055, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={reducedMotion ? undefined : { backgroundColor: "rgba(255,255,255,0.18)" }}
                  className="group min-h-28 border-b border-r border-black/[0.16] bg-white/[0.025] p-5 sm:min-h-36 sm:p-7"
                >
                  <div className="flex h-full flex-col justify-between gap-8">
                    <span className="text-xl font-normal leading-snug tracking-[-0.02em] text-black/[0.76] sm:text-2xl">
                      {capability}
                    </span>
                    <span className="micro-label self-end text-black/[0.3]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell px-5 py-28 sm:px-9 lg:px-[5vw] lg:py-44">
        <div className="mx-auto max-w-[1640px]">
          <Reveal>
            <SectionIndex>04</SectionIndex>
            <p className="micro-label mt-7">Available for selected projects</p>
            <h2 className="outline-display mt-10 max-w-[1540px] text-balance text-[clamp(5rem,10.8vw,12.8rem)] font-light">
              Hagamos algo que se vea tan bien como funciona.
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="mt-20 grid border border-black/[0.18] lg:grid-cols-[1fr_auto]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-3xl font-normal tracking-[-0.032em] text-black/[0.86] sm:text-4xl">
                Pedro Cánovas Jiménez
              </p>
              <p className="mt-5 max-w-4xl text-lg leading-8 text-black/[0.62] sm:text-xl sm:leading-9">
                Diseño web, FiveM, inteligencia artificial y dirección creativa.
                Si necesitas una pieza digital con identidad, sistema y ejecución,
                podemos hablar.
              </p>
            </div>

            <div className="grid border-t border-black/[0.18] sm:grid-cols-2 lg:min-w-[430px] lg:border-l lg:border-t-0">
              <a
                href="https://www.instagram.com/pedrocanvass/"
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-36 items-center justify-between border-b border-black/[0.18] px-7 text-sm font-medium uppercase tracking-[0.15em] text-black/[0.7] transition-colors hover:bg-black hover:text-canvas sm:text-base sm:border-b-0 sm:border-r lg:border-b lg:border-r-0"
              >
                @pedrocanvass
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
              <a
                href="https://www.instagram.com/itinocontext/"
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-36 items-center justify-between px-7 text-sm font-medium uppercase tracking-[0.15em] text-black/[0.7] transition-colors hover:bg-black hover:text-canvas sm:text-base"
              >
                @itinocontext
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-black/[0.18] px-5 py-12 sm:px-9 sm:py-14 lg:px-[5vw]">
        <div className="mx-auto flex max-w-[1640px] flex-col gap-6 text-[clamp(0.86rem,0.8vw,1rem)] font-medium uppercase leading-6 tracking-[0.14em] text-black/[0.58] sm:flex-row sm:items-center sm:justify-between sm:gap-12">
          <p>© 2026 Pedro Cánovas Jiménez</p>
          <p>Human vision · Machine precision</p>
        </div>
      </footer>
    </div>
  );
}
