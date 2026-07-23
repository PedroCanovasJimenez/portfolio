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

const VIDEO_FILENAME = "media/head-transform-scroll.mp4";

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
  const y = useTransform(progress, range, [28, 0, 0, -24]);
  const blur = useTransform(progress, range, [8, 0, 0, 6]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  const positions = {
    left:
      "left-4 right-4 items-start text-left sm:left-10 sm:right-auto sm:w-[min(88vw,920px)] lg:left-[6vw]",
    center:
      "left-4 right-4 items-center text-center sm:left-1/2 sm:right-auto sm:w-[min(92vw,1380px)] sm:-translate-x-1/2",
    right:
      "left-4 right-4 items-start text-left sm:left-auto sm:right-10 sm:w-[min(88vw,920px)] sm:items-end sm:text-right lg:right-[6vw]",
  };

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className={`copy-block pointer-events-none absolute top-[54%] z-30 flex -translate-y-1/2 flex-col sm:top-1/2 ${positions[position]}`}
    >
      <p className="micro-label mb-4 border-l border-black/[0.3] pl-4 text-black/[0.62] sm:mb-8 sm:pl-5">
        {eyebrow}
      </p>
      <h2 className="outline-display max-w-[1240px] text-[clamp(3rem,14.2vw,4.7rem)] font-light sm:text-[clamp(4.35rem,8.8vw,10.6rem)]">
        {title}
      </h2>
      {body ? (
        <p className="copy-body mt-5 max-w-[34rem] border-l border-black/[0.22] bg-[rgba(195,189,185,0.5)] py-2.5 pl-4 pr-2 text-pretty text-[0.94rem] leading-6 text-black/[0.7] backdrop-blur-[3px] sm:mt-10 sm:max-w-2xl sm:bg-white/[0.055] sm:py-3 sm:pl-6 sm:pr-0 sm:text-xl sm:leading-9 sm:backdrop-blur-none">
          {body}
        </p>
      ) : null}
    </motion.div>
  );
}

function Loader({ progress, error }: { progress: number; error: string | null }) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-canvas px-5">
      <div className="glass-panel w-full max-w-sm px-7 py-9 text-center sm:px-8 sm:py-10">
        <div className="mx-auto grid size-14 place-items-center border border-black/[0.16] bg-white/[0.15] sm:size-16">
          {error ? (
            <span className="text-xl text-red-700">!</span>
          ) : (
            <div className="size-7 animate-spin border-2 border-black/[0.15] border-t-black" />
          )}
        </div>
        <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-black/[0.5] sm:text-xs sm:tracking-[0.28em]">
          {error ? "Error al cargar" : "Booting experience"}
        </p>
        {error ? (
          <>
            <p className="mt-3 text-sm leading-6 text-black/[0.58]">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 min-h-11 border border-black/[0.24] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em]"
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
        const videoPath = new URL(VIDEO_FILENAME, document.baseURI).toString();
        const response = await fetch(videoPath, { signal: controller.signal });
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

      <section
        ref={sectionRef}
        id="home"
        className="relative h-[620svh] bg-canvas sm:h-[540vh]"
      >
        <div className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden bg-canvas sm:h-screen">
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
            className={`hero-video pointer-events-none absolute left-1/2 top-[47%] h-[68svh] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 bg-canvas object-contain object-center transition-opacity duration-700 sm:inset-0 sm:size-full sm:max-w-full sm:translate-x-0 sm:translate-y-0 ${
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
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(195,189,185,0.92)_0%,rgba(195,189,185,0.15)_20%,rgba(195,189,185,0.05)_57%,rgba(195,189,185,0.78)_100%)] sm:bg-[linear-gradient(90deg,rgba(195,189,185,0.82),transparent_24%,transparent_76%,rgba(195,189,185,0.72))]"
          />

          <header className="site-header absolute inset-x-0 top-0 z-50 flex min-h-[74px] items-stretch justify-between border-b border-black/[0.16] bg-[rgba(195,189,185,0.56)] px-3 backdrop-blur-md sm:min-h-[124px] sm:px-9 lg:px-[5vw]">
            <a
              href="#home"
              className="outline-display-soft flex min-w-0 items-center whitespace-nowrap text-[0.95rem] font-normal tracking-[-0.018em] transition-opacity hover:opacity-[0.72] sm:text-[clamp(1.5rem,1.7vw,2.05rem)]"
              aria-label="Volver al inicio"
            >
              <span className="sm:hidden">Pedro Cánovas</span>
              <span className="hidden sm:inline">Pedro Cánovas Jiménez</span>
            </a>
            <nav className="outline-small flex items-stretch border-l border-black/[0.16] text-[0.59rem] font-medium uppercase tracking-[0.1em] text-black/[0.68] sm:text-[clamp(0.88rem,0.82vw,1.02rem)] sm:tracking-[0.16em]">
              <a
                href="#expertise"
                className="flex min-w-12 items-center justify-center border-r border-black/[0.16] px-2.5 transition-colors hover:bg-black hover:text-canvas sm:px-9 lg:px-12"
              >
                <span className="sm:hidden">Skills</span>
                <span className="hidden sm:inline">Expertise</span>
              </a>
              <a
                href="#work"
                className="flex min-w-12 items-center justify-center border-r border-black/[0.16] px-2.5 transition-colors hover:bg-black hover:text-canvas sm:px-9 lg:px-12"
              >
                Work
              </a>
              <a
                href="#contact"
                className="flex min-w-12 items-center justify-center border-r border-black/[0.16] px-2.5 transition-colors hover:bg-black hover:text-canvas sm:px-9 lg:px-12"
              >
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
            className="hero-intro pointer-events-none absolute inset-x-4 z-40 sm:inset-x-9 lg:inset-x-[5vw]"
          >
            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="micro-label max-w-[18rem] border-l border-black/[0.28] pl-3 sm:max-w-none sm:pl-4">
                  Creative developer · AI direction · FiveM systems
                </p>
                <h1 className="outline-display mt-4 max-w-6xl text-[clamp(3.35rem,15.8vw,5rem)] font-light sm:mt-7 sm:text-[clamp(4.8rem,9.8vw,11.6rem)]">
                  Pedro
                  <br />
                  Cánovas
                  <br />
                  Jiménez
                </h1>
              </div>

              <div className="hero-note glass-panel w-full max-w-[19rem] px-4 py-3.5 sm:max-w-md sm:px-6 sm:py-5">
                <p className="micro-label">System note</p>
                <p className="mt-2 text-sm leading-6 text-black/[0.68] sm:mt-3 sm:text-lg sm:leading-8">
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
            title={
              <>
                Interfaces
                <br />
                grandes,
                <br />
                limpias y
                <br />
                precisas.
              </>
            }
            body="Diseño y desarrollo de webs con una estética premium, movimiento sutil y una ejecución muy cuidada."
          />

          <CopyBlock
            progress={scrollYProgress}
            range={[0.3, 0.38, 0.5, 0.57]}
            position="right"
            eyebrow="02 · FiveM systems"
            title={
              <>
                Sistemas sólidos
                <br />
                para servidores
                <br />
                serios.
              </>
            }
            body="UI, lógica, scripts y herramientas para FiveM y QB-Core, pensados para funcionar bien y verse mejor."
          />

          <CopyBlock
            progress={scrollYProgress}
            range={[0.55, 0.63, 0.76, 0.83]}
            position="left"
            eyebrow="03 · Artificial intelligence"
            title={
              <>
                IA con criterio
                <br />
                visual y
                <br />
                dirección.
              </>
            }
            body="No solo genero imágenes y vídeos: construyo procesos, estilos y resultados coherentes para marcas y proyectos."
          />

          <CopyBlock
            progress={scrollYProgress}
            range={[0.81, 0.88, 0.97, 1]}
            position="center"
            eyebrow="Human vision · Machine precision"
            title={
              <>
                Diseño, código e IA
                <br />
                en un mismo sistema.
              </>
            }
          />
        </div>
      </section>
    </>
  );
}
