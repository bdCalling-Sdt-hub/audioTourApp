import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {SvgXml} from 'react-native-svg';
import {leftArrow} from '../assets/icons/icons';
import tw from '../lib/tailwind';

const MapOnListScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false)
  const data = route?.params?.data?.nearby_songs?.data || []; // Ensure valid data
  console.log('FlatList Data:', data);

  const handleStoryPreview = item => {
    console.log("20 +++++++++++++++", item)
    navigation.navigate('SrotyPreview', {
      selectedTrack: item,
      trackList: data,
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
    <View style={tw`flex-1 px-[4%] my-2`}>
      {/* Navigation Back Button */}
      <TouchableOpacity
        style={tw`flex-row gap-4 items-center mb-2`}
        onPress={() => navigation.goBack()}>
        <SvgXml xml={leftArrow} />
        <Text style={tw`text-xl text-black font-bold`}>From the map</Text>
      </TouchableOpacity>

      <Text>Adjust the map for more stories</Text>

      {/* FlatList Rendering */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()} // Ensure unique keys
        renderItem={({item}) => {
          console.log('Rendering item:', item); // Debugging to check data
          return (
            <View style={tw`mb-4`}>
              <TouchableOpacity
                onPress={() => handleStoryPreview(item)}
                style={tw`flex-row items-center gap-4 mt-6`}>
                {item?.artwork ? (
                  <Image
                    source={{uri: item?.artwork}}
                    style={tw`w-[40%] h-20 rounded-lg`}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={tw``}>No Image Available</Text>
                )}
                <Text style={tw`text-lg font-bold`}>{item?.title}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <StatusBar translucent={false} />
    </View>
  );
};

export default MapOnListScreen;

const styles = StyleSheet.create({});
