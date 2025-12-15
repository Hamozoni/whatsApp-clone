import { View, FlatList } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import MediaGalleryCard from '../../components/cards/mediaGalleryCard';
import MediaGalleryHeader from '../../components/mediaGallery/galleryHeader';
import MediaGalleryFooter from '../../components/mediaGallery/galleryFooter';
import { useRouter } from 'expo-router';
import { MESSAGES } from '../../constants/messages';

const messages = MESSAGES.filter((item) => item.type === "image" || item.type === "video");


const MediaGallery = () => {

    const showHeaderAndFooter = useSharedValue(true);
    const swipeTranslateY = useSharedValue(0);
    const router = useRouter();

    const onBack = () => {
        router.back();
    };

    const onSwipeDown = Gesture.Pan()
        .onUpdate((e) => {
            swipeTranslateY.value = e.translationY
        })
        .onEnd(() => {
            if (swipeTranslateY.value > 150 || swipeTranslateY.value < -150) {
                runOnJS(onBack)();
            } else {
                swipeTranslateY.value = withSpring(0);
            }
        });

    const oneTap = Gesture.Tap()
        .numberOfTaps(1)
        .onEnd(() => {
            showHeaderAndFooter.value = !showHeaderAndFooter.value;

        });

    const style = useAnimatedStyle(() => ({
        transform: [
            { translateY: swipeTranslateY.value }
        ]
    }));

    const headerStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: showHeaderAndFooter.value ? 0 : -100 }
        ]
    }));

    const footerStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: showHeaderAndFooter.value ? 0 : 100 }
        ]
    }));

    const gesture = Gesture.Simultaneous(onSwipeDown);

    return (
        <GestureDetector gesture={gesture}>
            <View style={{ flex: 1 }}>
                <Animated.View style={[headerStyle, { position: "absolute", top: 0, left: 0, right: 0, zIndex: 3 }]}>
                    <MediaGalleryHeader />
                </Animated.View>
                <Animated.View style={[{ flex: 1, alignItems: "center", justifyContent: "center" }, style]}>
                    <GestureDetector gesture={oneTap}>
                        <FlatList
                            horizontal
                            pagingEnabled
                            style={{ flex: 1 }}
                            data={messages}
                            renderItem={({ item }) => <MediaGalleryCard metaData={item} />}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}

                        />
                    </GestureDetector>
                </Animated.View>
                <Animated.View style={[footerStyle, { position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3 }]}><MediaGalleryFooter /></Animated.View>

            </View>
        </GestureDetector>
    )
};

export default MediaGallery;
