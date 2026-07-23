# Animación controlada por scroll mediante vídeo

El hero ya no carga una secuencia de imágenes. Ahora descarga el archivo:

`public/media/head-transform-scroll.mp4`

El componente `components/HeadScrollExperience.tsx` vincula el progreso de scroll con `video.currentTime`, conservando la altura de 540vh, los textos, las transiciones y la barra de progreso originales.

El MP4 se ha recodificado sin audio y con todos sus fotogramas como keyframes para que avanzar y retroceder con el scroll sea preciso y no produzca saltos.

La implementación anterior se conserva como texto en:

`_backup/HeadScrollExperience.frames.tsx.txt`
