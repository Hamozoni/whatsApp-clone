import MessageStatusBubble from "./messageStatusBubble";
import { Image, View } from "react-native";

export default function DocumentMessageBubble({ message }) {
    return (
        <View>
            <View style={{ height: 180, overflow: "hidden" }}>
                <Image
                    source={message?.metadata?.url}
                    style={{ width: 180, height: 40, overflow: "hidden" }}
                />
            </View>
            <MessageStatusBubble status={message?.status} timestamp={message?.timestamp} />
        </View>
    );
};