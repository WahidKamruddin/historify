import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import * as FileSystem from 'expo-file-system/legacy';
import ARTestScene from '@/components/ARTestScene';
import useLocation from '@/hooks/useLocation';
import { getFrameInformation } from '@/api/cameraApi';


const Camera = () => {
  const { location, error } = useLocation();
  const [loading, setLoading] = useState(true);
  const [frameInformation, setFrameInformation] = useState(" ");
  const arNavigatorRef = useRef<any>(null);
  


  useEffect(() => {
    if (location) setLoading(true)}, [location]);
  
  if (error) return <View style={styles.center}><Text>{error}</Text></View>;
  if (!location || !loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  const handleCamera = async (image: string) => {
    if (!location) {
      console.error('Location not available');
      return;
    }
    console.log("sending image")
    const response = await getFrameInformation(image, location.lat, location.lng )
    setFrameInformation(response);
    console.log(response);
  }

  const handleScreenshot = async () => {
    if (!arNavigatorRef.current) {
      console.error('AR Navigator ref is not available');
      return;
    }


    try {
      // takeScreenshot returns {success, url, errorCode}
      const result = await arNavigatorRef.current._takeScreenshot('photo', true);
      
      if (!result.success) {
        console.error('Screenshot failed with error code:', result.errorCode);
        return;
      }

      // Read the file and convert to base64 using expo-file-system
      const base64Image = await FileSystem.readAsStringAsync(result.url, {
        encoding: "base64",
      });

      // Pass base64 string to handleCamera
      await handleCamera(base64Image);
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  }

  return (

    <View style={styles.container}>
      <View className='h-3/4'>
        <ViroARSceneNavigator
          ref={arNavigatorRef}
          initialScene={{ scene: ARTestScene }}
          style={styles.arView}
        />
      </View>
      <View
      className='h-64'
         key="screenshot_container"
         style={{
           flex: 1,
           position: 'absolute',
           flexDirection: 'row',
           justifyContent: 'center',
           alignItems: 'center',
           width: 58,
           height: 58,
           bottom: 25,
         }}
       >
         <TouchableOpacity
           key="camera_button"
           onPress={handleScreenshot}    
           style={{ position: 'absolute', bottom: 25, right: 10 }}
         >
           <Text>📷</Text>
         </TouchableOpacity>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  arView: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default Camera;
