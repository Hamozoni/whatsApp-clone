
import { View, TextInput, Pressable, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const Button = ({ title }) => {
    return (
        <Pressable
            style={{
                paddingHorizontal: 15,
                backgroundColor: "#eeeeeeff",
                borderRadius: 15,
                borderColor: "#ccc",
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginRight: 5
            }}>
            <Text style={{ color: "gray", fontSize: 18, fontWeight: "medium" }}>{title}</Text>
        </Pressable>
    );
}

const Chats = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10, paddingTop: 40 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Pressable style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#eeeeeeff", justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="ellipsis-horizontal" size={26} />
                </Pressable>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Pressable >
                        <Ionicons name="camera" size={26} />
                    </Pressable>
                    <Pressable style={{ marginLeft: 10, width: "auto", height: "auto", borderRadius: "50%", backgroundColor: "green", justifyContent: "center", alignItems: "center" }}>
                        <Ionicons name="add" size={26} color="white" />
                    </Pressable>

                </View>
            </View>
            <Text style={{ fontSize: 30, fontWeight: "bold", marginVertical: 10 }}>Chats</Text>
            <View style={{
                height: 40,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 20,
                marginBottom: 5,
                flexDirection: "row",
                paddingHorizontal: 10,
                alignItems: "center",
            }}>
                <Ionicons name="search" size={26} color="gray" />
                <TextInput
                    placeholder="Search"
                    style={{
                        flex: 1,
                        fontSize: 18,
                        fontWeight: "medium",
                        color: "gray",
                    }}

                />
            </View>

            <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: 50 }} showsHorizontalScrollIndicator={false}>
                <Button title="All" />
                <Button title="Unread" />
                <Button title="Favorite" />
                <Button title="Groups" />
                <Button title="Communities" />
            </ScrollView>

        </View>
    );
};

export default Chats; 