import { View, Text, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import ZoomableImage from '../../components/mediaGallery/zoomableImage';
import VideoPlayer from '../../components/mediaGallery/videoPlayer';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const MediaGalleryHeader = () => {
    const router = useRouter();
    return (
        <View style={{ backgroundColor: "black", opacity: 0.5, padding: 20, paddingTop: 40, zIndex: 3 }}>
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
    )
};

const MediaGalleryFooter = () => {
    return (
        <View style={{ backgroundColor: "black", opacity: 0.5, padding: 20, paddingTop: 40, zIndex: 3 }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>John Doe</Text>
        </View>
    )
};

const MediaGallery = () => {

    const router = useRouter();
    const swipeTranslateY = useSharedValue(0);


    const onBack = () => {
        // router.back();
    };

    const onSwipeDown = Gesture.Pan()
        .onUpdate((e) => {
            if (e.translationY > 0) {
                swipeTranslateY.value = e.translationY
            }
        })
        .onEnd(() => {
            if (swipeTranslateY.value > 150) {
                scheduleOnRN(onBack)();
            } else {
                swipeTranslateY.value = withTiming(0);
            }
        });

    const style = useAnimatedStyle(() => ({
        transform: [
            { translateY: swipeTranslateY.value }
        ]
    }));

    return (
        <GestureDetector gesture={onSwipeDown}>
            <View style={{ flex: 1 }}>
                <MediaGalleryHeader />
                <Animated.View style={[{ flex: 1 }, style]}>
                    <PagerView
                        initialPage={0}
                        horizontal={true}
                        style={{ flex: 1, flexDirection: "column" }}
                    >
                        <VideoPlayer />
                        <ZoomableImage />
                        <VideoPlayer />
                        <ZoomableImage />
                    </PagerView>
                </Animated.View>
                <MediaGalleryFooter />

            </View>
        </GestureDetector>
    )
};

export default MediaGallery;
