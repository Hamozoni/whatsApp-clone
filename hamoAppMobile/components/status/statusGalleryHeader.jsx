import { Dimensions, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const width = Dimensions.get("window").width;

const StatusGalleryHeader = ({ status }) => {

    const router = useRouter();
    return (
        <View style={{ width, paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                {
                    status?.map((status) => (
                        <View key={status.id} style={{ flex: 1, width: (width / status.length - 20), height: 8, backgroundColor: "#201d1dff", borderRadius: 5 }}>
                        </View>
                    ))
                }
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name="chevron-back"
                        size={32} color="black"
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, flex: 1 }}>
                    <Image source={status[0].contact.photoURL} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                    <View>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{status[0].contact.name}</Text>
                        <Text style={{ fontSize: 12, color: "#8e8e8eff" }}>{status[0].createdAt}</Text>
                    </View>
                </View>
                <Ionicons name="ellipsis-vertical" size={28} color="black" />
            </View>
        </View>
    );
};
export default StatusGalleryHeader;