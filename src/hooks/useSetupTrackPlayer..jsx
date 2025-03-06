import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player';

const setupPlayer = async () => {
  try {
    // Ensure the service and player are not already running
    const isServiceRunning = await TrackPlayer.isServiceRunning();
    if (isServiceRunning) {
      console.log('TrackPlayer is already running.');
      return;
    }

    // Setup the player
    await TrackPlayer.setupPlayer({ maxCacheSize: 1024 * 10 });

    // Configure player options
    await TrackPlayer.updateOptions({
      ratingType: RatingType.Heart,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
      android: {
        ...(AppKilledPlaybackBehavior && { appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback }),
      },
    });

    // Additional configurations
    await TrackPlayer.setVolume(0.5);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);

    console.log('TrackPlayer setup completed.');
  } catch (error) {
    console.error('Error during TrackPlayer setup:', error);
    throw error;
  }
};

export const useSetupTrackPlayer = ({ onLoad }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        if (AppState.currentState === 'active') {
          console.log('Initializing TrackPlayer...');
          await setupPlayer();
          isInitialized.current = true;
          if (onLoad) {
            onLoad();
          }
        } else {
          console.error('App must be in the foreground to initialize TrackPlayer.');
        }
      } catch (error) {
        isInitialized.current = false;
        console.error('Error initializing TrackPlayer:', error);
      }
    };

    if (!isInitialized.current) {
      initializePlayer();
    }

    return () => {
      if (isInitialized.current) {
        TrackPlayer.stop().then(() => {
          TrackPlayer.destroy().then(() => {
            console.log('TrackPlayer destroyed.');
            isInitialized.current = false;
          });
        });
      }
    };
  }, [onLoad]);
};
