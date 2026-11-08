import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { IntroScene } from './scenes/IntroScene';
import { SpeedComparisonScene } from './scenes/SpeedComparisonScene';
import { DataHighwayScene } from './scenes/DataHighwayScene';
import { OutroSummaryScene } from './scenes/OutroSummaryScene';

export interface RamExplainerProps {
  title: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export const RamExplainer: React.FC<RamExplainerProps> = ({
  title,
  primaryColor,
  secondaryColor,
  accentColor,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#020617', color: '#ffffff' }}>
      {/* 55s Synthesized Soundtrack */}
      <Audio src={staticFile('audio/ram_soundtrack_55s.wav')} volume={0.85} />

      {/* Scene 1: The Bottleneck Hook (0s - 14s / Frames 0 - 420) */}
      <Sequence from={0} durationInFrames={420} name="IntroScene">
        <IntroScene
          title={title}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </Sequence>

      {/* Scene 2: SSD vs RAM Latency & Speed Gap (14s - 28s / Frames 420 - 840) */}
      <Sequence from={420} durationInFrames={420} name="SpeedComparisonScene">
        <SpeedComparisonScene
          primaryColor={primaryColor}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Scene 3: The Active Data Highway & Bus Pipeline (28s - 42s / Frames 840 - 1260) */}
      <Sequence from={840} durationInFrames={420} name="DataHighwayScene">
        <DataHighwayScene
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </Sequence>

      {/* Scene 4: Golden Takeaway & System Flow (42s - 55s / Frames 1260 - 1650) */}
      <Sequence from={1260} durationInFrames={390} name="OutroSummaryScene">
        <OutroSummaryScene
          primaryColor={primaryColor}
          accentColor={accentColor}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
