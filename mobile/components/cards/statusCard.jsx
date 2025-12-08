import { Image, Text, View } from "react-native";

export const StatusCard = ({ status }) => {
    return (
        <View style={{ backgroundImage: `url(${status?.photoURL})`, width: 90, height: 180, borderRadius: 15, borderWidth: 1, borderColor: "#ccc" }}>
            <View>
                <Image
                    source={status?.contact?.photoURL}
                    style={{ width: 60, height: 60, borderRadius: 50 }}
                />
            </View>
            <Text>{status?.contact?.name}</Text>
        </View>
    );
};