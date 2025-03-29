import {
  ActivityIndicator,
  Alert,
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
import {
  GlobeIcon,
  IconPlus,
  KibupIcon,
  leftArrow,
  play,
  playFocus,
} from '../assets/icons/icons';
import {NavigProps} from '../interfaces/NaviProps';
import {useGetCatetgorisAudioQuery} from '../redux/apiSlices/HomeSlice';
import {usePostStoyMutation} from '../redux/apiSlices/StorySlice';

type Props = {};

const MyStories = ({navigation, route}: NavigProps<string>) => {
  const item = route?.params?.item;

  const {data, isLoading, isError} = useGetCatetgorisAudioQuery(item?.id);
  const [postStoy] = usePostStoyMutation();
  // console.log('category data', data?.data?.audios?.data);

  // console.log('myStory item', item);
  const handleStoryPreview = item => {
    // console.log('20 +++++++++++++++', item);
    navigation.navigate('SrotyPreview', {
      selectedTrack: item,
      trackList: data?.data?.audios?.data,
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

  const handlePostStory =async () => {
    
    console.log('click');
    const formData = new FormData()
    formData?.append("category_id", item?.id)
    const res = await postStoy(formData)
    console.log("ress", res)
    if(res?.error){
      Alert?.alert("Story already exist")
    }
  };
  return (
    <ScrollView contentContainerStyle={tw` bg-white flex-1`}>
      <View style={tw`flex-row justify-between items-center p-[4%]`}>
        {/* <Image
          style={tw`w-24 h-11`}
          source={require('../assets/imgages/SplashLgo.png')}
        /> */}
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <SvgXml xml={leftArrow} width={25} height={25} />
        </TouchableOpacity>
        {/* <Text style={tw`text-black font-bold text-lg`}>My stories</Text>
        <View></View> */}
      </View>
      <View style={tw``}>
        <View style={tw`relative`}>
          <Image style={tw`w-full h-50`} source={{uri: item?.artwork}} />
          <View style={tw`absolute bottom-0`}>
            <Text style={tw`text-white text-lg px-[4%]`}>{item?.title}</Text>
            <TouchableOpacity
              onPress={handlePostStory}
              style={tw`px-[4%] py-2 flex-row gap-4`}>
              <SvgXml xml={IconPlus} />
              <Text style={tw`text-white`}>My Stories</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={tw`text-textSecondary p-[4%]`}>{item?.stories}</Text>
        <Text style={tw`text-textSecondary p-[4%]`}>{item?.description}</Text>
      </View>
      {/* <View style={tw`my-4 py-4 border-t-2 border-b-2 border-gray-200 mx-[4%]`}>
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-textSecondary`}> 30m 6s</Text>
          <TouchableOpacity
            style={tw`flex-row gap-1 bg-gray-200 p-2 rounded-2xl`}>
            <SvgXml xml={playFocus} />
            <Text>Play all</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <View>
        <FlatList
          data={data?.data?.audios?.data}
          renderItem={({item, index}) => {
            return (
              <View style={tw`px-[4%]`}>
                <TouchableOpacity
                  onPress={() => handleStoryPreview(item)}
                  // onPress={() => navigation?.navigate('SrotyPreview')}
                  style={tw`flex-row gap-4 items-center`}>
                  <Image
                    style={tw`w-14 h-14 rounded-lg mt-2`}
                    source={{uri: item?.artwork}}
                  />
                  <Text style={tw`text-black`}>{item?.title} </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default MyStories;

const styles = StyleSheet.create({});
