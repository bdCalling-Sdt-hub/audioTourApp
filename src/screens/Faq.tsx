import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconBack} from '../assets/icons/icons';
import Expend from '../components/expend/Expend';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

const Faq = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Define handleBack function
  const handleBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <View style={tw`flex-1 bg-primaryBase`}>
      <View style={tw`flex-row`}>
        <TouchableOpacity onPress={handleBack} style={tw`py-6 px-4`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
      </View>

      <View style={tw`px-[4%] gap-1  pb-6`}>
        <Text style={tw`text-primary200 font-NunitoExtraBold text-2xl`}>
          Frequently Asked {'\n'}Questions
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}>
        <Expend />
        <Expend />
        <Expend />
        <Expend />
        <Expend />
        <Expend />
      </ScrollView>
    </View>
  );
};

export default Faq;
