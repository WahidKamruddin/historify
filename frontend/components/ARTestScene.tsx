import React from 'react';
import { ViroARScene, ViroText } from '@reactvision/react-viro';

const ARTestScene = () => {
  return (
    <ViroARScene>
      <ViroText
        text="Hello AR!"
        position={[0, 0, -1]} // 1 meter in front of the camera
        style={{ fontSize: 30, color: '#ffffff' }}
      />
    </ViroARScene>
  );
};

export default ARTestScene;
