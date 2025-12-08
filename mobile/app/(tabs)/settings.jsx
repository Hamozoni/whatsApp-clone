import { ScrollView, View } from "react-native";
import { ProfileInfo } from "../../components/settings/profileInfo";
import { SearchInput } from "../../components/ui/searchInput";
import { SettingsCard } from "../../components/cards/settingsCard";

const settingsData = [
    { title: "lists", iconName: "list-outline", id: 1 },
    { title: "broadcasts messages", iconName: "microphone-outline", id: 2 },
    { title: "starrd", iconName: "star-outline", id: 3 },
    { title: "linked devices", iconName: "devices-outline", id: 4 },
    { title: "account", iconName: "person-outline", id: 5 },
    { title: "privacy", iconName: "lock-closed-outline", id: 6 },
    { title: "chats", iconName: "chatbubbles-outline", id: 7 },
    { title: "notifications", iconName: "notifications-outline", id: 8 },
    { title: "storage and data", iconName: "storage-outline", id: 9 },
    { title: "help and feedback", iconName: "help-outline", id: 10 },
    { title: "invite a friend", iconName: "person-add-outline", id: 11 },
];

const Settings = () => {
    return (
        <ScrollView style={{ padding: 10 }}>
            <SearchInput placeholder="Search" />
            <ProfileInfo />

            <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 20 }}>
                {settingsData.map((item) => (
                    <SettingsCard key={item.id} iconName={item.iconName} title={item.title} />
                ))}
            </View>
        </ScrollView>
    );
};

export default Settings;
