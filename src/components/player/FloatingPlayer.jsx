
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fontSizes, iconSizes, spacing } from '../../constants/dimensions';
import { fontFamilies } from '../../constants/fonts';
import {
  GoToForwardButton,
  GoToPreviousButton,
  PlayPauseButton,
} from './playerControls';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import MovingText from './MovingText';
import { useNavigation, useTheme } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

const imgUrl =
  'https://linkstorage.linkfire.com/medialinks/images/711c0296-c883-4444-9bd4-341dcab24d0b/artwork-440x440.jpg'; // Fallback image URL

const FloatingPlayer = ({ }) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const progress = useSharedValue(0.25);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);
  const isLoading = useSharedValue(false);
  const duration = 300;

  // Handle navigating to the player screen
  const handleOpenPlayerScreen = () => {
    navigation.navigate('PLAYER_SCREEN');
    
  };

  return (
    <View>
      <View style={{ zIndex: 1 }}>
        <Slider
          theme={{
            minimumTrackTintColor: colors.minimumTintcolor,
            maximumTrackTintColor: colors.maximumTintcolor,
          }}
          containerStyle={{
            height: 5,
          }}
          renderBubble={() => null}
          onSlidingStart={() => (isSliding.value = true)}
          onValueChange={async (value) => {
            await TrackPlayer.seekTo(value * duration);
          }}
          onSlidingComplete={async (value) => {
            if (!isLoading.value) {
              return;
            }
            isLoading.value = false;
            await TrackPlayer.seekTo(value * duration);
          }}
          thumbWidth={25}
          style={styles.slider}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
        />
      </View>

      {/* Display the selected song dynamically */}
      {/* {song && ( */}
        <View>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.85}
            onPress={handleOpenPlayerScreen}
          >
            <Image
              source={{ uri: imgUrl || imgUrl }} // Use dynamic artwork or fallback
              style={styles.coverImg}
            />
            <View style={styles.titleContainer}>
              {/* MovingText component for the title */}
              <MovingText
                text={'xyz Unknown Title xyz Unknown Title'} // Dynamic title
                animationThreshold={20}
                style={[styles.title, {color: colors.textPrimary}]}
              />
              {/* Artist name wrapped in Text */}
              <Text style={[styles.artist, { color: colors.textSecondary}]}>{"artist" || 'Unknown Artist'}</Text>
            </View>
            <View style={styles.playerControlContainer}>
              <GoToPreviousButton size={iconSizes.md}/>
              <PlayPauseButton size={iconSizes.lg}/>
              <GoToForwardButton size={iconSizes.md}/>
            </View>
          </TouchableOpacity>
        </View>
      {/* )} */}
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: colors.background,
    padding: spacing.sm,
  },
  coverImg: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    overflow: 'hidden',
    marginLeft: spacing.sm,
    marginRight: spacing.lg,
  },
  title: {
    
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.medium,
  },
  artist: {
   
    fontSize: fontSizes.md,
  },
  playerControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  slider: {
    marginTop: spacing.sm,
  },
});
