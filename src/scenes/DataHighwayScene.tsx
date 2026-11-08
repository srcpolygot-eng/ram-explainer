import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Cpu3D } from '../components/Cpu3D';
import { DataConduit } from '../components/DataConduit';

interface DataHighwayProps {
  primaryColor: string;
  secondaryColor: string;
}

export const DataHighwayScene: React.FC<DataHighwayProps> = ({
  primaryColor,
  secondaryColor,
}) => {
  const frame = useCurrentFrame();

  const cameraPan = interpolate(frame, [0, 300], [-100, 100], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1400px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '60px',
          textAlign: 'center',
          zIndex: 20,
        }}
      >
        <div style={{ color: secondaryColor, fontSize: '18px', fontWeight: 700, letterSpacing: '3px' }}>
          SYSTEM BUS ARCHITECTURE
        </div>
        <h2 style={{ fontSize: '52px', fontWeight: 800, margin: '10px 0' }}>
          The Direct Highway to CPU Cache
        </h2>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '1200px',
          transform: `translateX(${cameraPan * 0.3}px) rotateX(15deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* RAM Node */}
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.9)',
            border: `2px solid ${primaryColor}`,
            borderRadius: '20px',
            padding: '30px 40px',
            textAlign: 'center',
            boxShadow: `0 0 40px ${primaryColor}44`,
          }}
        >
          <div style={{ fontSize: '16px', color: primaryColor, fontWeight: 700 }}>STAGE 1</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff' }}>DDR5 RAM</div>
          <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '6px' }}>Loaded Program Instructions</div>
        </div>

        {/* Dynamic Bus Conduit */}
        <DataConduit frame={frame} color={primaryColor} />

        {/* CPU Node */}
        <Cpu3D active={frame > 30} />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '16px 32px',
          fontSize: '22px',
          color: '#cbd5e1',
          maxWidth: '900px',
          textAlign: 'center',
        }}
      >
        RAM holds active OS processes, browser tabs, and game textures so the CPU can execute billions of instructions per second without waiting.
      </div>
    </AbsoluteFill>
  );
};
