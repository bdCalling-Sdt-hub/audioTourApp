import { StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

interface MovingTextProps {
  text: string;
  animationThreshold: number;
  style?: object;
}

const MovingText: React.FC<MovingTextProps> = ({ text, animationThreshold, style }) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = text.length >= animationThreshold;
  const textWidth = text.length * 10; // Adjusted the text width multiplier for better readability.

  useEffect(() => {
    if (!shouldAnimate) return;

    // Start the animation after a delay and keep it repeating
    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 5000,
          easing: Easing.linear,
        }),
        -1, // Infinite repeat
        true // Reverse after each iteration
      )
    );

    // Cleanup function to stop the animation when the component unmounts
    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [text, animationThreshold, textWidth, translateX, shouldAnimate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        animatedStyle,
        style,
        shouldAnimate && {
          width: 9999, // Ensure the text has enough space for animation
          paddingLeft: 16,
        },
      ]}
    >
      {text}
    </Animated.Text>
  );
};

export default MovingText;

const styles = StyleSheet.create({});
