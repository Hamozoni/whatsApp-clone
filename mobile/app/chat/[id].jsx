import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatFooter from "../../components/chats/chatFooter";
import MessageCard from "../../components/cards/messageCard";
import { FlatList } from "react-native";
import { MESSAGES } from "../../constants/messages";

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
            <View style={{ flex: 1 }}>
                <FlatList
                    data={MESSAGES}
                    renderItem={({ item }) => <MessageCard message={item} />}
                    keyExtractor={(item) => item.id}
                    style={{ padding: 10 }}
                    showsVerticalScrollIndicator={false}
                />
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