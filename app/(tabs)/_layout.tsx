import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === 'dark' ? 'green' : 'red';
    const tabBarBackgroundColor = colorScheme === 'dark' ? 'red' : 'green';
    const titleStyle = { color: 'yellow' };

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: iconColor,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                        backgroundColor: tabBarBackgroundColor,
                    },
                    android: {
                        backgroundColor: tabBarBackgroundColor,
                    },
                    default: {
                        backgroundColor: tabBarBackgroundColor,
                    },
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Explore',
                    tabBarLabelStyle: titleStyle,
                    tabBarIcon: () => (
                        <IconSymbol size={28} name="paperplane.fill" color={iconColor} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Home',
                    tabBarLabelStyle: titleStyle,
                    tabBarIcon: () => (
                        <IconSymbol size={28} name="house.fill" color={iconColor} />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: 'Profile',
                    tabBarLabelStyle: titleStyle,
                    tabBarIcon: () => (
                        <IconSymbol size={28} name="user" color={iconColor} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'About',
                    tabBarLabelStyle: titleStyle,
                    tabBarIcon: () => (
                        <IconSymbol size={28} name="information" color={iconColor} />
                    ),
                }}
            />
        </Tabs>
    );
}
