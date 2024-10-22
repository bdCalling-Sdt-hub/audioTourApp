import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  NativeModules,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {fontSizes, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import PlayerRepeatToggle from '../components/player/PlayerRepeatToggle';
import PlayerShuffleToggle from '../components/player/PlayerShuffleToggle';
import PlayerProgressBar from '../components/player/PlayerProgressBar';
import {
  GoToForwardButton,
  GoToPreviousButton,
  PlayPauseButton,
} from '../components/player/playerControls';
import {useNavigation, useTheme} from '@react-navigation/native';
import useLikedSongs from '../store/LikeStore';
import {isExist} from '../utils';

const {MusicControlModule} = NativeModules;

interface MusicControlModuleType {
  startForegroundService: (url: string) => Promise<void>;
  stopForegroundService: () => Promise<void>;
  play: (url: string) => Promise<string>;
  pause: () => Promise<string>;
  stop: () => Promise<string>;
  toggleMute: (isMute: boolean) => Promise<string>; // Add this line
}

const MusicControl: MusicControlModuleType =
  MusicControlModule as MusicControlModuleType;

const PlayerScreen: React.FC = ({route}) => {
  const {colors} = useTheme();
  const {likedSongs, addToLiked} = useLikedSongs();
  const navigation = useNavigation();
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Keep track of the index
  const {selectedTrack, trackList} = route.params || {};

  useEffect(() => {
    console.log('Selected Track:', selectedTrack);
    console.log('Track List:', trackList);
    if (selectedTrack && trackList) {
      const selectedTrackIndex = trackList.findIndex(
        track => track.url === selectedTrack.url,
      );
      if (selectedTrackIndex !== -1) {
        setCurrentTrackIndex(selectedTrackIndex);
        playMusic(selectedTrack.url);
      }
    }
  }, [selectedTrack, trackList]);

  if (!selectedTrack || !trackList || trackList.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No track selected or track list is empty</Text>
      </View>
    );
  }
  const playMusic = (trackUrl: string): void => {
    MusicControl.play(trackUrl)
      .then((message: string) => {
        setIsPlaying(true);
      })
      .catch((error: any) =>
        Alert.alert('Error', 'Unable to play music: ' + error),
      );
  };

  const pauseMusic = (): void => {
    MusicControl.pause()
      .then((message: string) => {
        setIsPlaying(false);
      })
      .catch((error: any) =>
        Alert.alert('Error', 'Unable to pause music: ' + error),
      );
  };

  const handleSkipToNext = () => {
    if (currentTrackIndex < trackList.length - 1) {
      const nextTrack = trackList[currentTrackIndex + 1];
      setCurrentTrackIndex(currentTrackIndex + 1); // Update state outside of render
      playMusic(nextTrack.url); // Play next track
    } else {
      Alert.alert('Error', 'No next track available');
    }
  };

  const toggleVolume = async () => {
    try {
      await MusicControl.toggleMute(!isMute); // Pass the opposite of the current mute state
      setIsMute(!isMute); // Directly toggle the state in the app
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const handleSkipToPrevious = () => {
    if (currentTrackIndex > 0) {
      const previousTrack = trackList[currentTrackIndex - 1];
      setCurrentTrackIndex(currentTrackIndex - 1); // Update state outside of render
      playMusic(previousTrack.url); // Play previous track
    } else {
      Alert.alert('Error', 'No previous track available');
    }
  };

  // if (!trackList || !currentTrackIndex || !trackList[currentTrackIndex]) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         backgroundColor: colors.background,
  //       }}
  //     >
  //       <ActivityIndicator size={'large'} color={colors.iconPrimary} />
  //     </View>
  //   );
  // }

  const currentTrack = trackList[currentTrackIndex];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: colors.textPrimary}]}>
          Playing Now
        </Text>
      </View>

      <View style={styles.coverImgContainer}>
        <Image source={{uri: currentTrack?.artwork}} style={styles.coverImg} />
      </View>

      <View style={styles.titleRowHeartContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: colors.textPrimary}]}>
            {currentTrack?.title}
          </Text>
          <Text style={[styles.artist, {color: colors.textSecondary}]}>
            {currentTrack?.artist}
          </Text>
        </View>
        <TouchableOpacity onPress={() => addToLiked(currentTrack)}>
          <AntDesign
            name={isExist(likedSongs, currentTrack) ? 'heart' : 'hearto'}
            color={colors.iconSecondary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.playerControlContainer}>
        <TouchableOpacity style={styles.volumeWrapper} onPress={toggleVolume}>
          <Feather
            name={isMute ? 'volume-x' : 'volume-1'}
            color={colors.iconSecondary}
            size={iconSizes.lg}
          />
        </TouchableOpacity>

        <View style={styles.repeatShuffleWrapper}>
          <PlayerRepeatToggle />
          <PlayerShuffleToggle />
        </View>
      </View>

      <PlayerProgressBar />

      <View style={styles.playPauseContainer}>
        <GoToPreviousButton
          previousTrackUrl={
            currentTrackIndex > 0 ? trackList[currentTrackIndex - 1].url : null
          }
          onSkipToPrevious={handleSkipToPrevious}
          size={iconSizes.xl}
        />
        <PlayPauseButton
          size={iconSizes.xl}
          isPlaying={isPlaying}
          onPlayPause={() =>
            isPlaying ? pauseMusic() : playMusic(currentTrack.url)
          }
        />
        <GoToForwardButton
          nextTrackUrl={
            currentTrackIndex < trackList.length - 1
              ? trackList[currentTrackIndex + 1].url
              : null
          }
          onSkipToNext={handleSkipToNext}
          size={iconSizes.xl}
        />
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.medium,
    flex: 1,
    alignItems: 'center',
  },
  coverImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  coverImg: {
    height: 260,
    width: 260,
    borderRadius: 10,
  },
  titleRowHeartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.medium,
  },
  artist: {
    fontSize: fontSizes.md,
  },
  playerControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  volumeWrapper: {
    flex: 1,
  },
  repeatShuffleWrapper: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  playPauseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
  },
});
