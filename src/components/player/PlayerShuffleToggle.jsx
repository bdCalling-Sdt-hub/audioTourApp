// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {iconSizes} from '../../constants/dimensions';
// import {colors} from '../../constants/color';
// import TrackPlayer from 'react-native-track-player';

// const PlayerShuffleToggle = () => {
//   const shuffleSongs = async songs => {
   
//     let queue = await TrackPlayer.getQueue();
//     await TrackPlayer.reset();
//     queue.sort(() => Math.random() - 0.5);
//     await TrackPlayer.add(queue);
//     await TrackPlayer.play();
//   };
//   return (
//     <TouchableOpacity onPress={shuffleSongs}>
//       <MaterialCommunityIcons
//         name={'shuffle'}
//         size={iconSizes.lg}
//         color={colors.iconSecondary}
//       />
//     </TouchableOpacity>
//   );
// };

// export default PlayerShuffleToggle;

// const styles = StyleSheet.create({});
import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { iconSizes } from '../../constants/dimensions';
import { colors } from '../../constants/color';
import { NativeModules } from 'react-native';

const { MusicControlModule } = NativeModules; // Import the native module

const PlayerShuffleToggle = () => {

  // Function to shuffle songs using the native shuffleTracks method
  const shuffleSongs = async () => {
    try {
      await MusicControlModule.shuffleTracks();  // Call the native shuffle method
    } catch (error) {
      console.error('Error shuffling tracks:', error);
    }
  };

  return (
    <TouchableOpacity onPress={shuffleSongs}>
      <MaterialCommunityIcons
        name={'shuffle'}
        size={iconSizes.lg}
        color={colors.iconSecondary}
      />
    </TouchableOpacity>
  );
};

export default PlayerShuffleToggle;

const styles = StyleSheet.create({});
