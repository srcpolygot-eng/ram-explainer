import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SpeedComparisonProps {
  primaryColor: string;
  accentColor: string;
}

export const SpeedComparisonScene: React.FC<SpeedComparisonProps> = ({
  primaryColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1Spring = spring({ frame: frame - 15, fps, config: { damping: 14 } });
  const card2Spring = spring({ frame: frame - 45, fps, config: { damping: 14 } });

  const ssdSpeed = Math.round(interpolate(frame, [30, 100], [0, 5000], { extrapolateRight: 'clamp' }));
  const ramSpeed = Math.round(interpolate(frame, [60, 140], [0, 68000], { extrapolateRight: 'clamp' }));

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        <span
          style={{
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '3px',
            color: accentColor,
            textTransform: 'uppercase',
          }}
        >
          Hierarchy of Latency & Throughput
        </span>
        <h2 style={{ fontSize: '56px', fontWeight: 800, margin: '12px 0 0' }}>
          Storage (SSD) vs. Active Memory (RAM)
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          width: '100%',
          maxWidth: '1300px',
        }}
      >
        {/* SSD Card */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '2px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '24px',
            padding: '40px',
            transform: `translateY(${(1 - card1Spring) * 80}px)`,
            opacity: card1Spring,
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: '20px', fontWeight: 600 }}>
            NVMe SSD (Storage Tier)
          </div>
          <div style={{ fontSize: '64px', fontWeight: 800, color: '#f8fafc', margin: '20px 0' }}>
            ~{ssdSpeed.toLocaleString()} <span style={{ fontSize: '28px', color: '#64748b' }}>MB/s</span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '22px', lineHeight: 1.5 }}>
            Stores terrabytes permanently, but fetching data requires milliseconds. The CPU cannot run apps directly from here.
          </p>
        </div>

        {/* RAM Card */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            border: `2px solid ${primaryColor}`,
            borderRadius: '24px',
            padding: '40px',
            transform: `translateY(${(1 - card2Spring) * 80}px)`,
            opacity: card2Spring,
            boxShadow: `0 0 50px ${primaryColor}33`,
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ color: primaryColor, fontSize: '20px', fontWeight: 700 }}>
            DDR5 RAM (Working Workspace)
          </div>
          <div style={{ fontSize: '64px', fontWeight: 800, color: '#ffffff', margin: '20px 0' }}>
            ~{ramSpeed.toLocaleString()} <span style={{ fontSize: '28px', color: primaryColor }}>MB/s</span>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '22px', lineHeight: 1.5 }}>
            Over <strong>10x to 100x faster</strong> with single-digit nanosecond latency. Acts as the CPU's immediate work desk.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
