
import MessageStatusBubble from "./messageStatusBubble";
import { Image, View } from "react-native";

export default function ImageMessageBubble({ message }) {
    return (
        <View>
            <Image
                resizeMode="contain"
                source={message?.metadata?.url}
                style={{ width: 150, height: 200 }}


            />
            <MessageStatusBubble
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
};