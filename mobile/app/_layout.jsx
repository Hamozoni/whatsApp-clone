import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function RootLayout() {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn) {
            router.replace("/chats");
        }
    }, []);
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)/chats" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
    );
}