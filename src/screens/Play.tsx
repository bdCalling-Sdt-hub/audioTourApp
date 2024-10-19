import React, { useEffect } from 'react';
import { Button, View, Alert, NativeModules } from 'react-native';
import TrackPlayer, { Capability } from 'react-native-track-player';
import AudioTrackPlayer from '../components/common/TrrackPlayer';

const { MusicControlModule } = NativeModules;

// Define the types for MusicControlModule
interface MusicControlModuleType {
  startForegroundService: (url: string) => Promise<void>;
  stopForegroundService: () => Promise<void>;
  play: (url: string) => Promise<string>;
  pause: () => Promise<string>;
  stop: () => Promise<string>;
}

// Use the correct typing for the NativeModules
const MusicControl: MusicControlModuleType = MusicControlModule as MusicControlModuleType;

const Play: React.FC = () => {
  const url = 'https://d38nvwmjovqyq6.cloudfront.net/va90web25003/companions/Foundations%20of%20Rock/1.29.mp3'; // Replace with the correct URL

  const startMusicService = (): void => {
    MusicControl.startForegroundService(url)
      .then(() => console.log('Foreground service started'))
      .catch((error: any) => console.log('Error starting foreground service:', error));
  };

  const stopMusicService = (): void => {
    MusicControl.stopForegroundService()
      .then(() => console.log('Foreground service stopped'))
      .catch((error: any) => console.log('Error stopping foreground service:', error));
  };

  const playMusic = (): void => {
    MusicControl.play(url)
      .then((message: string) => console.log(message))
      .catch((error: any) => Alert.alert('Error', 'Unable to play music: ' + error));
  };

  const pauseMusic = (): void => {
    MusicControl.pause()
      .then((message: string) => console.log(message))
      .catch((error: any) => Alert.alert('Error', 'Unable to pause music: ' + error));
  };

  const stopMusic = (): void => {
    MusicControl.stop()
      .then((message: string) => console.log(message))
      .catch((error: any) => Alert.alert('Error', 'Unable to stop music: ' + error));
  };

  // Mocked next and previous track functions (to be connected to real queue logic)
  const nextTrack = (): void => {
    console.log('Skipping to next track');
  };

  const previousTrack = (): void => {
    console.log('Skipping to previous track');
  };

  // Configure TrackPlayer and update notification options
  useEffect(() => {
    const setupTrackPlayer = async () => {
      await TrackPlayer.setupPlayer();

      // Add some tracks
      await TrackPlayer.add([
        {
          id: 'track1',
          url: url,
          title: 'Sample Track 1',
          artist: 'Artist 1',
        },
      ]);

      // Update the TrackPlayer options for notification controls
      TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
        playIcon: require('../assets/imgages/plus-circle.png'),  // Correct path to the icon
        pauseIcon: require('../assets/imgages/plus-circle.png'),
        stopIcon: require('../assets/imgages/plus-circle.png'),
        previousIcon: require('../assets/imgages/plus-circle.png'),
        nextIcon: require('../assets/imgages/plus-circle.png'),
        icon: require('../assets/imgages/plus-circle.png'),  // Ensure icon is valid
      });
    };

    setupTrackPlayer();

    // Cleanup
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  return (
    <View>
      <Button title="Start Foreground Music Service" onPress={startMusicService} />
      <Button title="Stop Foreground Music Service" onPress={stopMusicService} />

      {/* Pass the play, pause, stop, nextTrack, and previousTrack functions as props */}
      <AudioTrackPlayer
        onPlay={playMusic}
        onPause={pauseMusic}
        onStop={stopMusic}
        onNextTrack={nextTrack}
        onPreviousTrack={previousTrack}
      />
    </View>
  );
};

export default Play;
