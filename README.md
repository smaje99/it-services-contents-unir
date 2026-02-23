# Plantilla de Contenidos Educativos Complementarios (UNIR)

Plantilla web construida con [Astro](https://astro.build/) para que docentes creen y publiquen contenidos complementarios de una asignatura (temas, recursos, actividades, autoevaluaciones y casos de estudio) de forma organizada y reutilizable.

El objetivo es facilitar la creación de material de apoyo para estudiantes, con una estructura clara y un despliegue sencillo en web (GitHub Pages o Vercel). La plantilla incluye componentes predefinidos para organizar conceptos, recursos y actividades por tema, así como un sistema de navegación y progreso.

Invito a la comunidad docente a usar esta plantilla como base para sus cursos, adaptándola a sus necesidades y enriqueciendo el ecosistema de recursos educativos complementarios.

## Objetivo de esta plantilla

Esta plantilla permite:

- Publicar material de apoyo por temas semanales.
- Organizar recursos, actividades y casos en una interfaz clara para estudiantes.
- Reutilizar una estructura base y enfocarse en el contenido académico.
- Desplegar fácilmente en web para acceso inmediato (GitHub Pages o Vercel).

## Inicio Rápido

### 1. Requisitos

- Node.js 20 LTS (recomendado).
- `pnpm` instalado globalmente.

### 2. Instalación

```bash
pnpm run install
```

### 3. Desarrollo local

```bash
pnpm run dev
```

La aplicación quedará disponible en `http://localhost:4321`.

### 4. Build de producción

```bash
pnpm run build
pnpm run preview
```

## Estructura del proyecto

```text
src/
  content/
    topics/           # Temas del curso en MDX (uno por tema)
    supplements/      # Tarjetas/modales de contenido complementario
    config.ts         # Registro de colecciones y esquemas
  data/
    weeks.json              # Calendario del curso
    resources.json          # Recursos por tema
    case-studies.json       # Casos por tema
    self-assessments.json   # Autoevaluaciones por tema
  pages/
    index.astro       # Página principal
    temas/            # Listado y detalle de temas
    progreso/         # Vista de progreso
  components/         # Componentes visuales reutilizables
```

## Personalización paso a paso

### 1. Modificar información general del curso

- Página de inicio: `src/pages/index.astro`
- Encabezado principal: `src/components/Header.astro`
- Información de curso (nombre/programa/duración): `src/pages/index.astro`

### 2. Editar o crear temas nuevos

Los temas viven en `src/content/topics/*.mdx`.

Ejemplo mínimo de un nuevo tema:

```mdx
---
title: 'Tema X: Título del tema'
description: 'Descripción breve del tema'
order: 10
icon: 'book-2'
color: '#2563EB'
publishAt: '2026-03-01 08:00:00'
---

## Objetivo del tema
Contenido en Markdown/MDX.
```

### 3. Crear contenidos complementarios (tarjetas/modales)

Los complementos viven en `src/content/supplements/*.mdx` y se muestran en la home.

Ejemplo:

```mdx
---
order: 4
title: 'Guía de Estudio'
description: 'Resumen ejecutivo y ruta de repaso.'
icon: 'bulb'
iconBg: '#0EA5E9'
triggerId: 'study-guide'
badges:
  - label: 'Nuevo'
    variant: 'success'
    icon: 'star-filled'
---

## ¿Qué incluye?
- Resumen de conceptos
- Checklist de repaso
- Actividad de cierre
```

### 4. Personalizar por tipo de contenido educativo

Ejemplos recomendados para docentes:

1. `Guía de estudio`
   Use un archivo en `src/content/supplements/guia-estudio.mdx` con objetivos, checklist y tiempos estimados.
2. `Estudio de caso`
   Agregue casos en `src/data/case-studies.json` y vincúlelos al tema (`topic1`, `topic2`, etc.).
3. `Actividad práctica`
   Incluya instrucciones en el archivo MDX del tema (por ejemplo, sección "Actividades de Refuerzo").
4. `Recursos externos`
   Mantenga enlaces por tema en `src/data/resources.json`.
5. `Autoevaluación`
   Configure preguntas por tema en `src/data/self-assessments.json`.

### 5. Agregar nuevos archivos y ordenar contenido

Para ampliar el curso:

1. Cree el nuevo archivo MDX en `src/content/topics/` o `src/content/supplements/`.
2. Defina metadatos válidos según los esquemas (`src/types/topic.ts` y `src/types/supplement.ts`).
3. Mantenga el orden con el campo `order`.
4. Actualice datasets JSON en `src/data/` cuando aplique.
5. Ejecute `pnpm run build` para validar que todo compile.

## Componentes necesarios para crear contenidos

Para construir contenidos en `src/content/topics/*.mdx`, estos son los componentes
principales y su propósito:

1. `TopicSectionGroup`
   Agrupa una sección grande del tema (ej.: conceptos, práctica, recursos).
2. `TopicConceptSection`
   Crea subsecciones dentro de un bloque y permite estructurar objetivos o actividades.
3. `TopicGrid`
   Distribuye tarjetas en cuadrícula para mejorar legibilidad.
4. `TopicConceptCard`
   Tarjeta para definiciones, instrucciones, ejemplos o conclusiones.
5. `AccordionRoot`
   Contenedor de acordeón para contenido extenso.
6. `TopicAccordionTrigger`
   Encabezado interactivo de cada ítem del acordeón.
7. `TopicCaseStudies`
   Carga casos asociados al tema desde `src/data/case-studies.json`.
8. `TopicResourceSection`
   Muestra enlaces y material de apoyo de `src/data/resources.json`.
9. `TopicSelfAssessmentTrigger`
   Activa la autoevaluación definida en `src/data/self-assessments.json`.

### Import mínimo sugerido en un tema MDX

```mdx
import TopicSectionGroup from '@/components/topic/TopicSectionGroup.astro';
import TopicConceptSection from '@/components/topic/TopicConceptSection.astro';
import TopicGrid from '@/components/topic/TopicGrid.astro';
import TopicConceptCard from '@/components/topic/TopicConceptCard.astro';
```

### Ejemplo mínimo de composición

```mdx
<TopicSectionGroup title='Conceptos Clave' icon='bulb'>
  <TopicConceptSection title='Bases del tema'>
    <TopicGrid>
      <TopicConceptCard title='Concepto A'>
        Definición y contexto práctico.
      </TopicConceptCard>
      <TopicConceptCard title='Concepto B'>
        Relación con la unidad y ejemplo aplicado.
      </TopicConceptCard>
    </TopicGrid>
  </TopicConceptSection>
</TopicSectionGroup>
```

### Ubicación de los componentes

- Componentes de tema: `src/components/topic/`
- Componentes UI base: `src/components/ui/`
- Componentes de autoevaluación: `src/components/self-assessment/`

## Despliegue recomendado: GitHub Pages

GitHub Pages es recomendable para publicar contenido estático y facilitar acceso a estudiantes.

### Pasos básicos

1. Suba el proyecto a un repositorio en GitHub.
2. Configure `site` y `base` en `astro.config.mjs` (ver siguiente bloque).
3. Ejecute `pnpm run build` para generar `dist/`.
4. En GitHub, publique `dist/` usando GitHub Actions (recomendado) o su flujo de Pages habitual.
5. Verifique que el sitio cargue bajo la URL final del repositorio.

### Ajustes necesarios antes de desplegar

Si su repositorio se publica en una subruta (por ejemplo `https://usuario.github.io/mi-repo/`), configure:

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://usuario.github.io',
  base: '/mi-repo/',
});
```

### Ajustes de router/navegación (importante)

Este proyecto usa rutas absolutas (`/`, `/temas`, `/progreso`) en:

- `src/components/NavTabs.astro`
- `src/components/Header.astro`
- `src/pages/404.astro`

Para GitHub Pages, conviene construir rutas con `import.meta.env.BASE_URL`:

```astro
---
const base = import.meta.env.BASE_URL;
const tabs = [
  { label: 'Inicio', href: base },
  { label: 'Temas', href: `${base}temas` },
  { label: 'Progreso', href: `${base}progreso` },
];
---
```

Con esto, la navegación funciona correctamente tanto en local como en GitHub Pages.

## Alternativa recomendada: Vercel

Vercel es una opción rápida y sencilla para desplegar esta plantilla.

### Pasos básicos

1. Suba su proyecto a un repositorio en GitHub.
2. En [Vercel](https://vercel.com), seleccione `Add New Project`.
3. Importe el repositorio y deje la configuración por defecto para Astro.
4. Deploy.
5. Cada `push` a su rama principal activará un nuevo despliegue automático.

## Repositorio de ejemplo

Implementación de referencia de esta plantilla:

- https://github.com/smaje99/it-services-contents-unir

## FAQ

### 1) ¿Necesito saber Astro para usar la plantilla?
No en profundidad. Para comenzar, basta con editar contenido en archivos `MDX` y `JSON`.

### 2) ¿Cómo agrego un tema nuevo?
Cree un archivo en `src/content/topics/` con frontmatter válido (`title`, `description`, `order`, etc.).

### 3) ¿Cómo cambio el orden de los temas o complementos?
Modifique la propiedad `order` en cada archivo MDX.

### 4) ¿Dónde actualizo fechas/semanas del curso?
En `src/data/weeks.json`.

### 5) ¿Qué hago si en GitHub Pages se rompen enlaces?
Revise `site`, `base` en `astro.config.mjs` y cambie enlaces absolutos por rutas basadas en `import.meta.env.BASE_URL`.

### 6) ¿Qué plataforma de despliegue debería usar?
Si busca integración simple con repositorio académico, GitHub Pages. Si prioriza rapidez y cero fricción, Vercel.

## Licencia

Este proyecto incluye licencia `GPLv3` (ver `LICENSE`).


