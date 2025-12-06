import { View, Text, Image } from "react-native";
const ChatCard = ({ chat }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <View>
                <Image source={{ uri: chat?.contact?.photoURL }} />
            </View>
            <View>
                <View>
                    <Text>{chat?.contact?.displayName}</Text>
                    <Text>{chat?.lastMessage?.createdAt}</Text>
                </View>
                <View>
                    <Text>hi</Text>
                </View>
            </View>
        </View>
    );
};

const ChatsLists = ({ chats }) => {
    return (
        <FileList
            data={chats}
            renderItem={({ item }) => (<ChatCard key={item.id} />)}
        />
    );
};
export default ChatsLists;
