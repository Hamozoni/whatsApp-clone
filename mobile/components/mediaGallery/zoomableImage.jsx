import { Dimensions, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";


const { width, height } = Dimensions.get("window");

const ZoomableImage = () => {
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedX = useSharedValue(0);
    const savedY = useSharedValue(0);

    const pinch = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;

            if (scale.value < 1) {
                scale.value = withTiming(1);
                savedScale.value = 1;
            }
        });

    const pen = Gesture.Pan()
        .onUpdate((e) => {
            if (scale.value > 1) {
                translateX.value = savedX.value + e.translationX;
                translateY.value = savedY.value + e.translationY;
            }
        })
        .onEnd(() => {
            savedX.value = translateX.value;
            savedY.value = translateY.value;
        });

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            if (scale.value > 1) {
                scale.value = withSpring(1);
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
                savedScale.value = 1;
                savedX.value = 0;
                savedY.value = 0;
            } else {
                scale.value = withSpring(2.5);
                savedScale.value = 2.5;
            }
        });

    const composedGesture = Gesture.Simultaneous(pinch, pen, doubleTap);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateX: translateX.value },
            { translateY: translateY.value },
        ]
    }))

    return (
        <GestureDetector gesture={composedGesture}>
            <Animated.Image source={require("../../assets/images/pexels-nati-87264186-34295251.jpg")} style={[animatedStyle, { width, height, resizeMode: "contain" }]} />
        </GestureDetector>
    );
};

export default ZoomableImage
