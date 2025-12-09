import Slider from "@react-native-community/slider";

import { Audio } from "expo-av";
import { useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function AudioMessageCard({ message }) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [soundRef, setSoundRef] = useState(null);

    const { sound } = Audio.useAudio({
        source: { uri: message?.metadata?.url },
        onPlaybackStatusUpdate: (status) => {
            if (status?.isLoaded) {
                setIsPlaying(status?.isPlaying);
            }
            setSoundRef(sound);
        }

    });

    const playAudio = async () => {
        if (soundRef) {
            await soundRef.playAsync();
        }
    };
    const pauseAudio = async () => {
        if (soundRef) {
            await soundRef.pauseAsync();
        }
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    };

    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity onPress={handlePlayPause}>
                {
                    isPlaying ? (
                        <Ionicons name="pause" size={24} color="black" />
                    ) : (
                        <Ionicons name="play" size={24} color="black" />
                    )
                }
            </TouchableOpacity>
            <Slider
                style={{ flex: 1 }}
                value={0}
                minimumValue={0}
                maximumValue={100}
                step={1}
                onValueChange={(value) => console.log(value)}
            />
            <Text>00:00</Text>
        </View>
    );
}