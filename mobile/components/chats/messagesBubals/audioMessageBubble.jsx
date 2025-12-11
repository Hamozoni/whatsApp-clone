// src/components/messages/AudioMessage.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import MessageStatusBubble from "./messageStatusBubble";

export default function AudioMessageBubble({ message }) {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(1);

    async function loadSound() {
        const { sound } = await Audio.Sound.createAsync(
            message?.metadata?.url,
            { shouldPlay: false },
            updateStatus
        );
        setSound(sound);
    }

    function updateStatus(status) {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
            setIsPlaying(status.isPlaying);
        }
    }

    async function togglePlay() {
        if (!sound) return;

        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    }

    async function onSeek(val) {
        if (sound) {
            await sound.setPositionAsync(val);
        }
    }

    useEffect(() => {
        loadSound();
        return () => {
            sound && sound.unloadAsync();
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
