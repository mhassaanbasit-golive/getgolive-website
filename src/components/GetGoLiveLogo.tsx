import React from 'react';

interface GetGoLiveEmblemProps {
  className?: string;
  size?: number;
}

/**
 * GetGoLive Bot / Brand Emblem
 * Features two overlapping diagonal rounded squares with the notification accent dot.
 * Automatically adapts to the active theme using currentColor / var(--text-primary).
 */
export const GetGoLiveEmblem: React.FC<GetGoLiveEmblemProps> = ({
  className = '',
  size = 28,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0 }}
      aria-label="GetGoLive Assistant"
    >
      {/* Upper-Right Rounded Square */}
      <rect
        x="42"
        y="14"
        width="44"
        height="44"
        rx="12"
        fill="currentColor"
      />
      {/* Top-Right Notification Dot */}
      <circle
        cx="92"
        cy="12"
        r="7.5"
        fill="currentColor"
      />
      {/* Lower-Left Rounded Square with cutout/gap outline */}
      <rect
        x="14"
        y="42"
        width="44"
        height="44"
        rx="12"
        fill="currentColor"
        stroke="var(--bg-primary)"
        strokeWidth="4"
      />
    </svg>
  );
};

/**
 * Header Brand Wordmark
 * Renders the exact GetGoLive typography as featured in the site navbar.
 */
export const GetGoLiveHeaderLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span
      className={`font-bold font-headline text-[18px] sm:text-[20px] tracking-tight whitespace-nowrap text-[var(--text-primary)] select-none ${className}`}
    >
      GetGoLive
    </span>
  );
};
