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
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                MESSAGES?.map((message) => (
                    <View key={message?.id}>
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