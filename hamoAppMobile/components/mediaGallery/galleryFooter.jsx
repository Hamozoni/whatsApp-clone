import { Text, View } from "react-native";

export default function GalleryFooter() {
    return (
        <View style={{ backgroundColor: "black", opacity: 0.5, padding: 20, paddingTop: 40, zIndex: 3 }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>John Doe</Text>
        </View>
    )
}