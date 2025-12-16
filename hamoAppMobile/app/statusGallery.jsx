import { SafeAreaView } from "react-native-safe-area-context";
import { STATUSES } from "../constants/status";
import { useEffect, useState } from "react";
import StatusGalleryCard from "../components/cards/statusGalleryCard";
import { FlatList, View } from "react-native";
import { groupStatusByContact } from "../components/utils/groupStatusBycontact";

const StatusGallery = () => {
    const [statuses, setStatuses] = useState([]);
    useEffect(() => {
        const status = groupStatusByContact(STATUSES);
        setStatuses(status);
    }, [STATUSES]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={statuses}
                    renderItem={({ item }) => (
                        <StatusGalleryCard status={item} />
                    )}
                    keyExtractor={(item) => item[0]?.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default StatusGallery;
