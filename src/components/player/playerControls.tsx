import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, NativeModules } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { iconSizes } from '../../constants/dimensions';
import { useTheme } from '@react-navigation/native';

const { MusicControlModule } = NativeModules;

interface MusicControlModuleType {
  startForegroundService: (url: string) => void;
  stopForegroundService: () => void;
  play: (url: string) => void;
  pause: () => void;
  stop: () => void;
  skipToNext: (url: string) => void;
  skipToPrevious: (url: string) => void;
}

const MusicControl: MusicControlModuleType = MusicControlModule as MusicControlModuleType;

export const PlayPauseButton = ({
  isPlaying,
  onPlayPause,
  size = iconSizes.lg,
}: {
  isPlaying: boolean;
  onPlayPause: () => void;
  size?: number;
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPlayPause}>
      <FontAwesome6
        name={isPlaying ? 'pause' : 'play'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const GoToForwardButton = ({ nextTrackUrl, size = iconSizes.xl, onSkipToNext }) => {
  const { colors } = useTheme();

  const handleSkipToNext = () => {
    if (!nextTrackUrl) {
      Alert.alert('Error', 'No next track available');
      return;
    }

    try {
      onSkipToNext(); // Use the skip function passed as prop
    } catch (error) {
      Alert.alert('Error', 'Unable to skip to next track');
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

export const GoToPreviousButton = ({ previousTrackUrl, size = iconSizes.lg, onSkipToPrevious }) => {
  const { colors } = useTheme();

  const handleSkipToPrevious = () => {
    if (!previousTrackUrl) {
      Alert.alert('Error', 'No previous track available');
      return;
    }

    try {
      onSkipToPrevious(); // Use the skip function passed as prop
    } catch (error) {
      Alert.alert('Error', 'Unable to skip to previous track');
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handleSkipToPrevious}>
      <MaterialCommunityIcons
        name={'skip-previous'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({});
