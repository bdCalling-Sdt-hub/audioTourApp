import {
  FlatList,
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
import {leftArrow, lessThanIcon} from '../assets/icons/icons';
import {NavigProps} from '../interfaces/NaviProps';
import {useGetAllFavoriteQuery} from '../redux/apiSlices/favoriteSlice';

type Props = {};

const FavoriteScreen = ({navigation}: NavigProps<string>) => {
  const {data: favorite} = useGetAllFavoriteQuery({});
  console.log('all story', favorite?.data?.data);
  const handleStoryPreview = item => {
    console.log('20 +++++++++++++++', item);
    navigation.navigate('SrotyPreview', {
      selectedTrack: item,
      trackList: favorite?.data?.data,
    });
  };
  return (
    <ScrollView contentContainerStyle={tw` bg-white p-[4%] flex-1`}>
      <TouchableOpacity
        onPress={() => navigation?.goBack()}
        style={tw`flex-row items-center`}>
        <SvgXml xml={lessThanIcon} width={20} height={20} />

        <Text style={tw`text-textPrimary text-xl`}>Favorite Screen</Text>
      </TouchableOpacity>
      <Text style={tw`text-textSecondary px-5`}>
        Here you can find your favorites audio.
      </Text>
      <View>
        <FlatList
          numColumns={2} // Ensures two columns in the grid
          showsHorizontalScrollIndicator={false}
          data={favorite?.data?.data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleStoryPreview(item)}
                style={tw`flex-1 mr-2 my-3 rounded-lg`} // Use flex-1 to ensure equal width for each item
              >
                <Image
                  style={tw`w-full h-32 rounded-lg`} // Use w-full to make the image fill the column width
                  source={{uri: item?.artwork}}
                />
                <Text style={tw`text-xs mt-2 `}>
                  {item?.title.length > 12
                    ? item?.title.slice(0, 24) + '...'
                    : item?.title}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => (item.id ? item.id : `${index}`)} // Ensuring uniqueness
        />
      </View>

      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
