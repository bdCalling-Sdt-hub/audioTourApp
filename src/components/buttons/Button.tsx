import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  containerStyle?: any;
  style?: any;
  textStyle?: any;
  firstSvg?: any;
  textRightIcon?: any;
}
const Button = ({
  title,
  containerStyle,
  style,
  textStyle,
  firstSvg,
  onPress,
  textRightIcon,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        tw`bg-primary py-4 rounded-2xl flex-row items-center justify-center gap-4 border`,
        containerStyle, style,
      ]}
      onPress={onPress}>
      {firstSvg && <SvgXml xml={firstSvg} />}
      <Text
        style={[
          tw`text-center text-primaryBase text-base font-LexDecaMedium`,
          textStyle,
        ]}>
        {title} {textRightIcon && <SvgXml xml={textRightIcon} />}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
