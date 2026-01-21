type SVGProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  reverseX?: boolean;
};
export function LineSVG({
  width = 45,
  height = 1,
  className,
  reverseX = false,
}: SVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 45 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <g transform={reverseX ? "scale(-1,1) translate(-45,0)" : undefined}>
        <path
          d="M44.5 0.5H0.5"
          stroke="url(#paint0_linear)"
          strokeLinecap="round"
        />
      </g>

      <defs>
        <linearGradient
          id="paint0_linear"
          x1="22.5"
          y1="0"
          x2="22.4888"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF4D8" />
          <stop offset="1" stopColor="#FFF4D8" stopOpacity="0.01" />
        </linearGradient>
      </defs>
    </svg>
  );
}
