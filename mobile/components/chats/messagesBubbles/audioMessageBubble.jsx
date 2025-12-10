// src/components/messages/AudioMessage.tsx
import { View, Text, TouchableOpacity } from "react-native";
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
        <View >
            <View>
                <TouchableOpacity onPress={togglePlay}>
                    {isPlaying ? <Ionicons name="pause" size={24} /> : <Ionicons name="play" size={24} />}
                </TouchableOpacity>

                <Slider
                    style={{ flex: 1, marginHorizontal: 10 }}
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    onSlidingComplete={onSeek}
                />

                <Text style={{ color: "white" }}>
                    {Math.floor(duration / 1000)}s
                </Text>
            </View>
            <MessageStatusBubble
                status={message?.status}
                timestamp={message?.timestamp}
            />
        </View>
    );
}
