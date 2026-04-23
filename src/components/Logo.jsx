// Krowdly logo — 6-petal mark + wordmark
// Pass darkBg={true} when rendering on a dark background (wordmark becomes white)
export default function Logo({ height = 36, wordmark = true, darkBg = false }) {
  const textColor = darkBg ? '#e6edf3' : '#1E3A5F'

  // Petal dimensions scaled relative to height
  const markSize = height
  const totalWidth = wordmark ? markSize + 8 + Math.round(markSize * 3.6) : markSize

  // Centre of the petal cluster
  const cx = markSize / 2
  const cy = markSize / 2
  const rx = markSize * 0.155   // petal half-width
  const ry = markSize * 0.255   // petal half-height
  // Distance from centre to petal centre
  const d  = markSize * 0.195

  // 6 petals: colour, rotation angle
  const petals = [
    { fill: '#E8503A', rotate: 0   },  // top — coral
    { fill: '#8B5FBF', rotate: 60  },  // top-right — purple
    { fill: '#3A9EBF', rotate: 120 },  // bottom-right — teal-blue
    { fill: '#3DAE8A', rotate: 180 },  // bottom — teal-green
    { fill: '#8AAF3A', rotate: 240 },  // bottom-left — olive
    { fill: '#E8923A', rotate: 300 },  // top-left — amber
  ]

  return (
    <svg
      width={totalWidth}
      height={markSize}
      viewBox={`0 0 ${totalWidth} ${markSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Krowdly"
    >
      {/* Petal cluster */}
      <g style={{ isolation: 'isolate' }}>
        {petals.map(({ fill, rotate }) => {
          // Each petal is an ellipse centred at (cx, cy - d), rotated around (cx, cy)
          const rad = (rotate * Math.PI) / 180
          const petalCx = cx + d * Math.sin(rad)
          const petalCy = cy - d * Math.cos(rad)
          return (
            <ellipse
              key={rotate}
              cx={petalCx}
              cy={petalCy}
              rx={rx}
              ry={ry}
              fill={fill}
              opacity="0.88"
              transform={`rotate(${rotate} ${cx} ${cy})`}
            />
          )
        })}
      </g>

      {/* Wordmark */}
      {wordmark && (
        <text
          x={markSize + 8}
          y={markSize * 0.72}
          fontFamily="'Inter', 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif"
          fontWeight="800"
          fontSize={markSize * 0.55}
          fill={textColor}
          letterSpacing="-0.5"
        >
          Krowdly
        </text>
      )}
    </svg>
  )
}
