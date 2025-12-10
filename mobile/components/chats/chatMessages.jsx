import { ScrollView } from "react-native";
import { View } from "react-native";
import { MESSAGES } from "../../constants/messages";
import {
    TextMessageBubble,
    ImageMessageBubble,
    VideoMessageBubble,
    ContactMessageBubble,
    LocationMessageBubble,
    CallMessageBubble,
    DocumentMessageBubble,
    AudioMessageBubble
} from "./messagesBubbles";

export default function ChatMessages() {

    return (
        <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
            {
                MESSAGES?.map((message) => (
                    <View
                        style={{
                            marginVertical: 2,
                            backgroundColor: message?.type === "sticker" ? "unset" : message?.senderId === 1 ? "#007AFF" : "#E5E5EA",
                            borderRadius: 10,
                            padding: 5,
                            width: "fit-content",
                            minWidth: 30,
                            maxWidth: "88%",
                            alignSelf: message?.senderId === 1 ? "flex-end" : "flex-start",
                        }}
                        key={message?.id}
                    >
                        {
                            message?.type === "text" ? (
                                <TextMessageBubble message={message} />
                            ) : message?.type === "image" ? (
                                <ImageMessageBubble message={message} />
                            ) : message?.type === "video" ? (
                                <VideoMessageBubble message={message} />
                            ) : message?.type === "contact" ? (
                                <ContactMessageBubble message={message} />
                            ) : message?.type === "location" ? (
                                <LocationMessageBubble message={message} />
                            ) : message?.type === "call" ? (
                                <CallMessageBubble message={message} />
                            ) : message?.type === "audio" ? (
                                <AudioMessageBubble message={message} />
                            ) : message?.type === "sticker" ? (
                                <ImageMessageBubble message={message} />
                            ) : message?.type === "document" ? (
                                <DocumentMessageBubble message={message} />
                            ) : ""
                        }

                    </View>
                ))

            }
        </ScrollView>
    );
}