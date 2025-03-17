import {
  ActivityIndicator,
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
import { useGetAllFavoriteQuery } from '../redux/apiSlices/favoriteSlice';
  
  type Props = {};
  
  const BookMarkScreen = ({navigation}: NavigProps<string>) => {
    const {data:bookMark, isLoading, isError} = useGetAllFavoriteQuery({})
  console.log("all story", bookMark?.data?.data)
  // console.log('data', data?.data);
  const handleStoryPreview = item => {
    console.log("20 +++++++++++++++", item)
    navigation.navigate('SrotyPreview', {
      selectedTrack: item,
      trackList: bookMark?.data?.data,
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
      <ScrollView contentContainerStyle={tw` bg-white p-[4%] flex-1`}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={tw`flex-row items-center`}>
          <SvgXml xml={lessThanIcon} width={20} height={20} />
        
            <Text style={tw`text-textPrimary text-xl`}>Bookmark Screen</Text>
           
        </TouchableOpacity>
        <Text style={tw`text-textSecondary px-5`}>
              Here you can find your bookmark audio.
            </Text>
          
            <View>
        <FlatList
          // horizontal
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={bookMark?.data?.data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleStoryPreview(item)}
                style={tw`mr-2 my-3 rounded-lg`}>
                <Image
                  style={tw`w-38 h-32 rounded-lg`}
                  source={{uri: item?.artwork}}
                />
                <Text style={tw``}>{item?.title.slice(0, 12) + '...'}</Text>
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
  
  export default BookMarkScreen;
  
  const styles = StyleSheet.create({});
  