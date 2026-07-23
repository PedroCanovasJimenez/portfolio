# V6 — Adaptación completa para teléfonos

## Hero y vídeo

- El recorrido usa `svh` para evitar saltos por la barra del navegador móvil.
- El vídeo se amplía y centra en pantallas verticales para que la cabeza no aparezca pequeña.
- El scrubbing sigue avanzando y retrocediendo con el scroll.
- Se añadieron degradados móviles para mantener los textos legibles sobre el vídeo.
- En teléfonos bajos se oculta la nota secundaria para evitar solapamientos.

## Navegación

- Cabecera compacta específica para móvil.
- Nombre abreviado en teléfonos y nombre completo desde tablet/escritorio.
- Navegación visible en móvil: Skills, Work y Contact.
- Áreas táctiles mínimas de 44 px.
- Compatibilidad con zonas seguras de iPhone mediante `safe-area-inset-*`.

## Tipografía y layout

- Titulares con tamaños propios para móvil, sin desbordarse horizontalmente.
- Interlineado y tracking reajustados.
- `itinocontext` puede partirse de forma segura en pantallas muy estrechas.
- Menos márgenes verticales en móvil para evitar espacios excesivos.
- Textos secundarios más legibles y sin tamaños diminutos.

## Secciones

- Expertise adaptado a una columna.
- Capabilities usa una retícula de dos columnas en móvil.
- Proyecto destacado con composición y alturas específicas para teléfono.
- Botones y enlaces ocupan el ancho disponible cuando mejora la usabilidad.
- Contacto y footer adaptados a 320 px de ancho.

## Archivos modificados

- `components/HeadScrollExperience.tsx`
- `components/PortfolioContent.tsx`
- `app/globals.css`
- `app/layout.tsx`
