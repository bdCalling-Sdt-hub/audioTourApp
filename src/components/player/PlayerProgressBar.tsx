import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { formatSecondsToMinute } from '../../utils/index';
import { NativeModules } from 'react-native';
import { fontSizes, spacing } from '../../constants/dimensions';
import { fontFamilies } from '../../constants/fonts';

// Native Module for controlling music
const { MusicControlModule } = NativeModules;

interface MusicControlModuleType {
  getDuration: () => Promise<number>;
  getCurrentPosition: () => Promise<number>;
  seekTo: (position: number) => Promise<void>;
}

const MusicControl: MusicControlModuleType = MusicControlModule as MusicControlModuleType;

const PlayerProgressBar = () => {
  const { colors } = useTheme();
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const progress = useSharedValue(0.25);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);

  useEffect(() => {
    // Fetch the duration and position when the component mounts
    const fetchMediaInfo = async () => {
      try {
        const mediaDuration = await MusicControl.getDuration();
        const currentPosition = await MusicControl.getCurrentPosition();
        setDuration(mediaDuration);
        setPosition(currentPosition);
      } catch (error) {
        console.error('Error fetching media info:', error);
      }
    };

    const interval = setInterval(fetchMediaInfo, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isSliding.value) {
      progress.value = duration > 0 ? position / duration : 0;
    }
  }, [position, duration, isSliding.value]);

  const trackElapsedTime = formatSecondsToMinute(position);
  const trackRemainingTime = formatSecondsToMinute(duration - position);

  return (
    <View>
      <View style={styles.timeRow}>
        <Text style={[styles.timeText, { color: colors.textPrimary }]}>{trackElapsedTime}</Text>
        <Text style={[styles.timeText, { color: colors.textPrimary }]}>
          {'-'}{trackRemainingTime}
        </Text>
      </View>
      <Slider
        style={styles.sliderContainer}
        containerStyle={{
          height: 7,
          borderRadius: spacing.sm,
        }}
        // theme={{
        //   maximumTrackTintColor: colors.maximumTintcolor,
        //   minimumTrackTintColor: colors.minimumTintcolor,
        // }}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        thumbWidth={18}
        renderBubble={() => null}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async (value) => {
          const newPosition = value * duration;
          setPosition(newPosition); // Update position optimistically while sliding
        }}
        onSlidingComplete={async (value) => {
          isSliding.value = false;
          const newPosition = value * duration;
          setPosition(newPosition); // Update position after sliding is complete
          await MusicControl.seekTo(newPosition); // Seek to the new position
        }}
      />
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    opacity: 0.75,
  },
  sliderContainer: {
    marginVertical: spacing.xl,
  },
});
