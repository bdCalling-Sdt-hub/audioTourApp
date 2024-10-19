import {View, Text} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import { leftArrow } from '../../assets/icons/icons';


const Header = ({title}: any) => {
  return (
    <View style={tw`flex-row justify-between items-center`}>
      <SvgXml xml={leftArrow} />
      <Text style={tw`text-center text-primary text-3xl font-LexDecaBold`}>
        {title || 'OkProPadel'}
      </Text>
      <View />
    </View>
  );
};

export default Header;
