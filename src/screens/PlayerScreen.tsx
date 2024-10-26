import React, { useEffect, useState } from 'react';
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
import { fontSizes, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import PlayerRepeatToggle from '../components/player/PlayerRepeatToggle';
import PlayerShuffleToggle from '../components/player/PlayerShuffleToggle';
import PlayerProgressBar from '../components/player/PlayerProgressBar';
import { useSharedValue } from 'react-native-reanimated';
import {
  GoToForwardButton,
  GoToPreviousButton,
  PlayPauseButton,
} from '../components/player/playerControls';
import { useNavigation, useTheme } from '@react-navigation/native';
import useLikedSongs from '../store/LikeStore';
import { isExist } from '../utils';
import { Slider } from 'react-native-awesome-slider';
import { SvgXml } from 'react-native-svg';
import { backWordwithTime, StarWithRound } from '../assets/icons/icons';

const { MusicControlModule } = NativeModules;

// Define the MusicControlModule Type
interface MusicControlModuleType {
  startForegroundService: (url: string) => Promise<void>;
  stopForegroundService: () => Promise<void>;
  play: (url: string) => Promise<string>;
  pause: () => Promise<string>;
  stop: () => Promise<string>;
  toggleMute: (isMute: boolean) => Promise<string>; // Add this line
}

// Cast NativeModule to the defined type
const MusicControl: MusicControlModuleType =
  MusicControlModule as MusicControlModuleType;

// Define types for the route params
interface RouteParams {
  route: {
    params: {
      selectedTrack: Track;
      trackList: Track[];
    };
  };
}

interface Track {
  url: string;
  title: string;
  artist: string;
  artwork: string;
}

const PlayerScreen: React.FC<RouteParams> = ({ route }) => {
  const { colors } = useTheme();
  const { likedSongs, addToLiked } = useLikedSongs();
  const navigation = useNavigation();
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0); // Keep track of the index
  const { selectedTrack, trackList } = route.params || {};
  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  useEffect(() => {
    if (selectedTrack && trackList) {
      const selectedTrackIndex = trackList.findIndex(
        (track) => track.url === selectedTrack.url
      );
      if (selectedTrackIndex !== -1) {
        setCurrentTrackIndex(selectedTrackIndex);
        playMusic(selectedTrack.url);
      }
    }
  }, [selectedTrack, trackList]);

  if (!selectedTrack || !trackList || trackList.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No track selected or track list is empty</Text>
      </View>
    );
  }

  const playMusic = (trackUrl: string): void => {
    MusicControl.play(trackUrl)
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error: any) =>
        Alert.alert('Error', 'Unable to play music: ' + error)
      );
  };

  const pauseMusic = (): void => {
    MusicControl.pause()
      .then(() => {
        setIsPlaying(false);
      })
      .catch((error: any) =>
        Alert.alert('Error', 'Unable to pause music: ' + error)
      );
  };

  const handleSkipToNext = (): void => {
    if (currentTrackIndex < trackList.length - 1) {
      const nextTrack = trackList[currentTrackIndex + 1];
      setCurrentTrackIndex(currentTrackIndex + 1);
      playMusic(nextTrack.url);
    } else {
      Alert.alert('Error', 'No next track available');
    }
  };

  const toggleVolume = async (): Promise<void> => {
    try {
      await MusicControl.toggleMute(!isMute);
      setIsMute(!isMute);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const handleSkipToPrevious = (): void => {
    if (currentTrackIndex > 0) {
      const previousTrack = trackList[currentTrackIndex - 1];
      setCurrentTrackIndex(currentTrackIndex - 1);
      playMusic(previousTrack.url);
    } else {
      Alert.alert('Error', 'No previous track available');
    }
  };

  const hancleBackwithTime = async () => {
    try {
      // Get the current playback position
      const currentPosition = await MusicControl.getCurrentPosition(); // Should be in milliseconds
  
      // Calculate the new position, 10 seconds back
      const newPosition = Math.max(currentPosition - 10000, 0); // Ensures it doesn't go below 0
  
      // Seek to the new position
      await MusicControl.seekTo(newPosition);
    } catch (error) {
      console.error("Error rewinding track:", error);
      Alert.alert("Error", "Unable to rewind track by 10 seconds");
    }
  };
  
  

  const currentTrack = trackList[currentTrackIndex];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name={'arrowleft'} color={colors.iconPrimary} size={iconSizes.md} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: colors.textPrimary }]}>
          Playing Now
        </Text>
      </View>

      <View style={styles.coverImgContainer}>
        <Image source={{ uri: currentTrack?.artwork }} style={styles.coverImg} />
      </View>

      <View style={styles.titleRowHeartContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {currentTrack?.title}
          </Text>
          <Text style={[styles.artist, { color: colors.textSecondary }]}>
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
        <TouchableOpacity onPress={hancleBackwithTime}>
        <SvgXml xml={backWordwithTime} />
        </TouchableOpacity>
     
        {/* <GoToPreviousButton
          previousTrackUrl={currentTrackIndex > 0 ? trackList[currentTrackIndex - 1].url : null}
          onSkipToPrevious={handleSkipToPrevious}
          size={iconSizes.xl}
        /> */}
        <GoToPreviousButton
          previousTrackUrl={currentTrackIndex > 0 ? trackList[currentTrackIndex - 1].url : null}
          onSkipToPrevious={handleSkipToPrevious}
          size={iconSizes.xl}
        />
        <PlayPauseButton
          size={iconSizes.xl}
          isPlaying={isPlaying}
          onPlayPause={() => (isPlaying ? pauseMusic() : playMusic(currentTrack.url))}
        />
        <GoToForwardButton
          nextTrackUrl={
            currentTrackIndex < trackList.length - 1 ? trackList[currentTrackIndex + 1].url : null
          }
          onSkipToNext={handleSkipToNext}
          size={iconSizes.xl}
        />
      </View>
    </View>
  );
};

export default PlayerScreen;

// Define your styles as before
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
