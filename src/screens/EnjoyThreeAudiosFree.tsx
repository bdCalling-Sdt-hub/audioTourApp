import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigProps} from '../interfaces/NaviProps';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {leftArrow} from '../assets/icons/icons';

type Props = {};

const EnjoyThreeAudiosFree = ({navigation}: NavigProps<string>) => {
  return (
    <View style={tw`flex-1 px-[4%]`}>
      <TouchableOpacity onPress={()=> navigation?.goBack()} style={tw`flex-row gap-4 items-center my-4`}>
        <SvgXml xml={leftArrow} width={25} height={25} color={'black'} />
        <Text style={tw`text-[#00216B] text-lg font-bold `}>Enjoy Three Audios for Free</Text>
      </TouchableOpacity >
      <TouchableOpacity onPress={() => navigation?.navigate('SrotyPreview')} style={tw`flex-row gap-4 items-center`}>
        <Image source={require('../assets/imgages/freeVideoimg1.png')}/>
       <Text> Atlanta, Georgia</Text>
      </TouchableOpacity>
      <View style={tw`flex-row gap-4 items-center my-2`}>
        <Image source={require('../assets/imgages/freeVideoimg1.png')}/>
       <Text> Atlanta, Georgia</Text>
      </View>
      <View style={tw`flex-row gap-4 items-center`}>
        <Image source={require('../assets/imgages/freeVideoimg1.png')}/>
       <Text> Atlanta, Georgia</Text>
      </View>
      <View style={tw`flex-row gap-4 items-center my-2`}>
        <Image source={require('../assets/imgages/freeVideoimg1.png')}/>
       <Text> Atlanta, Georgia</Text>
      </View>
      <View style={tw`flex-row gap-4 items-center`}>
        <Image source={require('../assets/imgages/freeVideoimg1.png')}/>
       <Text> Atlanta, Georgia</Text>
      </View>
      <StatusBar translucent={false}/>
    </View>
  );
};

export default EnjoyThreeAudiosFree;

const styles = StyleSheet.create({});
