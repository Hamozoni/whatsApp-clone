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

    const style = useAnimatedStyle(() => ({
        transform: [
            { translateY: swipeTranslateY.value }
        ]
    }));

    return (
        <GestureDetector gesture={onSwipeDown}>
            <View style={{ flex: 1 }}>
                <MediaGalleryHeader />
                <Animated.View style={[{ flex: 1, alignItems: "center", justifyContent: "center" }, style]}>
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
                </Animated.View>
                <MediaGalleryFooter />

            </View>
        </GestureDetector>
    )
};

export default MediaGallery;
