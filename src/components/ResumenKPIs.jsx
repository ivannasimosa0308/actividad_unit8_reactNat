// ============================================================================
// Componente reutilizable de Cuadro de Mando (KPIs)
// Recibe la lista actual de alumnos mediante props y calcula dinámicamente:
// - Total de alumnos
// - Nota media del grupo (con 2 decimales)
// - Porcentaje de aprobados (%)
// ============================================================================

export default function ResumenKPIs({ alumnos = [] }) {
  const totalAlumnos = alumnos.length;
  const sumaNotas = alumnos.reduce((acumulado, alumno) => acumulado + alumno.nota, 0);
  const notaMedia = totalAlumnos > 0 ? (sumaNotas / totalAlumnos).toFixed(2) : '0.00';
  const totalAprobados = alumnos.filter((alumno) => alumno.nota >= 5).length;
  const porcentajeAprobados =
    totalAlumnos > 0 ? ((totalAprobados / totalAlumnos) * 100).toFixed(1) : '0.0';

  return (
    <section className="kpi-grid" aria-label="Cuadro de mando de expedientes">
      <article className="kpi-card">
        <span className="kpi-label">Total de alumnos</span>
        <strong className="kpi-value">{totalAlumnos}</strong>
      </article>

      <article className="kpi-card">
        <span className="kpi-label">Nota media del grupo</span>
        <strong className="kpi-value">{notaMedia}</strong>
      </article>

      <article className="kpi-card">
        <span className="kpi-label">Porcentaje de aprobados</span>
        <strong className="kpi-value" style={{ color: 'var(--green-text)' }}>
          {porcentajeAprobados}%
        </strong>
      </article>
    </section>
  );
}
