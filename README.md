# M10.2. JSX con React — Evolución de Aplicación Empresarial

**Autora:** Ivanna Simosa  
**Módulo:** Desarrollo de Interfaces (M10.2 · DAM2)  
**Repositorio GitHub:** [https://github.com/ivannasimosa0308/actividad_unit8_reactNat](https://github.com/ivannasimosa0308/actividad_unit8_reactNat)  
**Aplicación desplegada (Vercel):** [Pendiente de enlazar tras pulsar Deploy en Vercel — p. ej. `https://actividad-unit8-react-nat.vercel.app`](https://actividad-unit8-react-nat.vercel.app)

---

## Resumen del proyecto

Evolución del proyecto base `m10-2-jsx-react-demo` (**React 18 + Vite**) desde una demo técnica de aula hasta un prototipo funcional completo aplicando estándares de entorno empresarial, resolviendo los **10 tickets del backlog**:

1. **Ticket 01 — Identidad Corporativa y Selector de Tema (`src/App.jsx`, `src/index.css`):** Botón en `<header>` para alternar entre modo oscuro y modo claro mediante clases CSS y variables de tema, más `<footer>` corporativo con nombre completo, módulo y año dinámico (`new Date().getFullYear()`).
2. **Ticket 02 — Validación Reactiva de Formulario (`src/components/01_SintaxisYFragmentos.jsx`):** Input `#campo-alumno` controlado con `useState`, aviso de error accesible (`role="alert"`) en rojo con menos de 3 caracteres y saludo personalizado en tiempo real a partir de 3 caracteres.
3. **Ticket 03 — Calculadora Fiscal con Descuentos e IVA Dinámico (`src/components/02_ExpresionesYEstilos.jsx`):** Selector de tipo de IVA (General 21%, Reducido 10%, Superreducido 4%), descuento comercial (0%–50%), desglose fiscal completo con 2 decimales y resaltado en verde con `style={{ ... }}` cuando existe descuento.
4. **Ticket 04 — Corrección de "La Trampa del 0" y Estado Vacío (`src/components/03_RenderizadoCondicional.jsx`):** Sustitución de `notificaciones && ...` por una condición booleana segura (`notificaciones > 0 && ...`), botón `"Marcar todas como leídas"` deshabilitado cuando no hay avisos y mensaje de estado vacío informativo.
5. **Ticket 05 — Buscador en Tiempo Real y Control de Duplicados (`src/components/04_ListasYKeys.jsx`):** Bloqueo de módulos duplicados (sin distinguir mayúsculas/minúsculas) con mensaje de error, buscador en tiempo real por nombre o código y contador dinámico `"Mostrando X de Y módulos"`.
6. **Ticket 06 — Auditoría de Eventos y Banco de Pruebas XSS (`src/components/05_EventosYSeguridadXSS.jsx`):** Historial de los últimos 5 eventos renderizado con `.map()` y `key` única, botón `"Limpiar historial"` y 3 botones para cargar payloads XSS de prueba (`<script>`, `<img onerror>`, `<svg onload>`) neutralizados automáticamente por JSX.
7. **Ticket 07 — Buscador y Ordenación de Expedientes (`src/components/06_DemoIntegradora.jsx`):** Búsqueda por nombre combinable con el filtro de aprobados, selector de ordenación (Nota mayor a menor, Nota menor a mayor y Nombre A–Z) y estado vacío cuando no hay coincidencias.
8. **Ticket 08 — Alta Dinámica de Nuevos Expedientes (`src/components/06_DemoIntegradora.jsx`):** Gestión de expedientes mediante `useState` y formulario controlado (nombre obligatorio, nota 0–10 y módulos separados por comas) con asignación de `id` único y limpieza automática del formulario.
9. **Ticket 09 — Cuadro de Mando Reutilizable de KPIs (`src/components/ResumenKPIs.jsx`):** Componente desacoplado `<ResumenKPIs alumnos={...} />` que calcula dinámicamente Total de alumnos, Nota media del grupo (2 decimales) y Porcentaje de aprobados (%) según los datos y filtros activos.
10. **Ticket 10 — Persistencia en `localStorage` y Calidad de Producción (`src/components/06_DemoIntegradora.jsx`):** Guardado y carga automática en `localStorage`, botón `"Restablecer datos iniciales"` que elimina la clave guardada y recupera los 3 expedientes originales, consola limpia sin warnings de React y compilación de producción verificada con `npm run build`.

---

## Puesta en marcha local

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Se abrirá en `http://localhost:5173`.
3. Genera la compilación de producción:
   ```bash
   npm run build
   ```
4. Previsualiza el build de producción:
   ```bash
   npm run preview
   ```

## Estructura principal (`src/`)

- `src/App.jsx` — Navegación por pestañas, selector de tema claro/oscuro y pie de página corporativo.
- `src/index.css` — Sistema de diseño con variables CSS para modo oscuro y modo claro.
- `src/components/01_SintaxisYFragmentos.jsx` — Sintaxis JSX, fragmentos y validación reactiva.
- `src/components/02_ExpresionesYEstilos.jsx` — Calculadora fiscal con IVA dinámico, descuentos y estilos en línea.
- `src/components/03_RenderizadoCondicional.jsx` — Early return, ternario, corrección de la trampa del `0` y estado vacío.
- `src/components/04_ListasYKeys.jsx` — Catálogo de módulos con control de duplicados, buscador y contador dinámico.
- `src/components/05_EventosYSeguridadXSS.jsx` — Auditoría de los últimos 5 eventos y banco de pruebas XSS.
- `src/components/06_DemoIntegradora.jsx` — Panel de expedientes DAM2 con alta, filtros, ordenación, KPIs y persistencia en `localStorage`.
- `src/components/ResumenKPIs.jsx` — Componente reutilizable de indicadores clave del grupo.
