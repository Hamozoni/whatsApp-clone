import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MessageStatusBubble({ status, timestamp }) {
    return (

        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 5
            }}
        >
            <Text style={{ fontSize: 12 }}>{timestamp}</Text>
            <View>
                {
                    status === "sent" ? (
                        <Ionicons name="checkmark-sharp" size={14} color="black" />
                    ) : status === "delivered" || status === "readed" ? (
                        <Ionicons name="checkmark-done-sharp" size={14} color={status === "delivered" ? "black" : "green"} />
                    ) : (
                        <Ionicons name="stopwatch-outline" size={14} color="black" />

                    )
                }
            </View>

        </View>
    );
};