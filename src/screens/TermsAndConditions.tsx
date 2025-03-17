import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {IconBack, leftArrow} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import Button from '../components/buttons/Button';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook
import { useGetTermsQuery } from '../redux/apiSlices/drawerSlices';

const TermsAndConditions = () => {
  const navigation = useNavigation(); // Initialize navigation
  const {data, isLoading, isError} = useGetTermsQuery({})
  console.log("terms", data?.page?.content)

  // Define the handleGoBack function
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 px-[4%] pb-[4%] bg-white`}>
      <View style={tw``}>
        <TouchableOpacity onPress={handleGoBack} style={tw`py-6 px-4 flex-row gap-2`}>
          <SvgXml xml={leftArrow} width={25} height={25} />
          <Text style={tw`text-textPrimary text-base`}>
           Terms and Conditions
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        

        <View style={tw` gap-2 my-6`}>
          <Text style={tw`text-textPrimary text-xl`}>Clause 1</Text>
          <Text style={tw`text-textSecondary mt-1 leading-6`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>

        {/* Additional clauses */}
       <Text>{data?.page?.content}</Text>
      </ScrollView>

      {/* <Button title="Accept & Continue" textStyle={tw`text-white font-bold`} containerStyle={tw`bg-primaryBase border-0 mt-4`} /> */}
    </View>
  );
};

export default TermsAndConditions;
