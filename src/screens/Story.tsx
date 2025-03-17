import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {BookmarkIcon, LoveIcon} from '../assets/icons/icons';
import {NavigProps} from '../interfaces/NaviProps';
import {useGetAllStoyQuery, useGetAudioHistoryQuery} from '../redux/apiSlices/StorySlice';
import { useGetAllFavoriteQuery } from '../redux/apiSlices/favoriteSlice';

type Props = {};


const Story = ({navigation}: NavigProps<string>) => {
  const {data, isLoading, isError} = useGetAudioHistoryQuery({});
  const {data:allStory} = useGetAllStoyQuery({})
  const {data:favorite} = useGetAllFavoriteQuery({})
  const {data:bookMark} = useGetAllFavoriteQuery({})
  console.log("all story", bookMark?.data?.data)
  // console.log('data', data?.data);
  const handleStoryPreview = item => {
    console.log("20 +++++++++++++++", item)
    navigation.navigate('SrotyPreview', {
      selectedTrack: item,
      trackList: data?.data,
    });
  };
  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#064145" />
        <Text style={tw`text-primary mt-2`}>Loading ....</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={tw`flex-1 p-[4%]`}>
      <Text style={tw`text-textPrimary font-bold`}>Recent Stories</Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data?.data}
          renderItem={({item, index}) => {
           
            return (
              <TouchableOpacity
              onPress={()=>handleStoryPreview(item)}
              style={tw`mr-2 my-3 rounded-lg`}>
                <Image style={tw`w-28 h-28 rounded-lg`} source={{uri: item?.artwork}} />  
                <Text style={tw``}>{item?.title.slice(0, 12,)+ "..."}</Text>   
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => (item.id ? item.id : `${index}`)} // Ensuring uniqueness
        />
      </View>
      {/* ==================My stories ++++++++++++++++ */}
      <Text style={tw`text-textPrimary font-bold`}>My Stories</Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={allStory?.data?.data}
          renderItem={({item, index}) => {
           
            return (
              <TouchableOpacity 
              onPress={() => navigation.navigate('MyStories', {item: item})}
              style={tw`mr-2 my-3 rounded-lg`}>
                <Image style={tw`w-28 h-28 rounded-lg`} source={{uri: item?.artwork}} />  
                <Text style={tw``}>{item?.title.slice(0, 12,)+ "..."}</Text>   
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => (item.id ? item.id : `${index}`)} // Ensuring uniqueness
        />
      </View>
      <View>
        
        <TouchableOpacity
          onPress={() => navigation?.navigate('FavoriteScreen')}
          style={tw`flex-row items-center gap-4 py-8`}>
          <TouchableOpacity
            onPress={() => navigation?.navigate('FavoriteScreen')}
            style={tw`border border-gray-300 p-3 rounded-lg`}>
            <SvgXml style={tw``} xml={LoveIcon} width={30} height={30} />
          </TouchableOpacity>
          <Text style={tw`text-textPrimary font-bold`}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('BookMarkScreen')}
          style={tw`flex-row items-center gap-4`}>
          <View style={tw`border border-gray-300 p-3 rounded-lg`}>
            <SvgXml xml={BookmarkIcon} width={30} height={30} />
          </View>
          <TouchableOpacity
            onPress={() => navigation?.navigate('BookMarkScreen')}>
            <Text style={tw`text-textPrimary font-bold`}>Bookmarks</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default Story;
