
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export const MessageStatus = ({ status, timestamp }) => {
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
export const TextMessageCard = ({ message }) => {
    return (
        <View>
            <Text>{message?.text}</Text>
            <MessageStatus
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
};


export const ImageMessageCard = ({ message }) => {
    return (
        <View>
            <Image
                resizeMode="contain"
                source={message?.metadata?.url}
                style={{ width: 150, height: 200 }}


            />
            <MessageStatus
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
};

export const VideoMessageCard = ({ message }) => {
    return (
        <View>
            <Image
                source={message?.metadata?.thumbnailUrl}
                style={{ width: 200, height: 200 }}
            />
            <MessageStatus
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
};

// export const DocumentMessageCard = ({ message }) => {
//     return (
//         <View>
//             <Document
//                 source={{ uri: message?.document }}
//                 style={{ width: 200, height: 200 }}
//             />
//             <View>
//                 <Text>{message?.timestamp}</Text>
//                 <MessageStatus status={message?.status} />
//             </View>
//         </View>
//     );
// };
// export const StickerMessageCard = ({ message }) => {
//     return (
//         <View>
//             <Sticker
//                 source={{ uri: message?.sticker }}
//                 style={{ width: 200, height: 200 }}
//             />
//             <View>
//                 <Text>{message?.timestamp}</Text>
//                 <MessageStatus status={message?.status} />
//             </View>
//         </View>
//     );
// };

export const ContactMessageCard = ({ message }) => {
    return (
        <View>

            <Text>{message?.metadata?.displayName}</Text>
            <MessageStatus
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
};

export const LocationMessageCard = ({ message }) => {
    return (
        <View>
            <Text>{message?.metadata?.displayName}</Text>
            <MessageStatus
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
};

export const CallMessageCard = ({ message }) => {
    return (
        <View>
            <Text>{message?.metadata?.callee?.displayName}</Text>
            <MessageStatus
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
};




