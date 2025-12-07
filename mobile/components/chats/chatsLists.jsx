import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

const ChatCard = ({ chat }) => {
    return (
        <TouchableOpacity style={{ flexDirection: "row", flex: 1, alignItems: "center", gap: 5 }}>
            <View>
                <Image
                    source={{ uri: chat?.contact?.photoURL }}
                    style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: "gray" }}

                />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{chat?.contact?.displayName}</Text>
                    <Text style={{ fontSize: 12, color: "#817d7dff", fontWeight: "bold" }}>{chat?.lastMessage?.createdAt}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, color: "#5e5e5eff" }}>{chat?.lastMessage?.text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const ChatsLists = ({ chats }) => {
    return (
        <FlatList
            data={chats}
            renderItem={({ item }) => (<ChatCard key={item.id} chat={item} />)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 10 }}
            showsVerticalScrollIndicator={false}
        />
    );
};
export default ChatsLists;
