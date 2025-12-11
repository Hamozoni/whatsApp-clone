import { Image, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function VideoMessageBubble({ message }) {
    return (
        <TouchableOpacity>
            <Image
                source={message?.metadata?.thumbnailUrl}
                style={{ width: 250, height: 250, borderRadius: 10, objectFit: "cover" }}
            />
            <View style={{ position: "absolute", top: 0, left: 0, width: 250, height: 250, justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="play" size={54} color="white" />
            </View>
        </TouchableOpacity>
    );
};
