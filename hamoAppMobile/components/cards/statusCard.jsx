import { Image, Text, View, ImageBackground } from "react-native";

export const StatusCard = ({ status }) => {
    return (
        <ImageBackground
            source={status?.photoURL}
            resizeMode="cover"
            style={{
                width: 100,
                height: 180,
                padding: 5,
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "#ccc",
                overflow: "hidden",
            }}
        >
            <View style={{ borderRadius: "50%", borderWidth: 2, borderColor: "#fff", width: 44, height: 44 }}>
                <Image
                    source={status?.contact?.photoURL}
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
            </View>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 5 }}>{status?.contact?.name}</Text>
        </ImageBackground>
    );
};