import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {IconBack} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import Button from '../components/buttons/Button';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook

const TermsAndConditions = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Define the handleGoBack function
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 px-[4%] pb-[4%] bg-primaryBase`}>
      <View style={tw`flex-row`}>
        <TouchableOpacity onPress={handleGoBack} style={tw`py-6 px-4`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`gap-1 border-b border-b-[#E7E7E7] pb-6`}>
          <Text style={tw`text-secondaryDark font-LexDecaRegular text-base`}>
            AGREEMENT
          </Text>
          <Text style={tw`text-primary200 font-LexDecaBold text-[32px]`}>
            Terms of Service
          </Text>
          <Text style={tw`text-inputBg font-LexDecaRegular text-sm`}>
            Last updated on 5/12/2024
          </Text>
        </View>

        <View style={tw` gap-2 my-6`}>
          <Text style={tw`text-primary300 font-NunitoBold text-xl`}>Clause 1</Text>
          <Text style={tw`text-base font-LexDecaRegular text-offWhite mt-1 leading-6`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>

        {/* Additional clauses */}
        <View style={tw`gap-2 my-6`}>
          <Text style={tw`text-primary300 font-NunitoBold text-xl`}>Clause 2</Text>
          <Text style={tw`text-base font-LexDecaRegular text-offWhite mt-1 leading-6`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>
        <View style={tw`gap-2 my-6`}>
          <Text style={tw`text-primary300 font-NunitoBold text-xl`}>Clause 3</Text>
          <Text style={tw`text-base font-LexDecaRegular text-offWhite mt-1 leading-6`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>

        <View style={tw`gap-2 my-6`}>
          <Text style={tw`text-primary300 font-NunitoBold text-xl`}>Clause 4</Text>
          <Text style={tw`text-base font-LexDecaRegular text-offWhite mt-1 leading-6`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>
      </ScrollView>

      <Button title="Accept & Continue" containerStyle={tw` border-primary mt-4`} />
    </View>
  );
};

export default TermsAndConditions;
