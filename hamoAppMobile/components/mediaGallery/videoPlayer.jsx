import { useVideoPlayer, VideoView } from 'expo-video';
import { View } from 'react-native';

import { useRouter } from "expo-router";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const videoSource =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoScreen() {

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
    });

    return (
        <View style={{ flex: 1, backgroundColor: "black", width: "100%", height: "100%" }}>
            <VideoView
                style={{ width: "100%", height: "100%" }}
                player={player}
                onBlur={() => console.log("blur")}
                onFocus={() => console.log("focus")}
                fullscreenOptions={{
                    enabled: true,
                    exitFullscreenOnEnd: true,

                }}
            />
        </View>
    );
}