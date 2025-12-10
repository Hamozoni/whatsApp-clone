
import MessageStatusBubble from "./messageStatusBubble";
import { Text, View } from "react-native";

export default function TextMessageBubble({ message }) {
    return (
        <View style={{ padding: 10, borderRadius: 10, backgroundColor: "#1807071a" }}>
            <Text style={{ color: message?.senderId === 1 ? "white" : "black", fontSize: 18, marginBottom: 10 }}>{message?.text}</Text>
            <MessageStatusBubble
                message={message}
            />
        </View>
    );
};