import { Image, KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import StatusGalleryHeader from "../status/statusGalleryHeader";
import { RoundedBtn } from "../ui/roundedBtn";
import { Dimensions } from "react-native";
import VideoPlayer from "../mediaGallery/videoPlayer";
import ZoomableImage from "../mediaGallery/zoomableImage";
import { useState } from "react";
const { width, height } = Dimensions.get("window");
export default function StatusGalleryCard({ status }) {


    const [statusIndex, setStatusIndex] = useState(0);

    return (
        <View style={{ flex: 1, width: "100%", flexDirection: "column" }}>
            <StatusGalleryHeader status={status} />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {
                    status[statusIndex]?.type === "image" ? (
                        <ZoomableImage url={status[statusIndex]?.photoURL} />
                    ) : status[statusIndex]?.type === "video" ? (
                        <VideoPlayer url={status[statusIndex]?.videoURL} />
                    ) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: status[statusIndex]?.bgColor }}>
                        <Text style={{ color: status[statusIndex]?.textColor }}>{status[statusIndex]?.text}</Text>
                    </View>
                }
            </View>
            <KeyboardAvoidingView keyboardVerticalOffset="50" behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 10 }}>
                    <View style={{ padding: 10, borderWidth: 2, borderColor: "#d4d4d4ff", borderRadius: 20, flex: 1, backgroundColor: "#fff" }}>
                        <TextInput placeholder="Reply" style={{ fontSize: 16, width: "100%" }} />
                    </View>
                    <RoundedBtn iconName="heart-outline" large={true} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}