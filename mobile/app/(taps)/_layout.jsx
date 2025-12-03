import { Tabs } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
const RootLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#000",
                tabBarInactiveTintColor: "#666",
                tabBarLabelPosition: "below-icon",
                tabBarActiveBackgroundColor: "#eee",
            }}
        >
            <Tabs.Screen
                name="updates"
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                name="calls"
                options={{
                    headerShown: false,
                    title: "Calls",
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons name={focused ? "call" : "callOutline"} size={size} color={color} />
                    )

                }} />
            <Tabs.Screen
                name="communiies"
                options={{
                    headerShown: false,
                    title: "Communiies",
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons name={focused ? "groups" : "groups-outline"} size={size} color={color} />
                    )
                }}

            />

            <Tabs.Screen
                name="chats"
                options={{
                    headerShown: false,
                    title: "Chats",
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialIcons name={focused ? "chatbubble" : "chatbubble-outline"} size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: false,
                    title: "Settings",
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons name={focused ? "settings" : "settingsOutline"} size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    );
};

export default RootLayout;
