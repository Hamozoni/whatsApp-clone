
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CHATS } from "../../constants/chats";
import ChatsLists from "../../components/chats/chatsLists";
import { SearchInput } from "../../components/ui.jsx/searchInput";


const Button = ({ title }) => {
    return (
        <TouchableOpacity
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
        </TouchableOpacity>
    );
}

const Chats = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10, paddingTop: 40 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#eeeeeeff", justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="ellipsis-horizontal" size={26} />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity >
                        <Ionicons name="camera" size={26} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10, width: "auto", height: "auto", borderRadius: "50%", backgroundColor: "green", justifyContent: "center", alignItems: "center" }}>
                        <Ionicons name="add" size={26} color="white" />
                    </TouchableOpacity>

                </View>
            </View>
            <Text style={{ fontSize: 30, fontWeight: "bold", marginVertical: 10 }}>Chats</Text>
            <SearchInput />
            <View >
                <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 0, height: 50, maxHeight: 50, paddingBottom: 10 }} showsHorizontalScrollIndicator={false}>
                    <Button title="All" />
                    <Button title="Unread" />
                    <Button title="Favorite" />
                    <Button title="Groups" />
                    <Button title="Communities" />
                </ScrollView>

            </View>
            <ChatsLists chats={CHATS} />

        </View>
    );
};

export default Chats; 