import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Alert, NativeModules, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import SongCard from './SongCard';
import { fontSizes, spacing } from '../../constants/dimensions';
import { fontFamilies } from '../../constants/fonts';
import { useTheme } from '@react-navigation/native';
import tw from '../../lib/tailwind';

// Define types for song and song category
type Song = {
  id: string;
  title: string;
  artist: string;
  url: string;
  artwork?: string;
};

type SongCategoryItem = {
  title: string;
  songs: Song[];
};

interface SongCardWithCategoryProps {
  item: SongCategoryItem;
}

// Define your root navigation types
type RootStackParamList = {
  PlayerScreen: { selectedTrack: Song; trackList: Song[] };
};

// Native Modules for Music Control
const { MusicControlModule } = NativeModules;
console.log("34 ====", MusicControlModule.play)

interface MusicControlModuleType {
  startForegroundService: (url: string) => Promise<void>;
  stopForegroundService: () => Promise<void>;
  play: (url: string) => Promise<string>;
  pause: () => Promise<string>;
  stop: () => Promise<string>;
}

const MusicControl: MusicControlModuleType = MusicControlModule as MusicControlModuleType;

const SongCardWithCategory: React.FC<SongCardWithCategoryProps> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Handle the foreground service
  const startMusicService = (trackUrl: string): void => {
    if (!trackUrl) {
      Alert.alert('Error', 'No track URL selected');
      return;
    }
    MusicControl.play(trackUrl).catch((error: any) => console.log('Error starting foreground service:', error));
  };

  const stopMusicService = (): void => {
    MusicControl.stopForegroundService().catch((error: any) => console.log('Error stopping foreground service:', error));
  };

  const playMusic = (trackUrl: string): void => {
    if (!trackUrl) {
      Alert.alert('Error', 'No track URL selected');
      return;
    }
    MusicControl.play(trackUrl).catch((error: any) => Alert.alert('Error', 'Unable to play music: ' + error));
  };

  const pauseMusic = (): void => {
    MusicControl.pause().catch((error: any) => Alert.alert('Error', 'Unable to pause music: ' + error));
  };

  const stopMusic = (): void => {
    MusicControl.stop().catch((error: any) => Alert.alert('Error', 'Unable to stop music: ' + error));
  };

  // Create a function that will play a song in the queue and navigate to player screen
  const handlePlayTrack = async (selectedTrack: Song, trackList: Song[]) => {
    if (!selectedTrack || !selectedTrack.url) {
      Alert.alert('Error', 'No track selected');
      return;
    }

    try {
      playMusic(selectedTrack.url);
      startMusicService(selectedTrack.url);

      // Navigate to Player screen to show the current playing track and pass the entire track list
      navigation.navigate('SrotyPreview', {
        selectedTrack: selectedTrack,
        trackList: trackList, // Pass the entire track list
      });
    } catch (error) {
      console.error('Error while playing track:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#064145" />
        <Text style={tw`text-primary mt-2`}>Loading ....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.headingText, { color: colors.textPrimary }]}>
        {item?.title}
      </Text>
      <FlatList
        data={item.songs}
        renderItem={({ item: song }) => (
          <SongCard
            item={song}
            handlePlay={() => handlePlayTrack(song, item.songs)} // Pass the selected song and track list
          />
        )}
        horizontal={true}
        ItemSeparatorComponent={<View style={{ marginHorizontal: spacing.sm }} />}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SongCardWithCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
});

// SongCardWithCategory Component
// import { FlatList, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import SongCard from './SongCard';
// import { fontSizes, spacing } from '../../constants/dimensions';
// import { fontFamilies } from '../../constants/fonts';
// import TrackPlayer from 'react-native-track-player';
// import { useTheme } from '@react-navigation/native';

// interface Track {
//   url: string;
//   title?: string; // Optional property
// }
// interface Song {
//   id: string;
//   title: string;
//   artist: string;
//   url: string;
//   artwork?: string;
// }

// interface SongCategoryItem {
//   title: string;
//   songs: Song[];
// }

// interface SongCardWithCategoryProps {
//   item: SongCategoryItem;
//   onSelect: (song: Song) => void; // Add the onSelect prop
// }
// const SongCardWithCategory: React.FC<SongCardWithCategoryProps> = ({ item, onSelect }) => {
//   const { colors } = useTheme();

//   // Create a function to play a song in the queue
// //   const handlePlayTrack = async (selectedTrack, songs= item?.song) => {
// //     // const songs: Track[] = item.songs;
// //     console.log("songs++", songs)
// //    console.log("selected Track+++",selectedTrack)
// //    const trackIndex = songs.findIndex((track) => track.url === selectedTrack.url);
    
// // console.log("trackindex songCardWithCategory", trackIndex)
// //     if (trackIndex === -1) {
// //       console.warn('Track not found in the queue.');
// //       return;
// //     }

// //     const beforeTracks = songs.slice(0, trackIndex);
// //     console.log("beforeTrack", beforeTracks)
// //     const afterTracks = songs.slice(trackIndex + 1);
// //     console.log("afterTrack",)

// //     try {
// //       await TrackPlayer.reset();
// //       await TrackPlayer.add(selectedTrack);
// //       await TrackPlayer.add(afterTracks);
// //       await TrackPlayer.add(beforeTracks);
// //       await TrackPlayer.play();
// //     } catch (error) {
// //       console.error('Error while playing track:', error);
// //     }
// //   };
// const handlePlayTrack = async (selectedTrack: Song, songs: Song[]) => {
//   console.log("songs++", songs);
//   console.log("selected Track+++", selectedTrack);

//   const trackIndex = songs.findIndex((track) => track.url === selectedTrack.url);

//   console.log("trackindex songCardWithCategory", trackIndex);
//   if (trackIndex === -1) {
//     console.warn("Track not found in the queue.");
//     return;
//   }

//   const beforeTracks = songs.slice(0, trackIndex);
//   console.log("beforeTrack", beforeTracks);
//   const afterTracks = songs.slice(trackIndex + 1);
//   console.log("afterTrack", afterTracks);

//   try {
//     await TrackPlayer.reset();
//     await TrackPlayer.add(selectedTrack);
//     await TrackPlayer.add(afterTracks);
//     await TrackPlayer.add(beforeTracks);
//     await TrackPlayer.play();
//   } catch (error) {
//     console.error("Error while playing track:", error);
//   }
// };

//   return (
//     <View style={styles.container}>
//       <Text style={[styles.headingText, { color: colors.textPrimary }]}>
//         {item?.title}
//       </Text>
//       <FlatList
//         data={item.songs}
//         renderItem={({ item: song }) => (
//           <SongCard
//             item={song}
//             containerStyle={{ margin: spacing.sm }}
//             imageStyle={{ borderRadius: 10 }}
//             handlePlay={(selectedTrack) => handlePlayTrack(selectedTrack, item.songs)}
//           />
//         )}
//         horizontal={true}
//         ItemSeparatorComponent={<View style={{ marginHorizontal: spacing.sm }} />}
//         contentContainerStyle={{
//           paddingHorizontal: spacing.lg,
//         }}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// export default SongCardWithCategory;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headingText: {
//     fontSize: fontSizes.lg,
//     fontFamily: fontFamilies.bold,
//     paddingVertical: spacing.lg,
//     paddingHorizontal: spacing.lg,
//   },
// });
