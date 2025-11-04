import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HapticTab } from '@/components/haptic-tab';
import { CameraButton } from '@/components/camera-button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';



export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export default function TabLayout() {
    const { colorScheme } = useColorScheme();
   

    return (

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarButton: HapticTab,
                animation: "shift"
            }}   
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({color, size}) => <Ionicons name="home" color={color} size={size}/>

                }}
            />

            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({color, size}) => <Entypo name="magnifying-glass" color={color} size={size}/>
                }}
            />

            <Tabs.Screen
                name="camera"
                options={{
                    title: "Camera",
                    tabBarButton: CameraButton,
                }}
            />

            <Tabs.Screen
                name="tokens"
                options={{
                    title: "Tokens",
                    tabBarIcon: ({color, size}) => <MaterialIcons name="stars" color={color} size={size}/>
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({color, size}) => <Ionicons name="person" color={color} size={size}/>
                }}
            />


        </Tabs>
    );
}
