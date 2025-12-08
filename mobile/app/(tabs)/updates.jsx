import { Text, View } from "react-native";
import { SearchInput } from "../../components/ui/searchInput";
import { RoundedBtn } from "../../components/ui/roundedBtn";
import { StatusPanel } from "../../components/status/statusPanel";

const Updates = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                paddingTop: 40
            }}
        >
            <View>
                <RoundedBtn
                    iconName="ellipsis-horizontal"
                />
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        marginVertical: 10
                    }}
                >Updates
                </Text>
                <SearchInput />
            </View>
            <StatusPanel />
        </View>
    );
};

export default Updates;
