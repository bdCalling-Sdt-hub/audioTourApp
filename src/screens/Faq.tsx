import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconBack, leftArrow, lessThanIcon} from '../assets/icons/icons';
import Expend from '../components/expend/Expend';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import { useGetFaqQuery } from '../redux/apiSlices/drawerSlices';

const Faq = () => {
  const navigation = useNavigation(); // Initialize navigation
  const {data, isLoading, isError} = useGetFaqQuery({})
  console.log("faq", data?.page?.content)

  // Define handleBack function
  const handleBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row`}>
        <TouchableOpacity onPress={handleBack} style={tw`py-6 px-4 flex-row gap-2 items-center`}>
          <SvgXml xml={leftArrow} width={25} height={25} />
          <Text style={tw`text-textPrimary text-2xl`}>
          FAQ
        </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`px-[4%] gap-1  pb-6`}>
        
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6 px-[4%]`}>
       <Text>{data?.page?.content}</Text>
      </ScrollView>
    </View>
  );
};

export default Faq;
