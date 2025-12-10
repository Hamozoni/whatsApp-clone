import MessageStatusBubble from "./messageStatusBubble";
import { Image, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function VideoMessageBubble({ message }) {
    return (
        <TouchableOpacity>
            <Image
                source={message?.metadata?.thumbnailUrl}
                style={{ width: 150, height: 150, borderRadius: 10 }}
            />
            <MessageStatusBubble
                message={message}
            />
            <View style={{ position: "absolute", top: 0, left: 0, width: 150, height: 150, justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="play" size={54} color="white" />
            </View>
        </TouchableOpacity>
    );
};
