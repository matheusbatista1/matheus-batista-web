type Props = {
  className?: string;
};

export function MbLogo({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Layer 1: Gray contour (subtle, behind) */}
      <g
        stroke="rgba(140,140,140,0.25)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 18 170 V 68 C 18 22, 84 22, 84 68 V 170" />
        <path d="M 84 68 C 84 22, 150 22, 150 68 V 170" />
        <path d="M 150 170 V 8" />
        <circle cx="205" cy="118" r="52" />
      </g>
      {/* Layer 2: Black strokes (thick, on top) */}
      <g
        stroke="black"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 18 170 V 68 C 18 22, 84 22, 84 68 V 170" />
        <path d="M 84 68 C 84 22, 150 22, 150 68 V 170" />
        <path d="M 150 170 V 8" />
        <circle cx="205" cy="118" r="52" />
      </g>
    </svg>
  );
}
