import { ScrollView } from "react-native";

export const StatusPanel = () => {
    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Status</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <RoundedBtn IconName="camera" />
                    <RoundedBtn IconName="add" />
                </View>
            </View>
            <View>
                <ScrollView>
                    <View style={{ width: 100, height: 200, borderRadius: 10, borderWidth: 1, borderColor: "#ccc" }}>
                        <View>
                            <Image source={require("../../assets/icon.png")}
                                style={{ width: 60, height: 60, borderRadius: 50 }}
                            />
                            <RoundedBtn IconName="add" />
                        </View>
                        <Text>Add Status </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};