import { FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from "react-native";
import StatusGalleryHeader from "../status/statusGalleryHeader";
import { RoundedBtn } from "../ui/roundedBtn";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export default function StatusGalleryCard({ status }) {
    return (
        <View style={{ flex: 1, width: "100%", flexDirection: "column", justifyContent: "space-between" }}>
            <StatusGalleryHeader status={status} />

            <View style={{ flex: 1 }}>
                {
                    status?.map((status) => (
                        <Image key={status.id} source={status.contact.photoURL} style={{ width, height }} />
                    ))
                }
            </View>
            <KeyboardAvoidingView keyboardVerticalOffset="50" behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 10 }}>
                    <View style={{ padding: 10, borderWidth: 2, borderColor: "#d4d4d4ff", borderRadius: 20, flex: 1 }}>
                        <TextInput placeholder="Reply" style={{ fontSize: 16, width: "100%" }} />
                    </View>
                    <RoundedBtn iconName="heart-outline" large={true} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}