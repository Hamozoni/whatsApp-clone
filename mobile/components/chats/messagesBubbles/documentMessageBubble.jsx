import MessageStatusBubble from "./messageStatusBubble";
import { Image, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DocumentMessageBubble({ message }) {
    return (
        <View>
            <TouchableOpacity style={{ borderRadius: 10, overflow: "hidden", backgroundColor: "#0000001f", paddingBottom: 10, marginBottom: 5 }} >
                <Image
                    source={message?.metadata?.url}
                    style={{ width: 220, height: 70, overflow: "hidden" }}
                />
                <View style={{ paddingTop: 10, flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Ionicons name="document-text-outline" size={34} color="#f54848ff" />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "500" }}>{message?.metadata?.name}</Text>
                        <Text style={{ fontSize: 12, fontWeight: "500" }}>{message?.metadata?.size}MB {message?.metadata?.mimeType.split("/")[1]}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <MessageStatusBubble message={message} />
        </View>
    );
};