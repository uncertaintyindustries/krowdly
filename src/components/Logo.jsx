// Krowdly logo — petal mark + wordmark
// Matches the uploaded brand asset exactly
export default function Logo({ height = 36, wordmark = true }) {
  return (
    <svg
      height={height}
      viewBox={wordmark ? "0 0 260 72" : "0 0 72 72"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Petal mark (6 overlapping rounded petals, semi-transparent) ── */}
      <g style={{ isolation: 'isolate' }}>
        {/* Top petal — coral/red */}
        <ellipse cx="35" cy="21" rx="11" ry="18" fill="#E8503A" opacity="0.92" />
        {/* Top-right petal — purple */}
        <ellipse cx="35" cy="21" rx="11" ry="18"
          transform="rotate(60 35 36)" fill="#8B5FBF" opacity="0.85" />
        {/* Bottom-right petal — teal/blue */}
        <ellipse cx="35" cy="21" rx="11" ry="18"
          transform="rotate(120 35 36)" fill="#3A9EBF" opacity="0.85" />
        {/* Bottom petal — teal-green */}
        <ellipse cx="35" cy="21" rx="11" ry="18"
          transform="rotate(180 35 36)" fill="#3DAE8A" opacity="0.90" />
        {/* Bottom-left petal — olive/yellow-green */}
        <ellipse cx="35" cy="21" rx="11" ry="18"
          transform="rotate(240 35 36)" fill="#8AAF3A" opacity="0.82" />
        {/* Top-left petal — amber/orange */}
        <ellipse cx="35" cy="21" rx="11" ry="18"
          transform="rotate(300 35 36)" fill="#E8923A" opacity="0.88" />
      </g>

      {/* ── Wordmark ── */}
      {wordmark && (
        <text
          x="80"
          y="50"
          fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
          fontWeight="700"
          fontSize="36"
          fill="#1E3A5F"
          letterSpacing="-0.5"
        >
          Krowdly
        </text>
      )}
    </svg>
  )
}
