import { Tabs } from "expo-router";

const RootLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ headerShown: false }} />
            <Tabs.Screen name="chat" options={{ headerShown: false }} />
            <Tabs.Screen name="status" options={{ headerShown: false }} />
            <Tabs.Screen name="calls" options={{ headerShown: false }} />
            <Tabs.Screen name="profile" options={{ headerShown: false }} />
            <Tabs.Screen name="settings" options={{ headerShown: false }} />
        </Tabs>
    );
};

export default RootLayout;
