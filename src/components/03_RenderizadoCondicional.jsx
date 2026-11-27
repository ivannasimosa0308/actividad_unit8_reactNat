import { useState } from 'react';

// ============================================================================
// [CLAVE EXPOSICIÓN 3] RENDERIZADO CONDICIONAL Y LA "TRAMPA DEL 0"
// ----------------------------------------------------------------------------
// 1. EARLY RETURN: Usar `if` antes del `return` principal para estados de carga.
// 2. TERNARIO (`condición ? A : B`): Cuando existen dos ramas alternativas.
// 3. OPERADOR `&&`: Para pintar un bloque solo si la condición es verdadera.
// 4. TRAMPA CLÁSICA DE EXAMEN:
//    `{notificaciones && <p>...</p>}` -> Si `notificaciones` vale 0, React
//    NO lo ignora: pinta literalmente el número "0" en pantalla.
//    SOLUCIÓN: Convertir siempre a booleano -> `{notificaciones > 0 && ...}`.
// ============================================================================

export default function RenderizadoCondicional() {
  const [cargando, setCargando] = useState(false);
  const [sesionIniciada, setSesionIniciada] = useState(true);
  const [notificaciones, setNotificaciones] = useState(0);

  // 1. PATRÓN EARLY RETURN (fuera del JSX sí podemos usar `if` estándar)
  if (cargando) {
    return (
      <section className="card">
        <h2>Cargando módulo mediante Early Return...</h2>
        <p className="subtitle">El componente retornó antes de evaluar el JSX principal.</p>
        <button type="button" className="btn" onClick={() => setCargando(false)}>
          Finalizar simulación de carga
        </button>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>3. Renderizado Condicional (y la Trampa del 0)</h2>
      <p className="subtitle">
        Demostración interactiva de los tres patrones de renderizado condicional en JSX.
      </p>

      <div className="btn-row" style={{ marginBottom: '1rem' }}>
        <button type="button" className="btn btn-secondary" onClick={() => setCargando(true)}>
          Probar Early Return (Cargando)
        </button>
        <button type="button" className="btn" onClick={() => setSesionIniciada((prev) => !prev)}>
          Alternar Sesión ({sesionIniciada ? 'Activa' : 'Cerrada'})
        </button>
        <button type="button" className="btn" onClick={() => setNotificaciones((n) => n + 1)}>
          +1 Notificación ({notificaciones})
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setNotificaciones(0)}
          disabled={notificaciones === 0}
        >
          Marcar todas como leídas
        </button>
      </div>

      <div className="grid-2">
        {/* 2. OPERADOR TERNARIO */}
        <div className="box box-success">
          <h3>Operador Ternario (? :)</h3>
          <p>
            Estado actual:{' '}
            {sesionIniciada ? (
              <span className="badge badge-ok">Usuario autenticado</span>
            ) : (
              <span className="badge badge-fail">Acceso como invitado</span>
            )}
          </p>
        </div>

        {/* 3. OPERADOR && CORREGIDO (SIN LA TRAMPA DEL 0) Y ESTADO VACÍO */}
        <div className={`box ${notificaciones > 0 ? 'box-warn' : 'box-success'}`}>
          <h3>Centro de Notificaciones (Trampa del 0 corregida)</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', marginBottom: '0.6rem' }}>
            Se ha sustituido <code className="code-inline">notificaciones &amp;&amp; ...</code> por la
            condición booleana <code className="code-inline">notificaciones &gt; 0 &amp;&amp; ...</code>{' '}
            para garantizar que nunca se pinte un <code className="code-inline">0</code> suelto.
          </p>

          {notificaciones > 0 && (
            <p className="alert-success" style={{ marginTop: '0.4rem' }}>
              Tienes {notificaciones} {notificaciones === 1 ? 'aviso pendiente' : 'avisos pendientes'}.
            </p>
          )}

          {notificaciones === 0 && (
            <p className="empty-state" style={{ marginTop: '0.4rem' }}>
              Estás al día. No tienes notificaciones pendientes
            </p>
          )}
        </div>
      </div>

      <p className="file-hint">
        Archivo para mostrar en VS Code: <code className="code-inline">src/components/03_RenderizadoCondicional.jsx</code>
      </p>
    </section>
  );
}
