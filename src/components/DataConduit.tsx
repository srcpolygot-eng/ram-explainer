import React from 'react';

interface DataConduitProps {
  frame: number;
  color: string;
}

export const DataConduit: React.FC<DataConduitProps> = ({ frame, color }) => {
  return (
    <div
      style={{
        flex: 1,
        height: '14px',
        margin: '0 30px',
        background: '#1e293b',
        borderRadius: '7px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const offset = ((frame * 6 + i * 80) % 400) / 4;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '2px',
              left: `${offset}%`,
              width: '30px',
              height: '10px',
              borderRadius: '5px',
              background: `linear-gradient(90deg, transparent, ${color})`,
              boxShadow: `0 0 12px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
