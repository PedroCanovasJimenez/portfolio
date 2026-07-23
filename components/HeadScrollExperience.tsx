"use client";

import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const VIDEO_PATH = "/media/head-transform-scroll.mp4";

type CopyBlockProps = {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  position: "left" | "center" | "right";
  eyebrow: string;
  title: ReactNode;
  body?: string;
};

function CopyBlock({
  progress,
  range,
  position,
  eyebrow,
  title,
  body,
}: CopyBlockProps) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [38, 0, 0, -32]);
  const blur = useTransform(progress, range, [12, 0, 0, 8]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  const positions = {
    left: "left-5 right-5 items-start text-left sm:left-10 sm:right-auto sm:w-[min(88vw,920px)] lg:left-[6vw]",
    center:
      "left-5 right-5 items-center text-center sm:left-1/2 sm:right-auto sm:w-[min(92vw,1380px)] sm:-translate-x-1/2",
    right:
      "left-5 right-5 items-end text-right sm:left-auto sm:right-10 sm:w-[min(88vw,920px)] lg:right-[6vw]",
  };

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, y, filter }}
      className={`pointer-events-none absolute top-1/2 z-30 flex -translate-y-1/2 flex-col ${positions[position]}`}
    >
      <p className="micro-label mb-8 border-l border-black/[0.3] pl-5 text-black/[0.58]">
        {eyebrow}
      </p>
      <h2 className="outline-display max-w-[1240px] text-[clamp(4.35rem,8.8vw,10.6rem)] font-light">
        {title}
      </h2>
      {body ? (
        <p className="mt-10 max-w-2xl border-l border-black/[0.22] bg-white/[0.055] py-3 pl-6 text-pretty text-lg leading-8 text-black/[0.64] sm:text-xl sm:leading-9">
          {body}
        </p>
      ) : null}
    </motion.div>
  );
}

function Loader({ progress, error }: { progress: number; error: string | null }) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-canvas px-6">
      <div className="glass-panel w-full max-w-sm px-8 py-10 text-center">
        <div className="mx-auto grid size-16 place-items-center border border-black/[0.16] bg-white/[0.15]">
          {error ? (
            <span className="text-xl text-red-700">!</span>
          ) : (
            <div className="size-7 animate-spin border-2 border-black/[0.15] border-t-black" />
          )}
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-black/[0.48]">
          {error ? "Error al cargar" : "Booting experience"}
        </p>
        {error ? (
          <>
            <p className="mt-3 text-sm leading-6 text-black/[0.55]">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 border border-black/[0.24] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em]"
            >
              Reintentar
            </button>
          </>
        ) : (
          <>
            <p className="mt-3 text-5xl font-semibold tracking-[-0.08em] text-black">
              {progress}%
            </p>
            <div className="mt-5 h-px overflow-hidden bg-black/[0.15]">
              <div
                className="h-full bg-black transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function HeadScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(10);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [loadPercent, setLoadPercent] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 32,
    mass: 0.22,
    restDelta: 0.0004,
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const haloOpacity = useTransform(scrollYProgress, [0.22, 0.58, 1], [0, 0.14, 0.24]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.09, 0.17], [1, 1, 0]);

  const scheduleSeek = useCallback((progress: number) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    targetTimeRef.current = clampedProgress * durationRef.current;

    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      const video = videoRef.current;
      rafRef.current = null;
      if (!video || !Number.isFinite(video.duration)) return;

      const maxTime = Math.max(0, video.duration - 1 / 60);
      const nextTime = Math.min(targetTimeRef.current, maxTime);

      if (Math.abs(video.currentTime - nextTime) > 1 / 120) {
        video.currentTime = nextTime;
      }
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function preloadVideo() {
      try {
        const response = await fetch(VIDEO_PATH, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`No se pudo cargar el vídeo (${response.status})`);
        }

        const totalBytes = Number(response.headers.get("content-length")) || 0;
        const reader = response.body?.getReader();

        if (!reader) {
          const blob = await response.blob();
          if (cancelled) return;
          const url = URL.createObjectURL(blob);
          objectUrlRef.current = url;
          setLoadPercent(100);
          setVideoUrl(url);
          return;
        }

        const chunks: ArrayBuffer[] = [];
        let receivedBytes = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (!value) continue;

          const chunk = value.slice().buffer as ArrayBuffer;
          chunks.push(chunk);
          receivedBytes += value.byteLength;

          if (totalBytes > 0) {
            setLoadPercent(Math.min(99, Math.round((receivedBytes / totalBytes) * 100)));
          }
        }

        if (cancelled) return;

        const blob = new Blob(chunks, { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;
        setLoadPercent(100);
        setVideoUrl(url);
      } catch (reason) {
        if (cancelled || (reason instanceof DOMException && reason.name === "AbortError")) {
          return;
        }
        setError(reason instanceof Error ? reason.message : "Error desconocido");
      }
    }

    preloadVideo();

    return () => {
      cancelled = true;
      controller.abort();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = ready ? previous : "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [ready]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!ready || reducedMotion) return;
    scheduleSeek(latest);
  });

  useEffect(() => {
    if (ready && reducedMotion) scheduleSeek(1);
  }, [ready, reducedMotion, scheduleSeek]);

  return (
    <>
      {!ready ? <Loader progress={loadPercent} error={error} /> : null}

      <section ref={sectionRef} id="home" className="relative h-[540vh] bg-canvas">
        <div className="sticky top-0 h-screen overflow-hidden bg-canvas">
          <video
            ref={videoRef}
            src={videoUrl ?? undefined}
            preload="auto"
            muted
            playsInline
            aria-label="Animación de Pedro Cánovas transformándose en una cabeza robótica"
            onLoadedMetadata={(event) => {
              durationRef.current = event.currentTarget.duration || 10;
              event.currentTarget.currentTime = 0;
            }}
            onLoadedData={(event) => {
              durationRef.current = event.currentTarget.duration || 10;
              event.currentTarget.pause();
              event.currentTarget.currentTime = 0;
              setReady(true);
            }}
            onError={() => setError("El navegador no pudo decodificar el vídeo")}
            className={`pointer-events-none absolute inset-0 size-full bg-canvas object-contain transition-opacity duration-700 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />

          <motion.div
            aria-hidden="true"
            style={{ opacity: haloOpacity }}
            className="hero-halo pointer-events-none absolute inset-0 z-10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(195,189,185,0.82),transparent_24%,transparent_76%,rgba(195,189,185,0.72))]"
          />

          <header className="absolute inset-x-0 top-0 z-50 flex min-h-[118px] items-stretch justify-between border-b border-black/[0.16] bg-[rgba(195,189,185,0.24)] px-5 backdrop-blur-md sm:min-h-[124px] sm:px-9 lg:px-[5vw]">
            <a
              href="#home"
              className="outline-display-soft flex items-center text-[clamp(1.5rem,1.7vw,2.05rem)] font-normal tracking-[-0.018em] transition-opacity hover:opacity-[0.72]"
            >
              Pedro Cánovas Jiménez
            </a>
            <nav className="hidden items-stretch outline-small border-l border-black/[0.16] text-[clamp(0.88rem,0.82vw,1.02rem)] font-medium uppercase tracking-[0.16em] text-black/[0.62] sm:flex">
              <a href="#expertise" className="flex items-center border-r border-black/[0.16] px-9 transition-colors hover:bg-black hover:text-canvas lg:px-12">
                Expertise
              </a>
              <a href="#work" className="flex items-center border-r border-black/[0.16] px-9 transition-colors hover:bg-black hover:text-canvas lg:px-12">
                Work
              </a>
              <a href="#contact" className="flex items-center border-r border-black/[0.16] px-9 transition-colors hover:bg-black hover:text-canvas lg:px-12">
                Contact
              </a>
            </nav>
          </header>

          <motion.div
            aria-hidden="true"
            style={{ width: progressWidth }}
            className="absolute left-0 top-0 z-[60] h-[2px] origin-left bg-black"
          />

          <motion.div
            style={{ opacity: introOpacity }}
            className="pointer-events-none absolute inset-x-5 bottom-6 z-40 sm:inset-x-9 lg:inset-x-[5vw]"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="micro-label border-l border-black/[0.28] pl-4">
                  Creative developer · AI direction · FiveM systems
                </p>
                <h1 className="outline-display mt-7 max-w-6xl text-[clamp(4.8rem,9.8vw,11.6rem)] font-light">
                  Pedro
                  <br />
                  Cánovas
                  <br />
                  Jiménez
                </h1>
              </div>

              <div className="glass-panel w-full max-w-md px-6 py-5">
                <p className="micro-label">
                  System note
                </p>
                <p className="mt-3 text-base leading-7 text-black/[0.64] sm:text-lg sm:leading-8">
                  Experiencias digitales con mentalidad de producto, ejecución visual limpia
                  y una obsesión real por el detalle.
                </p>
              </div>
            </div>
          </motion.div>

          <CopyBlock
            progress={scrollYProgress}
            range={[0.08, 0.15, 0.26, 0.32]}
            position="left"
            eyebrow="01 · Web experiences"
            title={<>Interfaces<br />grandes,<br />limpias y<br />precisas.</>}
            body="Diseño y desarrollo de webs con una estética premium, movimiento sutil y una ejecución muy cuidada."
          />

          <CopyBlock
            progress={scrollYProgress}
            range={[0.3, 0.38, 0.5, 0.57]}
            position="right"
            eyebrow="02 · FiveM systems"
            title={<>Sistemas sólidos<br />para servidores<br />serios.</>}
            body="UI, lógica, scripts y herramientas para FiveM y QB-Core, pensados para funcionar bien y verse mejor."
          />

          <CopyBlock
            progress={scrollYProgress}
            range={[0.55, 0.63, 0.76, 0.83]}
            position="left"
            eyebrow="03 · Artificial intelligence"
            title={<>IA con criterio<br />visual y<br />dirección.</>}
            body="No solo genero imágenes y vídeos: construyo procesos, estilos y resultados coherentes para marcas y proyectos."
          />

          <CopyBlock
            progress={scrollYProgress}
            range={[0.81, 0.88, 0.97, 1]}
            position="center"
            eyebrow="Human vision · Machine precision"
            title={<>Diseño, código e IA<br />en un mismo sistema.</>}
          />
        </div>
      </section>
    </>
  );
}
