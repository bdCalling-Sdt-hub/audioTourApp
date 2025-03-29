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
import {useSharedValue} from 'react-native-reanimated';
import {
  GoToForwardButton,
  GoToPreviousButton,
  PlayPauseButton,
} from '../components/player/playerControls';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import useLikedSongs from '../store/LikeStore';
import {isExist} from '../utils';
import {Slider} from 'react-native-awesome-slider';
import {SvgXml} from 'react-native-svg';
import {
  backWordwithTime,
  IconBookmark,
  IconBookmarkBlack,
  StarWithRound,
} from '../assets/icons/icons';
import {usePostStoreFavoriteMutation} from '../redux/apiSlices/favoriteSlice';
import tw from '../lib/tailwind';
import {usePostStorBookMarkMutation} from '../redux/apiSlices/bookMarkSlice';
import {usePostHistoyMutation} from '../redux/apiSlices/StorySlice';
import {useGetCheckIsSubscribedQuery} from '../redux/apiSlices/subsCriptionSlice';

const {MusicControlModule} = NativeModules;

// Define the MusicControlModule Type
interface MusicControlModuleType {
  startForegroundService: (url: string) => Promise<void>;
  stopForegroundService: () => Promise<void>;
  play: (url: string) => Promise<string>;
  pause: () => Promise<string>;
  stop: () => Promise<string>;
  toggleMute: (isMute: boolean) => Promise<string>; // Add this line
  // newly added
  getCurrentPosition: () => Promise<number>;
  seekTo: (position: number) => Promise<void>;
}

// Cast NativeModule to the defined type
const MusicControl: MusicControlModuleType =
  MusicControlModule as MusicControlModuleType;
console.log('player screen 50', MusicControlModule);
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

const PlayerScreen: React.FC<RouteParams> = ({route}) => {
  const {colors} = useTheme();
  const {likedSongs, addToLiked} = useLikedSongs();
  const {bookMarkSongs, addToBookMark} = useLikedSongs();
  const navigation = useNavigation();
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCheck, setIsCheck] = useState(false)
  const [currentTrackId, setCurrentTrackId] = useState();
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0); // Keep track of the index
  console.log('trackIndex', currentTrackIndex);
  const {selectedTrack, trackList} = route?.params || {};
  const [postStoreFavorite, {isLoading, isError}] =
    usePostStoreFavoriteMutation();
  const [postHistoy] = usePostHistoyMutation();
  const [postStorBookMark] = usePostStorBookMarkMutation();
  const {data, refetch} = useGetCheckIsSubscribedQuery({});
  console.log('is check', data?.is_subscription_required);
  // console.log('playerScreen', selectedTrack?.id);
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

  const playMusic = async (trackUrl: string): void => {
    console.log('playerscreen 102', trackUrl);
     const currentTrackId = trackList[currentTrackIndex]?.id;

    try {
      const formData = new FormData();
      if (selectedTrack?.is_subscription_required) {
        navigation?.navigate('Subscription');
      } else {
      formData.append('audio_id', currentTrackId);
      MusicControl?.play(trackUrl)
        .then(() => {
          console.log('Music started playing:', trackUrl);
          setIsPlaying(true);
        })
        .catch((error: any) => {
          console.log('Error playing music:', error);
          console.log('Error', `Unable to play music: ${error}`);
        });
      const res = await postHistoy(formData);
      console.log('res', res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const playMusic = (trackUrl: string): void => {
  //   if (!trackUrl) {
  //     console.error('Track URL is undefined or empty.');
  //     return;
  //   }

  //   console.log('Attempting to play track URL:', trackUrl);

  //   MusicControl.play(trackUrl)
  //     .then(() => {
  //       console.log("Music started playing:", trackUrl);
  //       setIsPlaying(true);
  //     })
  //     .catch((error: any) => {
  //       console.error("Error playing music:", error);
  //       console.log("Error", `Unable to play music: ${error}`);
  //     });
  // };

  const pauseMusic = (): void => {
    MusicControl?.pause()
      .then(() => {
        setIsPlaying(false);
      })
      .catch((error: any) =>
        console.log('Error', 'Unable to pause music: ' + error),
      );
  };

  const handleSkipToNext = async (): void => {
    const currentTrackId = trackList[currentTrackIndex]?.id;
    if (isCheck?.data?.is_subscription_required === true) {
      navigation?.navigate('Subscription');
    } else {
    if (currentTrackIndex < trackList.length - 1) {
      const nextTrack = trackList[currentTrackIndex + 1];
      setCurrentTrackIndex(currentTrackIndex + 1);
      playMusic(nextTrack.url);
      try {
        const formData = new FormData();
        formData.append('audio_id', currentTrackId);
        const res = await postHistoy(formData);
        console.log('res nesxt', res);
        setIsCheck(res)
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Error', 'No next track available');
    }
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

  const handleSkipToPrevious = async (): void => {
    if (currentTrackIndex > 0) {
      const previousTrack = trackList[currentTrackIndex - 1];
      setCurrentTrackIndex(currentTrackIndex - 1);
      playMusic(previousTrack.url);
      try {
        const formData = new FormData();
        formData.append('audio_id', currentTrackId);
        const res = await postHistoy(formData);
        console.log('res', res);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Error', 'No previous track available');
    }
  };

  const hancleBackwithTime = async () => {
    try {
      // Get the current playback position in seconds
      const currentPosition = await MusicControlModule.getCurrentPosition();

      // Calculate new position, 10 seconds back, converted to milliseconds
      const newPosition = Math.max(currentPosition * 1000 - 10000, 0);

      // Seek to the new position
      await MusicControlModule.seekTo(newPosition);
    } catch (error) {
      console.error('Error rewinding track:', error);
      console.log('Error', 'Unable to rewind track by 10 seconds');
    }
  };

  const currentTrack = trackList[currentTrackIndex];
  const handleSendLove = async currentTrack => {
    console.log('currentTrack', currentTrack?.id);
    const formData = new FormData();
    formData.append('audio_id', currentTrack?.id);
    const res = await postStoreFavorite(formData);
    console.log('love sending res', res);
  };
  const handleBookMark = async currentTrack => {
    console.log('currentTrack', currentTrack?.id);
    const formData = new FormData();
    formData.append('audio_id', currentTrack?.id);
    const res = await postStorBookMark(formData);
    console.log('bookMark store res', res);
  };

  // if (isLoading) {
  //   return (
  //     <View style={tw`flex-1 justify-center items-center`}>
  //       <ActivityIndicator size="large" color="#064145" />
  //       <Text style={tw`text-primary mt-2`}>Loading ....</Text>
  //     </View>
  //   );
  // }

  // useFocusEffect(() => {
  //   const isCheck = data?.is_subscription_required;
  //   console.log('ischeck+++', isCheck);
  //    refetch();
  // });
  // const currentTrack = trackList[currentTrackIndex];
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
        {/* <TouchableOpacity
          onPress={() => {
            handleBookMark(currentTrack), addToLiked(currentTrack);
          }}>
          {isExist(likedSongs, currentTrack) ? (
            <SvgXml xml={IconBookmarkBlack} />
          ) : (
            <SvgXml xml={IconBookmark} />
          )}

          <AntDesign
            name={isExist(likedSongs, currentTrack) ? 'heart' : 'hearto'}
            color={colors.iconSecondary}
            size={iconSizes.md}
          />
        </TouchableOpacity> */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: colors.textPrimary}]}>
            {currentTrack?.title}
          </Text>
          <Text style={[styles.artist, {color: colors.textSecondary}]}>
            {currentTrack?.artist}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSendLove(currentTrack), addToLiked(currentTrack);
          }}>
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

        {/* <View style={styles.repeatShuffleWrapper}>
          <PlayerRepeatToggle />
          <PlayerShuffleToggle />
        </View> */}
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
    height: 200,
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
    fontSize: fontSizes.sm,
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

// import {
//   ActivityIndicator,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';

// // iocnst
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';

// import {fontSizes, iconSizes, spacing} from '../constants/dimensions';
// import {fontFamilies} from '../constants/fonts';
// import PlayerRepeatToggle from '../components/player/PlayerRepeatToggle';
// import PlayerShuffleToggle from '../components/player/PlayerShuffleToggle';
// import PlayerProgressBar from '../components/player/PlayerProgressBar';
// import {
//   GoToForwardButton,
//   GoToPreviousButton,
//   PlayPauseButton,
// } from '../components/player/playerControls';
// import TrackPlayer, {useActiveTrack} from 'react-native-track-player';
// import {useNavigation, useTheme} from '@react-navigation/native';
// // import { setVolume } from 'react-native-track-player/lib/src/trackPlayer';
// import useLikedSongs from '../store/LikeStore';
// import { isExist } from '../utils';

// const imgUri =
//   'https://linkstorage.linkfire.com/medialinks/images/4bc7191b-d494-450e-ae1f-2f74c932bfae/artwork-440x440.jpg';
// const PlayerScreen = () => {
//   const {colors} = useTheme()
//   const {likedSongs, addToLiked} = useLikedSongs();
//   console.log(likedSongs);
//   const navigation = useNavigation();
//   const activeTrack = useActiveTrack();
//   const [isMute, setIsMute] = useState(false);

// useEffect(() => {
//   setVolume();
// }, []);

// const setVolume = async () => {
//   const volume = await TrackPlayer.getVolume();
//   setIsMute(volume === 0 ? true : false);
// }
//   const isLiked = false;

//   const handleGoback = () => {
//     navigation.goBack();
//   };
//   if (!activeTrack) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: colors.background,
//         }}>
//         <ActivityIndicator size={'large'} color={colors.iconPrimary} />
//       </View>
//     );
//   }
//   const handleToggleVolume = () => {
//     TrackPlayer.setVolume(isMute ? 1 : 0);
//     setIsMute(!isMute);
//   };
//   return (
//     <View style={styles.container}>
//       {/* header */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={handleGoback}>
//           <AntDesign
//             name={'arrowleft'}
//             color={colors.iconPrimary}
//             size={iconSizes.md}
//           />
//         </TouchableOpacity>
//         <Text style={[styles.headerText, {  color: colors.textPrimary}]}>Playing Now</Text>
//       </View>
//       {/* Image */}
//       <View style={styles.coverImgContainer}>
//         <Image source={{uri: activeTrack?.artwork}} style={styles.coverImg} />
//       </View>
//       {/* render the title and artist */}
//       <View style={styles.titleRowHeartContainer}>
//         {/* title row conatainer */}
//         <View style={styles.titleContainer}>
//           <Text style={[styles.title, {  color: colors.textPrimary}]}>{activeTrack?.title}</Text>
//           <Text style={[styles.artist, {color: colors.textSecondary,}]}>{activeTrack?.artist}</Text>
//         </View>
//         {/* icon container */}
//         <TouchableOpacity onPress={() => addToLiked(activeTrack)} >
//           <AntDesign
//             name={isExist(likedSongs, activeTrack) ? 'heart' : 'hearto'}
//             color={colors.iconSecondary}
//             size={iconSizes.md}
//           />
//         </TouchableOpacity>
//       </View>
//       {/* Player Control */}
//       <View style={styles.playerControlContainer}>
//         <TouchableOpacity
//           style={styles.volumeWrapper}
//           onPress={handleToggleVolume}>
//           <Feather
//             name={isMute ? 'volume-x' : 'volume-1'}
//             color={colors.iconSecondary}
//             size={iconSizes.lg}
//           />
//         </TouchableOpacity>
//         <View style={styles.repeatShuffleWrapper}>
//           <PlayerRepeatToggle />
//           <PlayerShuffleToggle />
//         </View>
//       </View>
//       <PlayerProgressBar />
//       <View style={styles.playPuaseContainer}>
//         <GoToPreviousButton size={iconSizes.xl} />
//         <PlayPauseButton size={iconSizes.xl} />
//         <GoToForwardButton size={iconSizes.xl} />
//       </View>
//     </View>
//   );
// };

// export default PlayerScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: colors.background,
//     padding: spacing.lg,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   headerText: {

//     textAlign: 'center',
//     fontSize: fontSizes.lg,
//     fontFamily: fontFamilies.medium,
//     flex: 1,
//     alignItems: 'center',
//   },
//   coverImgContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: spacing.xl,
//   },

//   coverImg: {
//     height: 260,
//     width: 260,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: fontSizes.xl,

//     fontFamily: fontFamilies.medium,
//   },
//   artist: {
//     fontSize: fontSizes.md,

//   },

//   titleRowHeartContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   titleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   playerControlContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: spacing.lg,
//   },
//   volumeWrapper: {
//     flex: 1,
//   },
//   repeatShuffleWrapper: {
//     flexDirection: 'row',
//     gap: spacing.md,
//   },
//   playPuaseContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: spacing.xl,
//   },
// });
