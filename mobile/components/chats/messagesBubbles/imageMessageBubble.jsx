
import MessageStatusBubble from "./messageStatusBubble";
import { Image, View } from "react-native";

export default function ImageMessageBubble({ message }) {
    return (
        <View>
            <Image
                resizeMode="contain"
                source={message?.metadata?.url}
                style={{ width: 150, height: 150, borderRadius: 10 }}


            />
            <MessageStatusBubble
                message={message}
            />
        </View>
    );
};