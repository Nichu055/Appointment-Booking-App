const Loader = ({ size = 32, color = "#2563eb" }: { size?: number; color?: string }) => (
  <span
    className="inline-block"
    style={{
      width: size,
      height: size,
    }}
  >
    <svg
      className="animate-spin"
      viewBox="0 0 50 50"
      style={{ width: size, height: size }}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="5"
        opacity="0.2"
      />
      <path
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        d="M25 5
           a 20 20 0 0 1 0 40
           a 20 20 0 0 1 0 -40"
      />
    </svg>
  </span>
);

export default Loader;
