import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { iconSizes } from '../../constants/dimensions';
// import { colors } from '../constants/color';
import TrackPlayer, { State, Event, useTrackPlayerEvents } from 'react-native-track-player';
import { useTheme } from '@react-navigation/native';

// Button to skip to the previous track
export const GoToPreviousButton = ({ size = iconSizes.lg }) => {
  const {colors} = useTheme();
  // const handleSkipToPrevious = async () => {
  //   try {
  //     await TrackPlayer.skipToPrevious(); // Skip to previous track
  //   } catch (error) {
  //     console.error('Error skipping to previous track:', error);
  //   }
  // };

  return (
    <TouchableOpacity activeOpacity={0.85} >
      <MaterialCommunityIcons
        name={'skip-previous'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

// Button to toggle between play and pause
export const PlayPauseButton = ({ size = iconSizes.lg }) => {
  const {colors} = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to toggle between play and pause
  const togglePlayPause = async () => {
    const currentState = await TrackPlayer.getState();
    if (currentState === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  // Listen to changes in playback state to dynamically update play/pause button
  useTrackPlayerEvents([Event.PlaybackState], (event) => {
    if (event.state === State.Playing) {
      setIsPlaying(true);
    } else if (event.state === State.Paused || event.state === State.Stopped) {
      setIsPlaying(false);
    }
  });

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={togglePlayPause}>
      <FontAwesome6
        name={isPlaying ? 'pause' : 'play'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

// Button to skip to the next track
export const GoToForwardButton = ({ size = iconSizes.xl }) => {
  const {colors} = useTheme();
  const handleSkipToNext = async () => {
    try {
      await TrackPlayer.skipToNext(); // Skip to next track
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handleSkipToNext}>
      <MaterialCommunityIcons
        name={'skip-next'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
