import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatFooter from "../../components/chats/chatFooter";
import ChatMessages from "../../components/chats/chatMessages";

export default function ChatDetails() {

    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView
            edges={["bottom"]}
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#fff"
            }}
        >
            <View style={{ flex: 1, backgroundColor: "#fffafaff" }}>
                <ChatMessages />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset="100"
            >
                <ChatFooter id={id} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}