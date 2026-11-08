import React from 'react';

interface RamStick3DProps {
  color: string;
  active: boolean;
}

export const RamStick3D: React.FC<RamStick3DProps> = ({ color, active }) => {
  return (
    <div
      style={{
        width: '680px',
        height: '180px',
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        border: `3px solid ${active ? color : '#475569'}`,
        borderRadius: '16px',
        position: 'relative',
        boxShadow: active ? `0 0 60px ${color}55` : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px',
        transform: 'rotateX(15deg) rotateY(-10deg)',
        transition: 'all 0.5s ease',
      }}
    >
      {/* Top Heat-Spreader Fins */}
      <div
        style={{
          position: 'absolute',
          top: '-16px',
          left: '40px',
          right: '40px',
          height: '16px',
          background: '#090d16',
          borderRadius: '8px 8px 0 0',
          border: '1px solid #334155',
          borderBottom: 'none',
        }}
      />

      {/* Memory Chips */}
      {[1, 2, 3, 4].map((chip) => (
        <div
          key={chip}
          style={{
            width: '120px',
            height: '110px',
            background: '#0b1120',
            border: '2px solid #334155',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)',
          }}
        >
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, letterSpacing: '1px' }}>
            DDR5 IC
          </div>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: active ? color : '#334155',
              marginTop: '12px',
              boxShadow: active ? `0 0 10px ${color}` : 'none',
            }}
          />
        </div>
      ))}

      {/* Gold Edge Connector Pins */}
      <div
        style={{
          position: 'absolute',
          bottom: '-12px',
          left: '20px',
          right: '20px',
          height: '12px',
          background: 'repeating-linear-gradient(90deg, #eab308, #eab308 6px, #0f172a 6px, #0f172a 12px)',
          borderRadius: '0 0 4px 4px',
        }}
      />
    </div>
  );
};
