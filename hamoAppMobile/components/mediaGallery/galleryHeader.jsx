import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function GalleryHeader() {
    const router = useRouter();
    return (
        <View style={{ backgroundColor: "black", opacity: 0.5, padding: 20, paddingTop: 40, zIndex: 3 }}>
            <View style={{ flexDirection: "row", alignItems: "center", }}>
                <TouchableOpacity onPress={() => { router.back() }}>
                    <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>John Doe</Text>
                        <Text style={{ color: "white", fontSize: 12 }}>12/12/2025,12:34</Text>
                    </View>
                    <Ionicons name="pencil" size={20} color="white" />
                </View>
            </View>
        </View>
    )
}