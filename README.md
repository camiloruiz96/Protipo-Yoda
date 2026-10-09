# Zinco / Yoda — Prototipo de Altas

Prototipo estático e interactivo para simular una posible mejora del workflow de **Altas** en Yoda.

## Qué simula

1. Una solicitud inicial que llega por email.
2. El técnico comparte un formulario estructurado de 3 pasos.
3. El cliente completa:
   - Datos personales (solo nombre y apellido obligatorios).
   - Condiciones de incorporación.
   - Documentación.
4. El formulario muestra un estado de completado.
5. Yoda muestra un backoffice con distintos estados de expedientes.
6. El técnico abre un trabajador, ve información faltante o confirma la configuración técnica.
7. El técnico puede cambiar manualmente el estado del expediente.
8. Una vez confirmada la configuración técnica, el expediente puede quedar **Expediente listo para enviar** y finalmente **Alta completada**.

## Estados simulados

- **Alta completada**
- **Expediente listo para enviar**
- **Falta información**
- **Requiere revisión**
- **Bloqueado**

## Ejecutarlo localmente

No requiere build ni dependencias.

1. Descarga la carpeta.
2. Abre `index.html` en un navegador moderno.

También puedes servirlo con cualquier servidor estático.

## GitHub Pages

1. Sube `index.html`, `styles.css` y `app.js` a la raíz del repositorio.
2. Ve a `Settings -> Pages`.
3. Selecciona `Deploy from a branch`.
4. Elige `main` y `/root`.

## Qué es simulado

- El parsing de email.
- El envío real del formulario.
- La creación/actualización real del Trámite en Yoda.
- Códigos regulatorios y sugerencias técnicas.
- TGSS / SEPE y cualquier submission oficial.

## Hipótesis

> Si estructuramos y completamos el input antes de que el técnico tenga que reconstruirlo, reduciremos el Active Handling Time de una Alta.

### Métricas propuestas

- **Primary:** Active Handling Time por Alta.
- **Secondary:** follow-ups con cliente hasta preparar el expediente.
- **Guardrails:** accuracy, time to ready y client completion rate.


## Paso de revisión técnica

El prototipo conserva el bloque **“Solo te queda confirmar”** como pieza central de la demo. Cuando el expediente del cliente está completo, el técnico confirma cinco campos técnicos sugeridos antes de que el caso pase a **Expediente listo para enviar**. En los casos con faltantes, se muestra una vista previa bloqueada de este siguiente paso para mantener claro el flujo.

## v2.2 — Confirmación técnica editable

En la pantalla **“Solo te queda confirmar”** el técnico puede escribir o corregir manualmente los códigos/valores técnicos (contrato, grupo de cotización, convenio, categoría y CCC) y confirmar cada campo de forma individual. Si modifica un campo ya confirmado, la confirmación se invalida y debe confirmarlo de nuevo. Además, puede avanzar esta configuración aunque todavía falte información del cliente; el expediente solo pasa a **“Expediente listo para enviar”** cuando la información del cliente está completa y todas las confirmaciones técnicas están validadas.
