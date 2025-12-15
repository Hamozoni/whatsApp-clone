import { useVideoPlayer, VideoView } from 'expo-video';

const videoSource =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoScreen() {
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    return (
        <VideoView
            style={{ width: "100%", height: "100%" }}
            player={player}
            fullscreenOptions={{
                enabled: true,
                exitFullscreenOnEnd: true,
            }}
            allowsPictureInPicture
            allowsVideoFrameAnalysis
            allowsInlinePlay
            allowsAirPlay
        />
    );
}