import { ScrollView, Text, View } from "react-native";
import { ProfileInfo } from "../../../components/settings/profileInfo";
import { SearchInput } from "../../../components/ui/searchInput";
import { SettingsCard } from "../../../components/cards/settingsCard";
import { SafeAreaView } from "react-native-safe-area-context";

const settingsData1 = [
    { title: "lists", iconName: "albums-outline", id: 1 },
    { title: "broadcasts messages", iconName: "megaphone-outline", id: 2 },
    { title: "starrd", iconName: "star-outline", id: 3 },
    { title: "linked devices", iconName: "laptop-outline", id: 4 },

];
const settingsData2 = [
    { title: "account", iconName: "person-outline", id: 5 },
    { title: "privacy", iconName: "lock-closed-outline", id: 6 },
    { title: "chats", iconName: "chatbubbles-outline", id: 7 },
    { title: "notifications", iconName: "notifications-outline", id: 8 },
    { title: "storage and data", iconName: "file-tray-stacked-outline", id: 9 },
];

const settingsData3 = [
    { title: "help and feedback", iconName: "help-circle-outline", id: 10 },
    { title: "invite a friend", iconName: "person-add-outline", id: 11 },
];

const Settings = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={["top"]} >
            <ScrollView style={{ padding: 10 }}>
                <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 10 }}>Settings</Text>
                <SearchInput placeholder="Search" />
                <ProfileInfo />

                <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 20 }}>
                    {settingsData1.map((item) => (
                        <SettingsCard key={item.id} iconName={item.iconName} title={item.title} />
                    ))}
                </View>
                <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 20, marginVertical: 20 }}>
                    {settingsData2.map((item) => (
                        <SettingsCard key={item.id} iconName={item.iconName} title={item.title} />
                    ))}
                </View>
                <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 20 }}>
                    {settingsData3.map((item) => (
                        <SettingsCard key={item.id} iconName={item.iconName} title={item.title} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;
