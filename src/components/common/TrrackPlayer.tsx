import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import TrackPlayer, { Capability, useProgress, useTrackPlayerEvents, Event } from 'react-native-track-player';

// Define the props interface to accept the control functions
interface AudioTrackPlayerProps {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onNextTrack: () => void; // Prop for skipping forward
  onPreviousTrack: () => void; // Prop for skipping backward
}

const AudioTrackPlayer: React.FC<AudioTrackPlayerProps> = ({
  onPlay,
  onPause,
  onStop,
  onNextTrack,
  onPreviousTrack,
}) => {
  const [trackTitle, setTrackTitle] = useState<string | undefined>(undefined);
  const progress = useProgress();

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();

      // Add tracks to the queue
      await TrackPlayer.add([
        {
          id: 'track1',
          url: 'https://example.com/audio1.mp3',
          title: 'Sample Track 1',
          artist: 'Artist 1',
        },
        {
          id: 'track2',
          url: 'https://example.com/audio2.mp3',
          title: 'Sample Track 2',
          artist: 'Artist 2',
        },
      ]);

      // Update the TrackPlayer options
      TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
        playIcon: require('../../assets/imgages/plus-circle.png'),  // Ensure correct path and format for the icons
        pauseIcon: require('../../assets/imgages/plus-circle.png'),
        stopIcon: require('../../assets/imgages/plus-circle.png'),
        previousIcon: require('../../assets/imgages/plus-circle.png'),
        nextIcon: require('../../assets/imgages/plus-circle.png'),
        icon: require('../../assets/imgages/plus-circle.png'),
      });
    };

    setupPlayer();

    // Clean up the player when the component unmounts by resetting it
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  // Update track information when track changes
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title } = track || {};
      setTrackTitle(title);
    }
  });

  // Helper function to format time for progress bar
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Functions to skip to specific tracks
  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.error('Error skipping to next track', error);
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.error('Error skipping to previous track', error);
    }
  };

  const removeTrack = async (trackIndex: number) => {
    try {
      await TrackPlayer.remove([trackIndex]);
    } catch (error) {
      console.error('Error removing track', error);
    }
  };

  return (
    <View>
      {/* Track control buttons */}
      <Button title="Play Music" onPress={onPlay} />
      <Button title="Pause Music" onPress={onPause} />
      <Button title="Stop Music" onPress={onStop} />
      <Button title="Next Track" onPress={skipToNext} />
      <Button title="Previous Track" onPress={skipToPrevious} />

      {/* Track information display */}
      <Text>Now playing: {trackTitle || 'No track selected'}</Text>

      {/* Progress bar */}
      <View>
        <Text>{formatTime(progress.position)} / {formatTime(progress.duration)}</Text>
        {/* <ProgressBar
          progress={progress.position}
          buffered={progress.buffered}
          duration={progress.duration}
        /> */}
      </View>
    </View>
  );
};

// Example ProgressBar component for visualizing playback progress
const ProgressBar: React.FC<{ progress: number; buffered: number; duration: number }> = ({
  progress,
  buffered,
  duration,
}) => {
  const progressPercentage = (progress / duration) * 100;
  const bufferedPercentage = (buffered / duration) * 100;

  return (
    <View style={{ width: '100%', height: 10, backgroundColor: '#ccc' }}>
      <View style={{ width: `${bufferedPercentage}%`, backgroundColor: '#ddd', height: '100%' }} />
      <View style={{ width: `${progressPercentage}%`, backgroundColor: '#f00', height: '100%' }} />
    </View>
  );
};

export default AudioTrackPlayer;
