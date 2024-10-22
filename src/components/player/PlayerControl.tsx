// import { StyleSheet, TouchableOpacity } from 'react-native';
// import React, { useState } from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import { iconSizes } from '../../constants/dimensions';
// import { useTheme } from '@react-navigation/native';
// import { NativeModules } from 'react-native';

// // Access Native Module for controlling MediaPlayer
// const { MusicControlModule } = NativeModules;

// interface MusicControlModuleType {
//   play: () => Promise<void>;
//   pause: () => Promise<void>;
//   skipToNext: () => Promise<void>;
//   skipToPrevious: () => Promise<void>;
// }

// const MusicControl: MusicControlModuleType = MusicControlModule as MusicControlModuleType;

// // Button to skip to the previous track
// export const GoToPreviousButton = ({ size = iconSizes.lg }) => {
//   const { colors } = useTheme();

//   const handleSkipToPrevious = async () => {
//     try {
//       await MusicControl.skipToPrevious(); // Skip to previous track via MediaPlayer
//     } catch (error) {
//       console.error('Error skipping to previous track:', error);
//     }
//   };

//   return (
//     <TouchableOpacity activeOpacity={0.85} onPress={handleSkipToPrevious}>
//       <MaterialCommunityIcons
//         name={'skip-previous'}
//         size={size}
//         color={colors.iconPrimary}
//       />
//     </TouchableOpacity>
//   );
// };

// // Button to toggle between play and pause
// export const PlayPauseButton = ({ size = iconSizes.lg }) => {
//   const { colors } = useTheme();
//   const [isPlaying, setIsPlaying] = useState(false); // Manages play/pause state

//   // Function to toggle between play and pause
//   const togglePlayPause = async () => {
//     try {
//       if (isPlaying) {
//         await MusicControl.pause(); // Pause using MediaPlayer in native code
//         setIsPlaying(false);
//       } else {
//         await MusicControl.play(); // Play using MediaPlayer in native code
//         setIsPlaying(true);
//       }
//     } catch (error) {
//       console.error('Error toggling play/pause:', error);
//     }
//   };

//   return (
//     <TouchableOpacity activeOpacity={0.85} onPress={togglePlayPause}>
//       <FontAwesome6
//         name={isPlaying ? 'pause' : 'play'}
//         size={size}
//         color={colors.iconPrimary}
//       />
//     </TouchableOpacity>
//   );
// };

// // Button to skip to the next track
// export const GoToForwardButton = ({ size = iconSizes.xl }) => {
//   const { colors } = useTheme();

//   const handleSkipToNext = async () => {
//     try {
//       await MusicControl.skipToNext(); // Skip to next track via MediaPlayer
//     } catch (error) {
//       console.error('Error skipping to next track:', error);
//     }
//   };

//   return (
//     <TouchableOpacity activeOpacity={0.85} onPress={handleSkipToNext}>
//       <MaterialCommunityIcons
//         name={'skip-next'}
//         size={size}
//         color={colors.iconPrimary}
//       />
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({});
