
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export const MessageStatus = ({ status }) => {
    return (
        <View>
            {
                status === "sent" ? (
                    <Ionicons name="checkmark" size={24} color="green" />
                ) : status === "delivered" ? (
                    <Ionicons name="delivered" size={24} color="green" />
                ) : (
                    <Ionicons name="watch" size={24} color="red" />
                )
            }
        </View>
    );
};
export const TextMessageCard = ({ message }) => {
    return (
        <View>
            <Text>{message?.text}</Text>
            <View>
                <Text>{message?.timestamp}</Text>
                <MessageStatus status={message?.status} />
            </View>
        </View>
    );
};

export const ImageMessageCard = ({ message }) => {
    return (
        <View>
            <Image
                source={{ uri: message?.metadata?.url, width: 150, height: 200 }}
                style={{ width: 200, height: 200 }}
            />
            <View>
                <Text>{message?.timestamp}</Text>
                <MessageStatus status={message?.status} />
            </View>
        </View>
    );
};

export const VideoMessageCard = ({ message }) => {
    return (
        <View>
            <Image
                source={{ uri: message?.metadata?.thumbnailUrl }}
                style={{ width: 200, height: 200 }}
            />
            <View>
                <Text>{message?.timestamp}</Text>
                <MessageStatus status={message?.status} />
            </View>
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
            <View>
                <Text>{message?.timestamp}</Text>
                <MessageStatus status={message?.status} />
            </View>
        </View>
    );
};

export const LocationMessageCard = ({ message }) => {
    return (
        <View>
            <Text>{message?.metadata?.displayName}</Text>
            <View>
                <Text>{message?.timestamp}</Text>
                <MessageStatus status={message?.status} />
            </View>
        </View>
    );
};

export const CallMessageCard = ({ message }) => {
    return (
        <View>
            <Text>{message?.metadata?.callee?.displayName}</Text>
            <View>
                <Text>{message?.timestamp}</Text>
                <MessageStatus status={message?.status} />
            </View>
        </View>
    );
};




