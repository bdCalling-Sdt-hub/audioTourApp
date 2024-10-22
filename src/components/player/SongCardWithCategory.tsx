import React from 'react';
import { FlatList, StyleSheet, Text, View, Alert, NativeModules } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import SongCard from './SongCard';
import { fontSizes, spacing } from '../../constants/dimensions';
import { fontFamilies } from '../../constants/fonts';
import { useTheme } from '@react-navigation/native';

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

interface MusicControlModuleType {
  startForegroundService: (url: string) => Promise<void>;
  stopForegroundService: () => Promise<void>;
  play: (url: string) => Promise<string>;
  pause: () => Promise<string>;
  stop: () => Promise<string>;
}

const MusicControl: MusicControlModuleType = MusicControlModule as MusicControlModuleType;

const SongCardWithCategory: React.FC<SongCardWithCategoryProps> = ({ item }) => {
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
      navigation.navigate('PlayerScreen', {
        selectedTrack: selectedTrack,
        trackList: trackList, // Pass the entire track list
      });
    } catch (error) {
      console.error('Error while playing track:', error);
    }
  };

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
