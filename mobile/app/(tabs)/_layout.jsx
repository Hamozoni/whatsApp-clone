import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RootLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="updates"
                options={{
                    headerShown: false,
                    title: "Updates",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "notifications" : "notifications-outline"} size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="calls"
                options={{
                    headerShown: false,
                    title: "Calls",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "call" : "call-outline"} size={size} color={color} />
                    )

                }} />
            <Tabs.Screen
                name="communiies"
                options={{
                    headerShown: false,
                    title: "Communiies",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "people" : "people-outline"} size={size} color={color} />
                    )
                }}

            />

            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Chats",
                    tabBarIcon: ({ focused, size, color }) => (
                        <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: true,
                    title: "Settings",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "settings" : "settings-outline"} size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    );
};

export default RootLayout;
