import MessageStatusBubble from "./messageStatusBubble";
import { Image, View } from "react-native";

export default function VideoMessageBubble({ message }) {
    return (
        <View>
            <Image
                source={message?.metadata?.thumbnailUrl}
                style={{ width: 200, height: 200 }}
            />
            <MessageStatusBubble
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
};
