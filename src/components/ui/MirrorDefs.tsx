/**
 * La sagoma degli specchi a punta del salone (scheda §6, riferimento 2).
 * Definita una volta; la usa la classe .shape-mirror. objectBoundingBox la fa
 * scalare con qualunque elemento.
 */
export function MirrorDefs(): React.JSX.Element {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="forma-specchio" clipPathUnits="objectBoundingBox">
          <path d="M0.5,0 C0.74,0.16 1,0.42 1,0.7 C1,0.88 0.78,1 0.5,1 C0.22,1 0,0.88 0,0.7 C0,0.42 0.26,0.16 0.5,0 Z" />
        </clipPath>
      </defs>
    </svg>
  )
}
