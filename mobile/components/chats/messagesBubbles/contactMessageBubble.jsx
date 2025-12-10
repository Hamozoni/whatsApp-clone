import MessageStatusBubble from "./messageStatusBubble";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ContactMessageBubble({ message }) {
    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Image
                    source={message?.metadata?.photoURL}
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                <View>
                    <Text>{message?.metadata?.displayName}</Text>
                    <Text>{message?.metadata?.phoneNumber}</Text>
                </View>
            </View>

            <MessageStatusBubble
                message={message}
            />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center" }}>
                <TouchableOpacity>
                    <Text>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Add contact</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};