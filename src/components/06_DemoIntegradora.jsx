import { useState } from 'react';

// ============================================================================
// [CLAVE EXPOSICIÓN 6] DEMO INTEGRADORA DE TODAS LAS CARACTERÍSTICAS DE JSX
// ----------------------------------------------------------------------------
// Este componente reúne en un caso real de aula:
// - Fragmentos (<>...</>) y atributos camelCase (className, onClick, onChange)
// - Expresiones JS { } y estilos en línea dinámicos style={{ }}
// - Renderizado condicional (ternario + && booleano seguro)
// - Listas con .map() y key única estable
// - Comunicación mediante props y composición de componentes
// ============================================================================

const EXPEDIENTES = [
  { id: 101, nombre: 'Lucía Serrano', nota: 8.7, modulos: ['DI', 'PSP', 'AD'] },
  { id: 102, nombre: 'Marcos Vega', nota: 4.3, modulos: ['DI', 'SGE'] },
  { id: 103, nombre: 'Sofía Navarro', nota: 9.5, modulos: ['DI', 'PSP', 'AD', 'PMDM'] }
];

function TarjetaExpediente({ alumno, seleccionado, onSeleccionar }) {
  const aprobado = alumno.nota >= 5;

  return (
    <article
      className="box"
      style={{
        borderColor: seleccionado ? 'var(--primary)' : 'var(--border)',
        borderWidth: seleccionado ? '2px' : '1px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{alumno.nombre}</h3>
        <span className={`badge ${aprobado ? 'badge-ok' : 'badge-fail'}`}>
          {aprobado ? `Aprobado (${alumno.nota})` : `Pendiente (${alumno.nota})`}
        </span>
      </div>

      {alumno.modulos.length > 0 && (
        <div className="btn-row" style={{ marginTop: '0.6rem' }}>
          {alumno.modulos.map((mod) => (
            <span key={`${alumno.id}-${mod}`} className="code-inline">
              {mod}
            </span>
          ))}
        </div>
      )}

      <div className="btn-row">
        <button type="button" className="btn" onClick={() => onSeleccionar(alumno)}>
          {seleccionado ? 'Expediente seleccionado' : 'Seleccionar expediente'}
        </button>
      </div>
    </article>
  );
}

export default function DemoIntegradora() {
  const [soloAprobados, setSoloAprobados] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('nota-desc');
  const [seleccionado, setSeleccionado] = useState(null);

  const termino = busqueda.trim().toLowerCase();

  const listaVisible = EXPEDIENTES.filter((alumno) => {
    const cumpleAprobado = !soloAprobados || alumno.nota >= 5;
    const cumpleNombre = alumno.nombre.toLowerCase().includes(termino);
    return cumpleAprobado && cumpleNombre;
  }).sort((a, b) => {
    if (orden === 'nota-desc') return b.nota - a.nota;
    if (orden === 'nota-asc') return a.nota - b.nota;
    return a.nombre.localeCompare(b.nombre, 'es');
  });

  return (
    <>
      <section className="card">
        <h2>6. Ejemplo Integrador: Panel de Expedientes DAM2</h2>
        <p className="subtitle">
          Composición de componentes reutilizables aplicando todas las reglas de JSX.
        </p>

        <div className="controls-bar">
          <input
            type="search"
            className="input"
            style={{ flex: '1 1 220px' }}
            placeholder="Buscar alumno por nombre..."
            aria-label="Buscar alumno por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="input"
            aria-label="Ordenar expedientes"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="nota-desc">Nota (mayor a menor)</option>
            <option value="nota-asc">Nota (menor a mayor)</option>
            <option value="nombre-asc">Nombre (A–Z)</option>
          </select>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setSoloAprobados((prev) => !prev)}
          >
            {soloAprobados ? 'Mostrar todos los alumnos' : 'Filtrar solo aprobados (>= 5)'}
          </button>

          {seleccionado && (
            <span className="pill">
              Seleccionado: {seleccionado.nombre} (ID #{seleccionado.id})
            </span>
          )}
        </div>

        {listaVisible.length === 0 ? (
          <p className="empty-state">No se encontraron expedientes con esos criterios</p>
        ) : (
          <div className="grid-2">
            {listaVisible.map((alumno) => (
              <TarjetaExpediente
                key={alumno.id}
                alumno={alumno}
                seleccionado={seleccionado?.id === alumno.id}
                onSeleccionar={setSeleccionado}
              />
            ))}
          </div>
        )}

        <p className="file-hint">
          Archivo para mostrar en VS Code: <code className="code-inline">src/components/06_DemoIntegradora.jsx</code>
        </p>
      </section>
    </>
  );
}
