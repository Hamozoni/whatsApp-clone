import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const RoundedBtn = ({ IconName }) => {
    return (
        <TouchableOpacity
            style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#eeeeeeff", justifyContent: "center", alignItems: "center" }}>
            <Ionicons name={IconName} size={26} />
        </TouchableOpacity>
    );
};