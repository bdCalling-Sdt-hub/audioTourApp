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
import React from 'react';
import Header from '../components/Header';
import {useGetHomeSectionQuery} from '../redux/apiSlices/HomeSlice';
import tw from '../lib/tailwind';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {};

const HomeScreen = ({navigation}) => {
  const {data, isLoading, isError} = useGetHomeSectionQuery({});
  console.log('home section data', data?.featured?.data);
  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#064145" />
        <Text style={tw`text-primary mt-2`}>Loading ....</Text>
      </View>
    );
  }
  return (
    <View style={tw`flex-1`}>
      <Header />
      <ScrollView>
        {/* Featured */}
        <View style={tw`px-[4%]`}>
          <Text style={tw`text-lg text-black py-2`}>Featured</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data?.featured?.data}
            renderItem={({item, index}) => {
              console.log('feature item', item?.artwork);
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyStories', {item: item})}
                  style={tw` w-50 h-42 mr-2 rounded-2xl`}>
                  <Image
                    style={tw`w-full h-[80%] object-cover overflow-hidden rounded-2xl`}
                    source={{uri: item?.artwork}}
                  />
                  <Text style={tw`text-center`}>{item?.title}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item?.id.toString()}
          />
        </View>
        {/* English */}
        <View style={tw`px-[4%]`}>
          <Text style={tw`text-lg text-black py-2`}>English (Tour)</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data?.english?.data}
            renderItem={({item, index}) => {
              console.log('feature item', item?.artwork);
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyStories', {item: item})}
                  style={tw` w-50 h-42 mr-2 rounded-2xl`}>
                  <Image
                    style={tw`w-full h-[80%] object-cover overflow-hidden rounded-2xl`}
                    source={{uri: item?.artwork}}
                  />
                  <Text style={tw`text-center`}>{item?.title}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item?.id.toString()}
          />
        </View>
        {/* Spanish */}
        <View style={tw`px-[4%]`}>
          <Text style={tw`text-lg text-black py-2`}>Spanish (Tour)</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data?.spanish?.data}
            renderItem={({item, index}) => {
              console.log('feature item', item?.artwork);
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyStories', {item: item})}
                  style={tw` w-50 h-42 mr-2 rounded-2xl`}>
                  <Image
                    style={tw`w-full h-[80%] object-cover overflow-hidden rounded-2xl`}
                    source={{uri: item?.artwork}}
                  />
                  <Text style={tw`text-center`}>{item?.title}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item?.id.toString()}
          />
        </View>
      </ScrollView>
      <StatusBar translucent={false} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
