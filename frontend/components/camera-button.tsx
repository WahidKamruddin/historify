import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet, TouchableOpacity } from 'react-native';

export function CameraButton(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props} style={styles.button}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        props.onPressIn?.(ev);
      }}
    ><Ionicons name="camera" size={30} color="#fff" /></PlatformPressable> 
  );
}

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		top: -20,
		left: '50%',
		transform: [{ translateX: -40 }],
		backgroundColor: '#4F46E5',
		borderRadius: 24,
		width: 80,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'
	}
});