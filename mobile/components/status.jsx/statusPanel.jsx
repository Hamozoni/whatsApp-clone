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
                    <View>

                    </View>
                </ScrollView>
            </View>
        </View>
    );
};