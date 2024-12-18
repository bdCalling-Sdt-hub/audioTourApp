import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {BookmarkIcon, LoveIcon} from '../assets/icons/icons';
import {NavigProps} from '../interfaces/NaviProps';

type Props = {};

const DATA = [
  {
    id: 1,
    image: require('../assets/imgages/recentStories1.png'),
    title: 'The origin of Las Vegas',
    location: 'USA',
  },
  {
    id: 2,
    image: require('../assets/imgages/recentStories2.png'),
    title: 'The rise of Mascau',
    location: 'Asia',
  },
  {
    id: 3,
    image: require('../assets/imgages/recentStories1.png'),
    title: 'The origin of Las Vegas',
    location: 'USA',
  },
  {
    id: 4,
    image: require('../assets/imgages/recentStories1.png'),
    title: 'The rise of Mascau',
    location: 'Asia',
  },
  {
    id: 5,
    image: require('../assets/imgages/recentStories2.png'),
    title: 'The origin of Las Vegas',
    location: 'USA',
  },
  {
    id: 6,
    image: require('../assets/imgages/recentStories1.png'),
    title: 'The rise of Mascau',
    location: 'Asia',
  },
];
const Story = ({navigation}: NavigProps<string>) => {
  return (
    <ScrollView contentContainerStyle={tw`flex-1 p-[4%]`}>
      <Text style={tw`text-textPrimary font-bold`}>Recent Stories</Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={({item}) => {
            return (
              <View style={tw`mr-3 my-3`}>
                <Image source={item?.image} />
                <Text style={tw`text-[10px] mt-1`}>{item?.title}</Text>
                <Text style={tw`text-[10px]`}>{item?.location}</Text>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
      <View>
        <Text style={tw`py-4 text-textPrimary font-bold`}>My Stories</Text>
        <TouchableOpacity
          onPress={() => navigation?.navigate('MyStories')}
          style={tw`flex-row items-center gap-4`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text style={tw`text-textPrimary font-bold`}>Atlanta, Georgia</Text>
        </TouchableOpacity >
        <TouchableOpacity onPress={()=> navigation?.navigate('FavoriteScreen')} style={tw`flex-row items-center gap-4 py-8`}>
          <TouchableOpacity onPress={()=>navigation?.navigate('FavoriteScreen')} style={tw`border border-gray-300 p-3 rounded-lg`}>
            <SvgXml style={tw``} xml={LoveIcon} width={30} height={30} />
          </TouchableOpacity>
          <Text style={tw`text-textPrimary font-bold`}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation?.navigate('BookMarkScreen')} style={tw`flex-row items-center gap-4`}>
          <View style={tw`border border-gray-300 p-3 rounded-lg`}>
            <SvgXml xml={BookmarkIcon} width={30} height={30} />
          </View>
          <TouchableOpacity onPress={()=>navigation?.navigate('BookMarkScreen')}>
          <Text style={tw`text-textPrimary font-bold`}>Bookmarks</Text>
          </TouchableOpacity>
       
        </TouchableOpacity>
      </View>
      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default Story;
