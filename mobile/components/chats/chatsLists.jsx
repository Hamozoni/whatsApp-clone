import { View, Text } from "react-native";
const ChatCard = () => {
    return (
        <View>
            <View>\
                <Image source={require("../assets/images/1.jpg")} />
            </View>
            <View>
                <Text>homozoni</Text>
                <Text>9:00 AM</Text>
            </View>
            <View>
                <Text>hi</Text>
            </View>
        </View>
    );
};

const ChatsLists = () => {
    return (
        <View>
            <Text>ChatsLists</Text>
        </View>
    );
};
export default ChatsLists;
