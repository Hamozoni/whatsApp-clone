import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatDetails() {

    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView>



        </SafeAreaView>
    );
}