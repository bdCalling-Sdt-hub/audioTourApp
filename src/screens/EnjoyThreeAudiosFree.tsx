import {FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {NavigProps} from '../interfaces/NaviProps';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {leftArrow} from '../assets/icons/icons';
import SongCardWithCategory from '../components/player/SongCardWithCategory';
import { songWithCategory } from '../data/SongsWithCategory';

const songCategories = [
  {
    id: 1,
    title: 'Relaxing Sounds',
    description: 'Perfect for relaxation and mindfulness',
    image: require('../assets/imgages/freeVideoimg1.png'),
  },
  {
    id: 2,
    title: 'Focus Music',
    description: 'Boost concentration and productivity',
    image: require('../assets/imgages/freeVideoimg1.png'),
  },
  {
    id: 3,
    title: 'Nature Sounds',
    description: 'Immerse in the sounds of nature',
    image: require('../assets/imgages/freeVideoimg1.png'),
  },
];

const EnjoyThreeAudiosFree = ({navigation}: NavigProps<string>) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const handleSongSelect = (song) => {
    setSelectedSong(song);
  }
  return (
    <View style={tw`flex-1 px-[4%]`}>
      <TouchableOpacity onPress={() => navigation?.goBack()} style={tw`flex-row gap-4 items-center my-4`}>
        <SvgXml xml={leftArrow} width={25} height={25} color={'black'} />
        <Text style={tw`text-[#00216B] text-lg font-bold`}>Enjoy Three Audios for Free</Text>
      </TouchableOpacity>

      <FlatList  
    horizontal={false}
      data={songWithCategory} renderItem={({item})=> <SongCardWithCategory
      item={item}
      onSelect={(song) => handleSongSelect(song)}
      />}
      contentContainerStyle={{
        paddingBottom: 400,
      }}
      />
  

      <StatusBar translucent={false} />
    </View>
  );
};

export default EnjoyThreeAudiosFree;

const styles = StyleSheet.create({});
