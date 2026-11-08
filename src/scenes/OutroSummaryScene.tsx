import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface OutroSummaryProps {
  primaryColor: string;
  accentColor: string;
}

export const OutroSummaryScene: React.FC<OutroSummaryProps> = ({
  primaryColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  const pulse = Math.sin(frame * 0.08) * 10;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px',
      }}
    >
      <div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '30px',
          background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '36px',
          transform: `scale(${entrance}) rotate(${pulse}deg)`,
          boxShadow: `0 0 60px ${primaryColor}66`,
        }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" />
        </svg>
      </div>

      <h2
        style={{
          fontSize: '68px',
          fontWeight: 800,
          margin: 0,
          letterSpacing: '-1.5px',
          opacity: entrance,
          transform: `translateY(${(1 - entrance) * 50}px)`,
        }}
      >
        The Golden Rule of RAM
      </h2>

      <div
        style={{
          maxWidth: '1000px',
          fontSize: '32px',
          color: '#cbd5e1',
          lineHeight: 1.5,
          marginTop: '28px',
          opacity: entrance,
        }}
      >
        <span style={{ color: primaryColor, fontWeight: 700 }}>RAM is not permanent storage.</span>
        <br />
        It is your computer’s high-speed workspace — keeping active tasks instantly accessible so you never drop a frame.
      </div>

      <div
        style={{
          marginTop: '48px',
          padding: '16px 36px',
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          fontSize: '18px',
          fontWeight: 600,
          color: '#94a3b8',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        Rendered Programmatically with Remotion & React
      </div>
    </AbsoluteFill>
  );
};
