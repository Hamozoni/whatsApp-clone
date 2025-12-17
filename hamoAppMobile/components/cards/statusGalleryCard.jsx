import StatusGalleryHeader from "../status/statusGalleryHeader";
import VideoPlayer from "../mediaGallery/videoPlayer";
import ZoomableImage from "../mediaGallery/zoomableImage";
import { useEffect, useState } from "react";
import StatusGalleryFooter from "../status/statusGalleryFooter";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-worklets";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { STATUSES } from "../../constants/status";
export default function StatusGalleryCard({ status }) {


    const [statusIndex, setStatusIndex] = useState(0);
    const { index } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        setStatusIndex(0);
    }, [index]);

    const handlePrev = () => {
        if (statusIndex > 0) {
            setStatusIndex(statusIndex - 1);
        } else {
            if (Number.parseInt(index) === 0) {
                router.back();
            } else {
                router.replace(`/status/${Number.parseInt(index) - 1}`);
            }
        }
    }

    const handleNext = () => {
        if (statusIndex < status?.statuses?.length - 1) {
            setStatusIndex(statusIndex + 1);
        } else {
            if (Number.parseInt(index) === STATUSES?.length - 1) {
                router.back();
            } else {

                router.replace(`/status/${Number.parseInt(index) + 1}`);
            }
        }
    }

    const tapLeft = Gesture.Tap()
        .numberOfTaps(1)
        .onEnd((e) => {
            if (e.x < 170 && e.y > 100 && e.y < 500) {
                runOnJS(handlePrev)()
            }
            else if (e.x > 200 && e.y > 100 && e.y < 500) {
                runOnJS(handleNext)()
            }
        });

    return (
        <GestureDetector style={{ flex: 1 }} gesture={tapLeft}>
            <View style={{ flex: 1, width: "100%", flexDirection: "column" }}>
                <StatusGalleryHeader
                    status={status}
                    statusIndex={statusIndex}
                    handleNext={handleNext}
                    durationInSec={status.statuses[statusIndex]?.durationInSec || 10}
                />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {
                        status.statuses[statusIndex]?.type === "image" ? (
                            <ZoomableImage url={status.statuses[statusIndex]?.photoURL} />
                        ) : status.statuses[statusIndex]?.type === "video" ? (
                            <VideoPlayer url={status.statuses[statusIndex]?.videoURL} />
                        ) : status.statuses[statusIndex]?.type === "video" &&
                        <View style={{ flex: 1, width: "100%", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: status.statuses[statusIndex]?.bgColor }}>
                            <Text style={{ color: status.statuses[statusIndex]?.textColor }}>{status.statuses[statusIndex]?.text}</Text>
                        </View>
                    }

                </View>
                <StatusGalleryFooter />
            </View>
        </GestureDetector>
    );
}