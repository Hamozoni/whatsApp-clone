import { Image, View, Text, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
// import ZoomableImage from '../../components/mediaGallery/zoomableImage';
// import { CHATS } from '../constants/chats';

const MediaGallery = () => {
    const router = useRouter();


    return (
        <PagerView
            initialPage={0}
            style={{
                flex: 1,
            }}>
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
                <View style={{ backgroundColor: "black", opacity: 0.5, padding: 20, paddingTop: 40 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <TouchableOpacity onPress={() => { router.back() }}>
                            <Ionicons name="chevron-back" size={28} color="white" />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>John Doe</Text>
                                <Text style={{ color: "white", fontSize: 12 }}>12/12/2025,12:34</Text>
                            </View>
                            <Ionicons name="pencil" size={20} color="white" />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Image
                        source={require("../../assets/images/pexels-nati-87264186-34295251.jpg")}
                        style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                </View>
                <View style={{ backgroundColor: "black", opacity: 0.5, padding: 20, paddingTop: 40 }}>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>John Doe</Text>
                </View>
            </View>
        </PagerView>
    )
};

export default MediaGallery;
