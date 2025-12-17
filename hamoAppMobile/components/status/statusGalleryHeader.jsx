import { Dimensions, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

const width = Dimensions.get("window").width;

const maxTime = 5

const StatusGalleryHeader = ({ status, statusIndex, handleNext, setStatusIndex }) => {

    const router = useRouter();

    const [time, setTime] = useState(0);

    const { index } = useLocalSearchParams();

    useEffect(() => {

        setTime(0);
        const timer = setInterval(() => {

            setTime((prevTime) => {
                if (prevTime === maxTime && statusIndex < status?.statuses?.length) {
                    handleNext();
                }
                if (prevTime < maxTime) {
                    return prevTime + 0.5;
                }
                return 0;
            });
        }, 500);

        return () => {
            setStatusIndex(0)
            setTime(0);
            clearInterval(timer)
        };
    }, [index]);


    return (
        <View style={{ width, paddingHorizontal: 10, zIndex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                {
                    status?.statuses?.map((status, index, s) => (
                        <View key={status.id} style={{ flex: 1, width: (width / s.length - 20), height: 8, backgroundColor: "#201d1dff", borderRadius: 5 }}>
                            <View
                                style={{
                                    width: index === statusIndex ? `${time / maxTime * 100}%` : index < statusIndex ? "100%" : "0%",
                                    height: 8,
                                    backgroundColor: "#afafafff",
                                    borderRadius: 5
                                }}
                            ></View>
                        </View>
                    ))
                }
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name="chevron-back"
                        size={32} color="black"
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, flex: 1 }}>
                    <Image source={status.photoURL} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                    <View>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{status.name}</Text>
                        <Text style={{ fontSize: 12, color: "#8e8e8eff" }}>{status?.statuses[statusIndex]?.createdAt}</Text>
                    </View>
                </View>
                <Ionicons name="ellipsis-vertical" size={28} color="black" />
            </View>
        </View>
    );
};
export default StatusGalleryHeader;