import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  GlobeIcon,
  KibupIcon,
  leftArrow,
  play,
  playFocus,
} from '../assets/icons/icons';
import {NavigProps} from '../interfaces/NaviProps';

type Props = {};

const MyStories = ({navigation}: NavigProps<string>) => {
  return (
    <ScrollView contentContainerStyle={tw` bg-white`}>
      <View style={tw`flex-row justify-between items-center p-[4%]`}>
        {/* <Image
          style={tw`w-24 h-11`}
          source={require('../assets/imgages/SplashLgo.png')}
        /> */}
        <TouchableOpacity onPress={()=>navigation?.goBack()}>
          <SvgXml xml={leftArrow} width={25} height={25} />
        </TouchableOpacity>
        <View style={tw`flex-row`}>
          <SvgXml xml={GlobeIcon} width={25} height={25} />
          <SvgXml xml={KibupIcon} width={25} height={25} />
        </View>
      </View>
      <View style={tw``}>
        <Image
          style={tw`w-full`}
          source={require('../assets/imgages/StoryOnClick.png')}
        />
        <Text style={tw`text-textSecondary p-[4%]`}>
          9 STORIES - 29 MINUTES 28 SECONDS
        </Text>
        <Text style={tw`text-textSecondary p-[4%]`}>
          Lorem ipsum dolor sit amet consectetur. Vel pulvinar mauris semper leo
          malesuada aenean et dui dui. Nibh mattis faucibus bibendum amet sit
          volutpat. Eu hendrerit netus in egestas non. In magna magna posuere
          pharetra laoreet. Lorem ipsum dolor sit amet consectetur. Vel pulvinar
          mauris semper leo malesuada aenean et dui dui. Nibh mattis faucibus
          bibendum amet sit volutpat. Eu hendrerit netus in egestas non. In
          magna magna posuere pharetra laoreet.
        </Text>
      </View>
      <View style={tw`my-4 py-4 border-t-2 border-b-2 border-gray-200 mx-[4%]`}>
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-textSecondary`}>11 pins 30m 6s</Text>
          <TouchableOpacity
            style={tw`flex-row gap-1 bg-gray-200 p-2 rounded-2xl`}>
            <SvgXml xml={playFocus} />
            <Text>Play all</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`px-[4%] my-4`}>
      <TouchableOpacity onPress={() => navigation?.navigate('SrotyPreview')} style={tw`flex-row gap-4 items-center`}>
        <Image source={require('../assets/imgages/freeVideoimg1.png')}/>
       <Text> Atlanta, Georgia</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation?.navigate('SrotyPreview')} style={tw`flex-row gap-4 items-center py-2`}>
        <Image source={require('../assets/imgages/freeVideoimg1.png')}/>
       <Text> Atlanta, Georgia</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation?.navigate('SrotyPreview')} style={tw`flex-row gap-4 items-center`}>
        <Image source={require('../assets/imgages/freeVideoimg1.png')}/>
       <Text> Atlanta, Georgia</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation?.navigate('SrotyPreview')} style={tw`flex-row gap-4 items-center py-2`}>
        <Image source={require('../assets/imgages/freeVideoimg1.png')}/>
       <Text> Atlanta, Georgia</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation?.navigate('SrotyPreview')} style={tw`flex-row gap-4 items-center`}>
        <Image source={require('../assets/imgages/freeVideoimg1.png')}/>
       <Text> Atlanta, Georgia</Text>
      </TouchableOpacity>
      </View>
      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default MyStories;

const styles = StyleSheet.create({});
