import { useEffect, useRef, useState } from 'react';
import ResumenKPIs from './ResumenKPIs.jsx';

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

const STORAGE_KEY = 'm10_2_expedientes_dam2';

const EXPEDIENTES_INICIALES = [
  { id: 101, nombre: 'Lucía Serrano', nota: 8.7, modulos: ['DI', 'PSP', 'AD'] },
  { id: 102, nombre: 'Marcos Vega', nota: 4.3, modulos: ['DI', 'SGE'] },
  { id: 103, nombre: 'Sofía Navarro', nota: 9.5, modulos: ['DI', 'PSP', 'AD', 'PMDM'] }
];

function clonarExpedientesIniciales() {
  return EXPEDIENTES_INICIALES.map((item) => ({
    ...item,
    modulos: [...item.modulos]
  }));
}

function cargarExpedientesIniciales() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (!guardado) return clonarExpedientesIniciales();
    const datos = JSON.parse(guardado);
    const esValido =
      Array.isArray(datos) &&
      datos.every(
        (item) =>
          item &&
          item.id !== undefined &&
          typeof item.nombre === 'string' &&
          typeof item.nota === 'number' &&
          Array.isArray(item.modulos)
      );
    return esValido ? datos : clonarExpedientesIniciales();
  } catch {
    return clonarExpedientesIniciales();
  }
}

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
  const [expedientes, setExpedientes] = useState(cargarExpedientesIniciales);
  const [soloAprobados, setSoloAprobados] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('nota-desc');
  const [seleccionado, setSeleccionado] = useState(null);
  const omitirSiguienteGuardadoRef = useRef(false);

  // Estados del formulario controlado de alta de expedientes
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaNota, setNuevaNota] = useState('');
  const [nuevosModulos, setNuevosModulos] = useState('');
  const [errorFormulario, setErrorFormulario] = useState('');

  useEffect(() => {
    if (omitirSiguienteGuardadoRef.current) {
      omitirSiguienteGuardadoRef.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expedientes));
    } catch {
      // Ignorar errores de almacenamiento (modo privado o cuota llena)
    }
  }, [expedientes]);

  const restablecerDatosIniciales = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignorar errores de acceso a localStorage
    }
    omitirSiguienteGuardadoRef.current = true;
    setExpedientes(clonarExpedientesIniciales());
    setSeleccionado(null);
    setBusqueda('');
    setSoloAprobados(false);
    setErrorFormulario('');
  };

  const agregarExpediente = (e) => {
    e.preventDefault();
    const nombreLimpio = nuevoNombre.trim();
    if (!nombreLimpio) {
      setErrorFormulario('El nombre completo es obligatorio.');
      return;
    }

    const notaNumero = Number(nuevaNota);
    if (nuevaNota === '' || Number.isNaN(notaNumero) || notaNumero < 0 || notaNumero > 10) {
      setErrorFormulario('La nota debe ser un número válido entre 0 y 10.');
      return;
    }

    const modulosVistos = new Set();
    const listaModulos = nuevosModulos
      .split(',')
      .map((mod) => mod.trim())
      .filter((mod) => {
        if (!mod) return false;
        const clave = mod.toLowerCase();
        if (modulosVistos.has(clave)) return false;
        modulosVistos.add(clave);
        return true;
      });

    setExpedientes((prev) => {
      const siguienteId =
        prev.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 100), 100) + 1;
      const nuevoExpediente = {
        id: siguienteId,
        nombre: nombreLimpio,
        nota: Math.round(notaNumero * 100) / 100,
        modulos: listaModulos
      };
      return [...prev, nuevoExpediente];
    });

    setNuevoNombre('');
    setNuevaNota('');
    setNuevosModulos('');
    setErrorFormulario('');
  };

  const termino = busqueda.trim().toLowerCase();

  const listaVisible = expedientes
    .filter((alumno) => {
      const cumpleAprobado = !soloAprobados || alumno.nota >= 5;
      const cumpleNombre = alumno.nombre.toLowerCase().includes(termino);
      return cumpleAprobado && cumpleNombre;
    })
    .sort((a, b) => {
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

        <ResumenKPIs alumnos={listaVisible} />

        <form className="form-panel" onSubmit={agregarExpediente} noValidate>
          <h3 style={{ marginTop: 0 }}>Alta de nuevo expediente</h3>
          <div className="form-grid">
            <div>
              <label htmlFor="exp-nombre">Nombre completo *</label>
              <input
                id="exp-nombre"
                type="text"
                className="input"
                placeholder="Ej.: Elena Martínez"
                required
                value={nuevoNombre}
                onChange={(e) => {
                  setNuevoNombre(e.target.value);
                  if (errorFormulario) setErrorFormulario('');
                }}
              />
            </div>

            <div>
              <label htmlFor="exp-nota">Nota (0 – 10) *</label>
              <input
                id="exp-nota"
                type="number"
                min="0"
                max="10"
                step="0.1"
                className="input"
                placeholder="Ej.: 7.5"
                required
                value={nuevaNota}
                onChange={(e) => {
                  setNuevaNota(e.target.value);
                  if (errorFormulario) setErrorFormulario('');
                }}
              />
            </div>

            <div>
              <label htmlFor="exp-modulos">Módulos (separados por comas)</label>
              <input
                id="exp-modulos"
                type="text"
                className="input"
                placeholder="Ej.: DI, PSP, AD"
                value={nuevosModulos}
                onChange={(e) => setNuevosModulos(e.target.value)}
              />
            </div>
          </div>

          {errorFormulario && (
            <p role="alert" className="alert-error">
              {errorFormulario}
            </p>
          )}

          <div className="btn-row">
            <button type="submit" className="btn">
              Añadir expediente
            </button>
          </div>
        </form>

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

          <button
            type="button"
            className="btn btn-danger"
            onClick={restablecerDatosIniciales}
          >
            Restablecer datos iniciales
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
