import { Stack } from "expo-router";
import { ChatHeaderLeft, ChatHeaderMiddle, ChatHeaderRight } from "../components/chats/chatHeader";

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
                name="chat/[id]"
                options={({ route }) => {

                    const id = route.params.id;
                    return {

                        headerLeft: () => <ChatHeaderLeft id={id} />,
                        headerTitle: () => <ChatHeaderMiddle id={id} />,
                        headerRight: () => <ChatHeaderRight id={id} />,


                    }
                }}
            />
        </Stack>
    );
}