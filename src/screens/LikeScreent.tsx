import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
// import { colors } from '../../constants/color';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { fontSizes, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import SongCard from '../components/player/SongCard';
import FloatingPlayer from '../components/player/FloatingPlayer';
import useLikedSongs from '../store/LikeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

// Define types for navigation and song objects
type Song = {
  id: string;
  title: string;
  artist: string;
  url: string;
};

type NavigationProp = {
  goBack: () => void;
};

const LikeScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { likedSongs, addToLiked } = useLikedSongs();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePlayTrack = async (selectedTrack: Song, songs: Song[] = likedSongs) => {
    console.log('click');
    const trackIndex = songs.findIndex((track) => track.url === selectedTrack.url);

    if (trackIndex === -1) {
      return;
    }

    const beforeTracks = songs.slice(0, trackIndex);
    const afterTracks = songs.slice(trackIndex + 1);

    console.log('beforeTracks', beforeTracks);
    console.log('afterTracks', afterTracks);

    await TrackPlayer.reset();
    await TrackPlayer.add(selectedTrack);
    await TrackPlayer.add(afterTracks);
    await TrackPlayer.add(beforeTracks);
    await TrackPlayer.play();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign name={'arrowleft'} color={colors.iconPrimary} size={iconSizes.md} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons name={'equalizer'} color={colors.iconPrimary} size={iconSizes.md} />
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={
          <Text style={[styles.headingText, { color: colors.textPrimary }]}>Liked Songs</Text>
        }
        data={likedSongs}
        renderItem={({ item }: { item: Song }) => (
          <SongCard
            containerStyle={{ width: '47%' }}
            imageStyle={{ height: 160, width: 160 }}
            item={item}
            handlePlay={(item: Song) => {
              handlePlayTrack(item);
            }}
          />
        )}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 500,
          paddingHorizontal: spacing.lg,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: spacing.lg,
        }}
      />
      <FloatingPlayer />
    </View>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  headingText: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.bold,
  },
});
