# Pedro Cánovas Jiménez — Portfolio Video Scroll

Portfolio personal desarrollado con Next.js 14, Tailwind CSS y Framer Motion.

## Contenido

- Vídeo de 10 segundos controlado directamente por el scroll.
- Avance y retroceso precisos, sin reproducción automática.
- Fondo principal: `#C3BDB9`.
- Transformación visual de cabeza humana a cabeza robótica.
- Secciones de diseño web, desarrollo FiveM, inteligencia artificial y dirección creativa.
- Proyecto destacado: `@itinocontext`.
- Enlace personal: `@pedrocanvass`.
- Iniciador automático para Windows.

## Iniciar en Windows

Descomprime el ZIP y ejecuta:

```text
INICIAR_PORTFOLIO_PEDRO.bat
```

El iniciador instala las dependencias la primera vez, inicia Next.js y abre:

```text
http://localhost:3000
```

## Vídeo del hero

El archivo optimizado está en:

```text
public/media/head-transform-scroll.mp4
```

El componente que enlaza el scroll con el tiempo del vídeo es:

```text
components/HeadScrollExperience.tsx
```

El MP4 está recodificado sin audio y con todos sus fotogramas como keyframes. Esto permite avanzar y retroceder con el scroll con mucha más precisión que usando el MP4 original.

## Implementación anterior

La versión basada en 51 imágenes se conserva como referencia en:

```text
_backup/HeadScrollExperience.frames.tsx.txt
```

La carpeta de frames ya no es necesaria.

## Responsive móvil — V6

La web incluye una composición específica para teléfonos desde 320 px de ancho. El hero utiliza unidades `svh`, encuadre vertical del vídeo, navegación táctil, zonas seguras de iPhone y tamaños tipográficos independientes para móvil.
