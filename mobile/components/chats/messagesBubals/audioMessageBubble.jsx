// src/components/messages/AudioMessage.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { useAudioPlayer } from 'expo-audio';
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import MessageStatusBubble from "./messageStatusBubble";

export default function AudioMessageBubble({ message }) {

    const { play, pause, seekTo, isPlaying, position, duration } = useAudioPlayer(message?.metadata?.url);


    function togglePlay() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    function onSeek(val) {
        seekTo(val);
        play();
    }

    useEffect(() => {
        return () => {
            pause();
        };
    }, []);

    return (
        <View style={{ flexDirection: "row", gap: 10, minWidth: "100%" }}>
            <Image
                source={require("../../../assets/images/pexels-nati-87264186-34295251.jpg")}
                style={{ width: 40, height: 40, borderRadius: "50%" }}
            />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <TouchableOpacity onPress={togglePlay}>
                        <Ionicons name={isPlaying ? "pause" : "play"} size={30} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>

                        <Slider
                            minimumValue={0}
                            maximumValue={duration}
                            value={position}
                            onSlidingComplete={onSeek}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#252121ff"
                            thumbTintColor="#e6dcdcff"
                            step={1}
                        />

                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ color: "white" }}>
                        {Math.floor(duration / 1000)}s
                    </Text>
                    <MessageStatusBubble
                        message={message}
                    />
                </View>

            </View>
        </View>
    );
}
