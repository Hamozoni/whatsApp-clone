
import { View, TextInput, Pressable, Text, Button, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";


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
                paddingHorizontal: 10,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
            }}>
                <Ionicons name="search" size={26} color="gray" />
                <TextInput
                    placeholder="Search"

                />
            </View>

            <ScrollView horizontal>
                <Button title="All" style={{ marginHorizontal: 5 }} />
                <Button title="Unread" style={{ marginHorizontal: 5 }} />
                <Button title="Favorite" style={{ marginHorizontal: 5 }} />
                <Button title="Groups" style={{ marginHorizontal: 5 }} />
                <Button title="Communities" style={{ marginHorizontal: 5 }} />
            </ScrollView>

        </View>
    );
};

export default Chats; 