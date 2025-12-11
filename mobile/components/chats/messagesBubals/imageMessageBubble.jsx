
import { Image, TouchableOpacity } from "react-native";

export default function ImageMessageBubble({ message }) {
    return (
        <TouchableOpacity >
            <Image
                source={message?.metadata?.url}
                style={{ width: 250, height: 250, borderRadius: 10, objectFit: "cover" }}
            />
        </TouchableOpacity>
    );
};