import React from 'react';
import { Composition } from 'remotion';
import { RamExplainer } from './RamExplainer';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RamExplainer"
        component={RamExplainer}
        durationInFrames={1650} // 55 seconds at 30 fps
        fps={30}
        width={1080}
        height={1920} // 9:16 Vertical Short
        defaultProps={{
          title: "What RAM Actually Does In Your Computer?",
          primaryColor: "#38bdf8",
          secondaryColor: "#6366f1",
          accentColor: "#ec4899",
        }}
      />
    </>
  );
};
