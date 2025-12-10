import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MessageStatusBubble({ message }) {
    return (

        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 5
            }}
        >
            <Text style={{ fontSize: 10, fontFamily: "Poppins_400Regular", fontWeight: "bold", color: message?.senderId === 1 ? "#ccc" : "#1b1d1bff" }}>{message?.timestamp}</Text>
            <View>
                {
                    message?.status === "sent" ? (
                        <Ionicons name="checkmark-sharp" size={16} color={message?.senderId === 1 ? "#ccc" : "#1b1d1bff"} />
                    ) : message?.status === "delivered" || message?.status === "readed" ? (
                        <Ionicons name="checkmark-done-sharp" size={16} color={message?.status === "delivered" ? `${message?.senderId === 1 ? "#ccc" : "#1b1d1bff"}` : "green"} />
                    ) : (
                        <Ionicons name="stopwatch-outline" size={16} color={message?.senderId === 1 ? "#ccc" : "#1b1d1bff"} />

                    )
                }
            </View>

        </View>
    );
};