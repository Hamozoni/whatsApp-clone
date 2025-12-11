
import { Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ImageMessageBubble({ message }) {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.push("/chat/mediaGallery")} >
            <Image
                source={message?.metadata?.url}
                style={{ width: 250, height: 250, borderRadius: 10, objectFit: "cover" }}
            />
        </TouchableOpacity>
    );
};