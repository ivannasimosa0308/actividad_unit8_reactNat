import { useState } from 'react';

// ============================================================================
// [CLAVE EXPOSICIÓN 2] EXPRESIONES JAVASCRIPT { } Y ESTILOS EN LÍNEA
// ----------------------------------------------------------------------------
// 1. Dentro de { } solo caben EXPRESIONES (algo que produce un valor):
//    variables, cálculos, llamadas a funciones, template literals, ternarios.
// 2. NO caben SENTENCIAS (if, for, while, switch). Esas se resuelven fuera
//    del `return` o con expresiones equivalentes.
// 3. `style={{ ... }}` lleva DOBLE LLAVE:
//    - Llave exterior: abre expresión JSX.
//    - Llave interior: define un objeto literal de JavaScript.
//    - Propiedades CSS en camelCase: `backgroundColor`, `fontSize`, `borderRadius`.
// 4. React IGNORA en pantalla: true, false, null y undefined.
// ============================================================================

const formatearEuros = (cantidad) => `${cantidad.toFixed(2)} €`;

export default function ExpresionesYEstilos() {
  const [precioBase, setPrecioBase] = useState(100);
  const [tipoIva, setTipoIva] = useState(0.21);
  const [descuento, setDescuento] = useState(0);
  const [colorDestacado, setColorDestacado] = useState('#38bdf8');

  const importeDescontado = precioBase * (descuento / 100);
  const baseImponible = precioBase - importeDescontado;
  const cuotaIva = baseImponible * tipoIva;
  const totalFinal = baseImponible + cuotaIva;
  const porcentajeIva = Math.round(tipoIva * 100);

  // Objeto de estilos dinámico en JavaScript
  const estiloTarjetaDinamica = {
    backgroundColor: 'var(--surface-alt)',
    border: `2px solid ${colorDestacado}`,
    borderRadius: '10px',
    padding: '1rem',
    transition: 'border-color 0.2s ease'
  };

  return (
    <section className="card">
      <h2>2. Expresiones JavaScript &#123; &#125; y Estilos en Línea</h2>
      <p className="subtitle">
        Las llaves son una ventana directa a JavaScript dentro del marcado JSX.
      </p>

      <div className="grid-2">
        <div className="box">
          <h3>Calculadora fiscal en tiempo real</h3>

          <label htmlFor="precio-input">Precio base (€):</label>
          <input
            id="precio-input"
            type="number"
            min="0"
            step="0.01"
            className="input"
            value={precioBase}
            onChange={(e) => setPrecioBase(Math.max(0, Number(e.target.value) || 0))}
          />

          <div className="form-grid" style={{ marginTop: '0.75rem' }}>
            <div>
              <label htmlFor="iva-select">Tipo de IVA:</label>
              <select
                id="iva-select"
                className="input"
                value={tipoIva}
                onChange={(e) => setTipoIva(Number(e.target.value))}
              >
                <option value={0.21}>General (21%)</option>
                <option value={0.1}>Reducido (10%)</option>
                <option value={0.04}>Superreducido (4%)</option>
              </select>
            </div>

            <div>
              <label htmlFor="descuento-input">Descuento (0% – 50%):</label>
              <input
                id="descuento-input"
                type="number"
                min="0"
                max="50"
                step="1"
                className="input"
                value={descuento}
                onChange={(e) =>
                  setDescuento(Math.min(50, Math.max(0, Number(e.target.value) || 0)))
                }
              />
            </div>
          </div>

          <ul className="list">
            <li className="list-item">
              <span>Precio Base:</span>
              <strong>{formatearEuros(precioBase)}</strong>
            </li>
            <li className="list-item">
              <span>Importe Descontado ({descuento}%):</span>
              <strong>-{formatearEuros(importeDescontado)}</strong>
            </li>
            <li className="list-item">
              <span>Base Imponible:</span>
              <strong>{formatearEuros(baseImponible)}</strong>
            </li>
            <li className="list-item">
              <span>Cuota de IVA ({porcentajeIva}%):</span>
              <strong>{formatearEuros(cuotaIva)}</strong>
            </li>
            <li
              className="list-item"
              style={
                descuento > 0
                  ? { borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }
                  : undefined
              }
            >
              <span>Total Final:</span>
              <strong
                style={{
                  color: descuento > 0 ? '#10b981' : 'inherit',
                  fontSize: descuento > 0 ? '1.1rem' : '1rem'
                }}
              >
                {formatearEuros(totalFinal)}
              </strong>
            </li>
            <li className="list-item">
              <span>Valores ignorados (true/false/null):</span>
              <strong>[{true}{false}{null}{undefined}] (vacío)</strong>
            </li>
          </ul>
        </div>

        <div style={estiloTarjetaDinamica}>
          <h3 style={{ color: colorDestacado, marginTop: 0 }}>
            Estilos en línea con style=&#123;&#123; camelCase &#125;&#125;
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-soft)' }}>
            El borde y el título de este recuadro se calculan dinámicamente desde un objeto
            JavaScript usando <code className="code-inline">border</code> y <code className="code-inline">color</code>.
          </p>

          <div className="btn-row">
            <button type="button" className="btn" onClick={() => setColorDestacado('#38bdf8')}>
              Azul Cyan
            </button>
            <button type="button" className="btn" style={{ backgroundColor: '#059669' }} onClick={() => setColorDestacado('#10b981')}>
              Verde Esmeralda
            </button>
            <button type="button" className="btn" style={{ backgroundColor: '#d97706' }} onClick={() => setColorDestacado('#f59e0b')}>
              Ámbar
            </button>
          </div>
        </div>
      </div>

      <p className="file-hint">
        Archivo para mostrar en VS Code: <code className="code-inline">src/components/02_ExpresionesYEstilos.jsx</code>
      </p>
    </section>
  );
}
