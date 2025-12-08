import { Image, ScrollView, Text, View } from "react-native";
import { RoundedBtn } from "../ui/roundedBtn";
import { STATUSES } from "../../constants/status";
import { StatusCard } from "../cards/statusCard";

export const StatusPanel = () => {
    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Status</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <RoundedBtn iconName="camera" />
                    <RoundedBtn iconName="add" />
                </View>
            </View>
            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 5 }}>
                    <View style={{ width: 90, height: 180, borderRadius: 15, borderWidth: 1, borderColor: "#ccc" }}>
                        <View style={{ padding: 10, alignItems: "center", justifyContent: "center" }}>
                            <Image source={require("../../assets/icon.png")}
                                style={{ width: 60, height: 60, borderRadius: 50 }}
                            />
                            <RoundedBtn iconName="add" />
                        </View>
                        <Text>Add Status </Text>
                    </View>
                    {
                        STATUSES.map((status) => (
                            <StatusCard key={status.id} status={status} />
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    );
};