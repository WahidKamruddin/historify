import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import ARTestScene from '@/components/ARTestScene';

const Camera = () => {
  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        initialScene={{ scene: ARTestScene }}
        style={styles.arView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  arView: { flex: 1 }
});

export default Camera;
