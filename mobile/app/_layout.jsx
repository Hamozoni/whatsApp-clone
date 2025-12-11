import { Stack } from "expo-router";
import { ChatHeaderLeft, ChatHeaderRight, ChatHeaderMiddle } from "../components/chats/chatHeader";

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="chat"
                options={
                    ({ route }) => {
                        const { id } = route.params;
                        return {
                            headerShown: true,
                            headerLeft: () => <ChatHeaderLeft id={id} />,
                            headerRight: () => <ChatHeaderRight id={id} />,
                            headerTitle: () => <ChatHeaderMiddle id={id} />,
                        }

                    }
                }
            />
        </Stack>
    );
}