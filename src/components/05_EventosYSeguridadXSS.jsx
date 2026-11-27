import { useRef, useState } from 'react';

// ============================================================================
// [CLAVE EXPOSICIÓN 5] EVENTOS EN JSX Y SEGURIDAD AUTOMÁTICA CONTRA XSS
// ----------------------------------------------------------------------------
// 1. EVENTOS:
//    - En HTML: onclick="saludar()" (cadena de texto).
//    - En JSX:  onClick={saludar}   (referencia a función en camelCase).
//    - Si necesita argumentos: onClick={() => saludar('DAM2')}.
//      ¡ERROR TÍPICO!: escribir onClick={saludar('DAM2')} ejecuta la función
//      inmediatamente al renderizar, no al hacer clic.
// 2. PREVENCIÓN DE XSS (Cross-Site Scripting):
//    - JSX escapa automáticamente cualquier cadena insertada dentro de { }.
//    - Si un atacante introduce `<script>` o `<img onerror=...>`, React lo
//      pinta como texto plano seguro sin ejecutar código JavaScript.
// ============================================================================

const PAYLOADS_XSS = [
  {
    id: 'xss-script',
    etiqueta: 'Cargar payload XSS: <script>',
    codigo: '<script>alert("Ataque XSS mediante etiqueta script")</script>'
  },
  {
    id: 'xss-img',
    etiqueta: 'Cargar payload XSS: <img onerror>',
    codigo: '<img src="x" onerror="alert(\'Ataque XSS mediante img onerror\')" />'
  },
  {
    id: 'xss-svg',
    etiqueta: 'Cargar payload XSS: <svg onload>',
    codigo: '<svg onload="alert(\'Ataque XSS mediante svg onload\')"></svg>'
  }
];

export default function EventosYSeguridadXSS() {
  const [historialEventos, setHistorialEventos] = useState([]);
  const [entradaUsuario, setEntradaUsuario] = useState(
    "<img src=x onerror='alert(\"Ataque XSS\")' /> <script>alert(\"Hack\")</script>"
  );
  const contadorIdRef = useRef(1);

  const registrarEvento = (descripcion) => {
    const nuevoEvento = {
      id: `evt-${Date.now()}-${contadorIdRef.current++}`,
      hora: new Date().toLocaleTimeString(),
      descripcion
    };
    setHistorialEventos((prev) => [nuevoEvento, ...prev].slice(0, 5));
  };

  // Manejador sin parámetros (se pasa como referencia: onClick={manejarClickSimple})
  const manejarClickSimple = () => {
    registrarEvento('Clic simple ejecutado con referencia onClick={fn}');
  };

  // Manejador con parámetros (requiere función flecha: onClick={() => manejarConParametro(...)})
  const manejarConParametro = (accion) => {
    registrarEvento(`Acción ejecutada con parámetro: "${accion}"`);
  };

  const limpiarHistorial = () => {
    setHistorialEventos([]);
  };

  const cargarPayloadXSS = (item) => {
    setEntradaUsuario(item.codigo);
    registrarEvento(`Prueba de seguridad: ${item.etiqueta}`);
  };

  return (
    <section className="card">
      <h2>5. Manejo de Eventos y Protección Nativa contra XSS</h2>
      <p className="subtitle">
        Prueba los botones de eventos y comprueba cómo JSX neutraliza automáticamente código HTML/JS malicioso.
      </p>

      <div className="grid-2">
        <div className="box box-success">
          <h3>Auditoría de Eventos (últimos 5)</h3>

          <div className="btn-row">
            {/* Referencia directa a la función */}
            <button type="button" className="btn" onClick={manejarClickSimple}>
              onClick=&#123;fn&#125;
            </button>
            {/* Función flecha para pasar argumentos sin ejecutar en el render */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => manejarConParametro('Exportar PDF')}
            >
              onClick=&#123;() =&gt; fn(arg)&#125;
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={limpiarHistorial}
              disabled={historialEventos.length === 0}
            >
              Limpiar historial
            </button>
          </div>

          {historialEventos.length === 0 ? (
            <p className="empty-state">
              No hay eventos registrados todavía. Pulsa algún botón para iniciar la auditoría.
            </p>
          ) : (
            <ul className="list" aria-label="Historial de los últimos 5 eventos">
              {historialEventos.map((evento) => (
                <li key={evento.id} className="list-item">
                  <span style={{ fontSize: '0.88rem' }}>{evento.descripcion}</span>
                  <span className="pill" style={{ whiteSpace: 'nowrap' }}>
                    {evento.hora}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box box-warn">
          <h3>Escapado automático contra XSS</h3>
          <label htmlFor="xss-input">Introduce HTML o un payload XSS:</label>
          <input
            id="xss-input"
            type="text"
            className="input"
            value={entradaUsuario}
            onChange={(e) => setEntradaUsuario(e.target.value)}
          />

          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
            Banco de pruebas — Cargar payload XSS de prueba:
          </p>
          <div className="btn-row" style={{ marginTop: '0.4rem' }}>
            {PAYLOADS_XSS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="btn btn-secondary"
                onClick={() => cargarPayloadXSS(item)}
              >
                {item.etiqueta}
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.65rem',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontFamily: 'Consolas, monospace',
              fontSize: '0.85rem',
              wordBreak: 'break-all'
            }}
          >
            {/* JSX escapa automáticamente esta cadena: NO se ejecuta el script */}
            Salida renderizada segura: {entradaUsuario}
          </div>
        </div>
      </div>

      <p className="file-hint">
        Archivo para mostrar en VS Code: <code className="code-inline">src/components/05_EventosYSeguridadXSS.jsx</code>
      </p>
    </section>
  );
}
