import React from 'react';

interface Cpu3DProps {
  active: boolean;
}

export const Cpu3D: React.FC<Cpu3DProps> = ({ active }) => {
  return (
    <div
      style={{
        width: '260px',
        height: '260px',
        background: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)',
        border: '3px solid #64748b',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: active ? '0 0 50px rgba(99, 102, 241, 0.4)' : 'none',
        transform: 'rotateX(15deg) rotateY(10deg)',
      }}
    >
      <div
        style={{
          width: '180px',
          height: '180px',
          border: '2px solid #94a3b8',
          borderRadius: '16px',
          background: 'linear-gradient(180deg, #1e293b, #090d16)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700, letterSpacing: '2px' }}>
          CPU DIE
        </span>
        <span style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', marginTop: '6px' }}>
          CORE 8X
        </span>
        <div
          style={{
            marginTop: '10px',
            fontSize: '11px',
            color: active ? '#38bdf8' : '#475569',
            fontWeight: 700,
          }}
        >
          {active ? '● EXECUTING' : 'IDLE'}
        </div>
      </div>
    </div>
  );
};
