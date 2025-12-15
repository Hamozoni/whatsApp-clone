import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";



const ZoomableImage = () => {
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedX = useSharedValue(0);
    const savedY = useSharedValue(0);


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

    const composedGesture = Gesture.Simultaneous(doubleTap);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateX: translateX.value },
            { translateY: translateY.value },
        ]
    }))

    return (
        <GestureDetector gesture={composedGesture}>
            <Animated.Image
                source={require("../../assets/images/pexels-nati-87264186-34295251.jpg")}
                style={[animatedStyle, { width: "100%", height: "100%", resizeMode: "contain" }]}
            />
        </GestureDetector>
    );
};

export default ZoomableImage
