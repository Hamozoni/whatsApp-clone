import { Text, View } from "react-native";
import { SearchInput } from "../../components/ui.jsx/searchInput";
import { RoundedBtn } from "../../components/ui.jsx/roundedBtn";


const Updates = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10, paddingTop: 40 }}>
            <View>
                <RoundedBtn IconName="ellipsis-horizontal" />
                <Text style={{ fontSize: 30, fontWeight: "bold", marginVertical: 10 }}>Updates</Text>
                <SearchInput />
            </View>
        </View>
    );
};

export default Updates;
