import type { IconProps } from "-/lib/types";

export const ArrowCounterClockwiseIcon = ({
  size = 48,
  color = "#FFFFFF",
  strokeWidth = undefined,
  background = "transparent",
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0,
  ...props
}: IconProps) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push("scaleX(-1)");
  if (flipVertical) transforms.push("scaleY(-1)");

  const viewBoxSize = 24 + padding * 2;
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        opacity,
        transform: transforms.join(" ") || undefined,
        filter:
          shadow > 0
            ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))`
            : undefined,
        backgroundColor: background !== "transparent" ? background : undefined,
      }}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth={strokeWidth}
      >
        <path d="M4.266 16.06a8.92 8.92 0 0 0 3.915 3.978a8.7 8.7 0 0 0 5.471.832a8.8 8.8 0 0 0 4.887-2.64a9.07 9.07 0 0 0 2.388-5.079a9.14 9.14 0 0 0-1.044-5.53a8.9 8.9 0 0 0-4.068-3.815a8.7 8.7 0 0 0-5.5-.608c-1.85.401-3.367 1.313-4.62 2.755a7.6 7.6 0 0 0-1.22 1.781" />
        <path d="m8.931 7.813l-5.04.907L3 3.59" />
      </g>
    </svg>
  );
};
