# Zinco / Yoda — Prototipo conceptual de Altas

Prototipo estático e interactivo para un case study de Product Manager. Simula una propuesta para reducir el trabajo manual de preparación que realiza un técnico laboral antes de poder continuar con un Alta.

## Hipótesis

> Si estructuramos y completamos el input antes de que el técnico tenga que reconstruirlo, reduciremos el Active Handling Time de una Alta y los follow-ups necesarios con el cliente.

## Qué simula

El journey completo de la demo es:

1. Un cliente solicita un Alta mediante un email desestructurado.
2. El técnico identifica manualmente la solicitud y envía un enlace de completitud.
3. El cliente completa únicamente los datos pendientes.
4. El trámite aparece actualizado en `Yoda / Trámites / Altas`.
5. El técnico abre el caso y ve que la información del cliente ya está completa.
6. El técnico confirma un conjunto mínimo de configuración técnica.
7. El expediente pasa a `Listo para tramitar`.
8. La demo termina antes de la tramitación oficial.

## Qué NO simula

Este proyecto **no implementa**:

- parsing real de email;
- API de WhatsApp;
- integración real con Yoda;
- base de datos;
- TGSS / SEPE;
- AFI / SILTRA;
- cálculo de nómina;
- recomendaciones regulatorias reales.

Los códigos y valores técnicos de la pantalla de preparación son **ejemplos de UX para el prototipo**, no recomendaciones normativas.

La integración entre el formulario y Yoda se trata como un **Wizard of Oz** para aislar primero la hipótesis de valor.

## Métricas propuestas

### Primaria

- **Active Handling Time por Alta**.

### Secundaria

- **Follow-ups con cliente hasta Ready**.

### Guardrails

- Accuracy.
- Time to Ready.
- Client completion rate.

### Decision threshold de ejemplo

- `≥20%` de reducción en Active Handling Time sin deteriorar accuracy ni Time to Ready.

## Archivos

```text
zinco-yoda-prototype/
├── index.html
├── styles.css
├── app.js
└── README.md
```

No hay build step ni dependencias externas.

## Ejecutar localmente

### Opción 1 — Abrir directamente

Abre `index.html` en un navegador moderno.

### Opción 2 — Servidor local

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Después abre:

```text
http://localhost:8000
```

## Publicar con GitHub Pages

1. Crea un repositorio nuevo en GitHub, por ejemplo `zinco-yoda-prototype`.
2. Sube los cuatro archivos del proyecto a la rama `main`.
3. Ve a `Settings` → `Pages`.
4. En **Build and deployment**, selecciona `Deploy from a branch`.
5. Selecciona `main` y `/ (root)`.
6. Guarda los cambios.
7. GitHub publicará la demo como una web estática.

El proyecto utiliza rutas relativas y no necesita variables de entorno, backend ni build step.

## Principio de diseño

> Lo que ya está resuelto debe desaparecer visualmente hacia el fondo. Lo que el técnico necesita hacer ahora debe destacar.

La pantalla de preparación intenta responder en segundos:

> **¿Qué me queda por hacer para poder tramitar esta Alta?**

## Contexto del case

El prototipo parte de la observación de que un técnico laboral puede recibir información por canales y formatos no estandarizados y tener que interpretar, pedir faltantes y revalidar datos antes de poder ejecutar el proceso laboral. La solución no intenta reemplazar el workflow existente de Trámites, sino reducir la fricción necesaria para alimentarlo correctamente.
