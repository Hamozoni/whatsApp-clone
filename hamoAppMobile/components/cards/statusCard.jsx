import { Image, Text, View, ImageBackground } from "react-native";

export const StatusCard = ({ status }) => {
    return (
        <ImageBackground
            source={status?.photoURL}
            resizeMode="cover"
            style={{
                width: 90,
                height: 180,
                padding: 10,
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "#ccc",
                overflow: "hidden",
            }}
        >
            <View>
                <Image
                    source={status?.contact?.photoURL}
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
            </View>
            <Text>{status?.contact?.name}</Text>
        </ImageBackground>
    );
};