import { View, Text } from "react-native";
import { MESSAGES } from "../../constants/messages";
import {
    TextMessageCard,
    ImageMessageCard,
    VideoMessageCard,
    ContactMessageCard,
    LocationMessageCard,
    CallMessageCard,
    DocumentMessageCard
} from "../cards/messageCards";

import AudioMessageCard from "./messages/audioMessageCard";
import { ScrollView } from "react-native";

export default function ChatMessages() {

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                MESSAGES?.map((message) => (
                    <View key={message?.id}>
                        {
                            message?.type === "text" ? (
                                <TextMessageCard message={message} />
                            ) : message?.type === "image" ? (
                                <ImageMessageCard message={message} />
                            ) : message?.type === "video" ? (
                                <VideoMessageCard message={message} />
                            ) : message?.type === "contact" ? (
                                <ContactMessageCard message={message} />
                            ) : message?.type === "location" ? (
                                <LocationMessageCard message={message} />
                            ) : message?.type === "call" ? (
                                <CallMessageCard message={message} />
                            ) : message?.type === "audio" ? (
                                <AudioMessageCard message={message} />
                            ) : message?.type === "sticker" ? (
                                <ImageMessageCard message={message} />
                            ) : message?.type === "document" ? (
                                <DocumentMessageCard message={message} />
                            ) : null
                        }

                    </View>
                ))

            }
        </ScrollView>
    );
}