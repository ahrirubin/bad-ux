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

    // Function to return a random icon from an array
    const getRandomIcon = () => {
        const icons = ['house.fill', 'paperplane.fill', 'information', 'user'];
        const randomIndex = Math.floor(Math.random() * icons.length);
        return icons[randomIndex];
    };

    // tabBarIcon function that uses random icon each time it renders
    const randomIcon = () => <IconSymbol size={28} name={getRandomIcon()} color={iconColor} />;

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
                    tabBarIcon: randomIcon,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Home',
                    tabBarLabelStyle: titleStyle,
                    tabBarIcon: randomIcon,
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: 'Profile',
                    tabBarLabelStyle: titleStyle,
                    tabBarIcon: randomIcon,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'About',
                    tabBarLabelStyle: titleStyle,
                    tabBarIcon: randomIcon,
                }}
            />
        </Tabs>
    );
}
