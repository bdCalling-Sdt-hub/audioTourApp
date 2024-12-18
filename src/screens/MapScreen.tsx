import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {KibupIcon, play, PlayButton} from '../assets/icons/icons';
import { NavigProps } from '../interfaces/NaviProps';
import Header from '../components/Header';

type Props = {};

const MapScreen = ({navigation}:NavigProps<string>) => {
  return (
    <View style={tw`flex-1 p-[4%]`}>
     <Header />   
            {/* View containing the icon */}
      <View
        style={[
          tw`bg-[#DFEAF4] justify-end flex-col`,
          {position: 'absolute', bottom: 0, left: 0, right: 0},
        ]}>
        <View style={tw`flex-row gap-4 py-2 px-[6%]`}>
          <SvgXml xml={PlayButton} width={25} height={25} />
          <Text style={tw`text-textPrimary`}>Atlanta, Georgia</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation?.navigate('EnjoyThreeFreeAudio')} style={tw`flex-row bg-[#00216B] gap-4 py-3 px-[6%]`}>
         
          <Text style={tw`text-white flex mx-auto text-center`}>Enjoy 3 audios free</Text>
        </TouchableOpacity>
      </View>
      <StatusBar translucent={false} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
