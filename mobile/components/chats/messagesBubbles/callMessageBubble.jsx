
import MessageStatusBubble from "./messageStatusBubble";
import { Text, View } from "react-native";
import { RoundedBtn } from "../../ui/roundedBtn";

export default function CallMessageBubble({ message }) {
    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View>
                    {
                        message?.metadata?.type === "video" ? (
                            <RoundedBtn
                                iconName="videocam"
                            />
                        ) : (
                            <RoundedBtn
                                iconName="call"
                            />
                        )
                    }
                </View>
                <View>
                    <Text>{message?.metadata?.type === "video" ? "Video Call" : "Voice Call"}</Text>
                    <Text>{message?.metadata?.status === "missed" ? "No Answer" : message?.metadata?.duration}</Text>
                </View>
            </View>
            <MessageStatusBubble
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
};