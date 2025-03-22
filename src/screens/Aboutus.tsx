import {
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
import {leftArrow} from '../assets/icons/icons';
import {NavigProps} from '../interfaces/NaviProps';
import {useGetAboutQuery} from '../redux/apiSlices/drawerSlices';

type Props = {};

const Aboutus = ({navigation}: NavigProps<string>) => {
  const {data, isLoading, isError} = useGetAboutQuery({});
  console.log('data', data?.page?.content);

  return (
    <ScrollView style={tw`flex-1 px-[4%]`}>
      <View style={tw`flex-row`}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={tw`py-6 px-4 flex-row gap-2 items-center`}>
          <SvgXml xml={leftArrow} width={25} height={25} />
          <Text style={tw`text-textPrimary text-2xl`}>About us</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>
        {data?.page?.content}
        </Text>
       </View>
      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default Aboutus;

const styles = StyleSheet.create({});
