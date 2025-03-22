import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useGetNotificationQuery} from '../redux/apiSlices/notificationSlice';
import {SvgXml} from 'react-native-svg';
import {IconLeftArrow} from '../assets/icons/icons';
import tw from '../lib/tailwind';

type Props = {};

const NotificationScreen = ({navigation}) => {
  const {data, isLoading, isError} = useGetNotificationQuery({});
  console.log('data', data?.data?.data);
  return (
    <View style={tw`flex-1 px-[4%] my-6`}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={tw`flex-row  items-center gap-4`}>
        <SvgXml xml={IconLeftArrow} />
        <Text style={tw`font-bold text-xl`}>Notifications</Text>
      </TouchableOpacity>
      <View style={tw`mt-6`}>
        <FlatList
          data={data?.data?.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View
              style={tw`${
                index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'
              } p-2 rounded-lg mt-1`}>
              <Text>{item?.data?.message || 'No message available'}</Text>
              <Text>
                {item?.created_at.slice(0, 10) || 'No date available'}
              </Text>
              <Text>
                {item?.created_at.slice(11, 19) || 'No date available'}
              </Text>
            </View>
          )}
        />
      </View>

      <StatusBar translucent={false} />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
