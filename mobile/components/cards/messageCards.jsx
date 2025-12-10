
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
// import Pdf from "react-native-pdf";

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

export const DocumentMessageCard = ({ message }) => {
    return (
        <View>
            <View style={{ height: 180, overflow: "hidden" }}>
                {/* <Pdf
                    source={{ uri: message?.metadata?.url }}
                    page={1}
                    singlePage
                    scale={0.6}
                    style={{ flex: 1 }}
                /> */}
            </View>
            <MessageStatus status={message?.status} timestamp={message?.timestamp} />
        </View>
    );
};

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
    const locationUrl = `https://maps.googleapis.com/maps/api/staticmap?
center=${message?.metadata?.latitude},${message?.metadata?.longitude}
&zoom=16
&size=600x300
&maptype=roadmap
&markers=color:red|${message?.metadata?.latitude},${message?.metadata?.longitude}
&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
    console.log(locationUrl);
    return (
        <TouchableOpacity>
            <Image
                source={{ uri: locationUrl }}
                style={{ width: 200, height: 200 }}
            />
            <MessageStatus
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </TouchableOpacity>
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




