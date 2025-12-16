import { Image, Text, View, ImageBackground, StyleSheet } from "react-native";

export const StatusCard = ({ status }) => {


    const MediaCard = ({ children }) => {
        return (
            <ImageBackground
                source={status?.photoURL}
                resizeMode="cover"
                style={styles.container}
            >{children}
            </ImageBackground>
        );
    };


    const TextCard = ({ children }) => {
        return (
            <View style={[styles.container, { backgroundColor: status?.bgColor }]}>
                <View style={{ padding: 10, position: "absolute", bottom: 0, left: 0, top: 0, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                    <Text
                        style={{ fontSize: 10, fontWeight: "bold", color: status?.textColor, textAlign: "center", width: "100%" }}>{status?.text}</Text>
                </View>
                {children}
            </View>
        );
    };

    const CardContainer = () => {
        return (
            <>
                <View style={{ borderRadius: "50%", borderWidth: 2, borderColor: "#fff", width: 44, height: 44 }}>
                    <Image
                        source={status?.contact?.photoURL}
                        style={{ width: 40, height: 40, borderRadius: "50%" }}
                    />
                </View>
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 5 }}>{status?.contact?.name}</Text>
            </>
        );
    };
    if (status?.type === 'text') {
        return <TextCard>
            <CardContainer />
        </TextCard>
    }
    return <MediaCard>
        <CardContainer />
    </MediaCard>
};

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 180,
        padding: 5,
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        overflow: "hidden",
    }
});