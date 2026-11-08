import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { RamStick3D } from '../components/RamStick3D';

interface IntroSceneProps {
  title: string;
  primaryColor: string;
  secondaryColor: string;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  title,
  primaryColor,
  secondaryColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth camera zoom & 3D tilt
  const zoom = interpolate(frame, [0, 300], [1.15, 1.0], {
    extrapolateRight: 'clamp',
  });

  const titleSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const titleOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${zoom})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
      }}
    >
      {/* 3D Model Rendering Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `rotateX(22deg) rotateY(${Math.sin(frame * 0.02) * 8}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <RamStick3D color={primaryColor} active={frame > 40} />
      </div>

      {/* Kinetic Typography Layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '1200px',
          padding: '0 40px',
        }}
      >
        <div
          style={{
            fontSize: '22px',
            fontWeight: 700,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: primaryColor,
            marginBottom: '16px',
            opacity: titleOpacity,
          }}
        >
          Computer Architecture Deep Dive
        </div>

        <h1
          style={{
            fontSize: '76px',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            margin: 0,
            opacity: titleOpacity,
            transform: `translateY(${(1 - titleSpring) * 60}px)`,
            textShadow: `0 0 40px ${primaryColor}66`,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: '32px',
            color: '#94a3b8',
            marginTop: '24px',
            opacity: subtitleOpacity,
            fontWeight: 500,
          }}
        >
          Why your CPU starves without Random Access Memory
        </p>
      </div>
    </AbsoluteFill>
  );
};
