
import MessageStatusBubble from "./messageStatusBubble";
import { Text, View } from "react-native";

export default function TextMessageBubble({ message }) {
    return (
        <View>
            <Text>{message?.text}</Text>
            <MessageStatusBubble
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
};