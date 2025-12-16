import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import DynamicSegmentsImage from "./contactImageCard";
import { useRouter } from "expo-router";

export const StatusCard = ({ status }) => {

    const router = useRouter();
    const MediaCard = ({ children }) => {
        return (
            <ImageBackground
                source={status[0].type === 'image' ? status[0]?.photoURL : status[0]?.thumbnail}
                resizeMode="cover"
                style={styles.container}
            >{children}
            </ImageBackground>
        );
    };


    const TextCard = ({ children }) => {
        return (
            <View style={[styles.container, { backgroundColor: status[0]?.bgColor }]}>
                <View style={{ padding: 10, position: "absolute", bottom: 0, left: 0, top: 0, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                    <Text
                        style={{ fontSize: 10, fontWeight: "bold", color: status[0]?.textColor, textAlign: "center", width: "100%" }}>{status[0]?.text}</Text>
                </View>
                {children}
            </View>
        );
    };

    const CardContainer = () => {
        return (
            <>
                <View style={{ borderRadius: "50%", zIndex: 0, alignSelf: "flex-start" }}>
                    <DynamicSegmentsImage
                        imageUrl={status[0]?.contact?.photoURL}
                        size={40}
                        borderWidth={2}
                        totalStatus={status.length}
                        activeStatus={status.length}
                        activeColor='#4ef16a'
                        gapAngle={15}
                    />
                </View >
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 5 }}>{status[0]?.contact?.name}</Text>
            </>
        );
    };
    if (status[0]?.type === 'text') {
        return (
            <TouchableOpacity onPress={() => router.push(`/statusGallery`)}>
                <TextCard>
                    <CardContainer />
                </TextCard>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity onPress={() => router.push(`/statusGallery`)}>
            <MediaCard>
                <CardContainer />
            </MediaCard>
        </TouchableOpacity>
    )
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