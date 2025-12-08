import { Slot, Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
    );
}