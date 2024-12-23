import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player';

const setupPlayer = async () => {
    try {
        await TrackPlayer.setupPlayer({
            maxCacheSize: 1024 * 10, // Cache size in MB
        });
        await TrackPlayer.updateOptions({
            ratingType: RatingType.Heart,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
            ],
        });
        await TrackPlayer.setVolume(0.5);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        console.log('TrackPlayer setup completed.');
    } catch (error) {
        console.error('Error during TrackPlayer setup:', error);
        throw error; // Ensure to propagate errors for debugging
    }
};

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
    const isInitialized = useRef(false);

    useEffect(() => {
        const initializePlayer = async () => {
            if (!isInitialized.current) {
                try {
                    await setupPlayer();
                    isInitialized.current = true;
                    if (onLoad) onLoad();
                } catch (error) {
                    console.error('Failed to initialize TrackPlayer:', error);
                }
            }
        };

        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (nextAppState === 'active' && !isInitialized.current) {
                initializePlayer();
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        initializePlayer(); // Initial setup

        return () => {
            subscription.remove();
        };
    }, [onLoad]);
};
