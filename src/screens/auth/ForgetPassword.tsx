import { View, Text, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/inputs/InputText';
import { IconMail } from '../../assets/icons/icons';
import Button from '../../components/buttons/Button';
import Header from '../../components/header/Header';
import { useNavigation } from '@react-navigation/native';
import { NavigProps } from '../../interfaces/NaviProps';

const ForgetPassword = ({navigation}:NavigProps<string>) => {


  // Handle OTP Verification Navigation
  const handleOtpVerification = () => {
    navigation.navigate('newPassword'); // Corrected the function call syntax
  };

  return (
    <ScrollView contentContainerStyle={tw`p-[4%] bg-white h-full items-center justify-center`}>
            {/* Form Section */}
      <View style={tw`mt-8`}>
        {/* Forgot Password Heading */}
        <Text style={tw`text-[20px] font-bold text-center text-textPrimary`}>
          Forgot Password?
        </Text>
        <Text style={tw`text-sm text-textSecondary mt-1`}>
        Enter your email which was use to create Puerto account.
        </Text>
      

        {/* Email Input Field */}
        <View style={tw`mt-8 gap-y-4`}>
          <View style={tw`h-14 border border-textSecondary rounded-2xl`}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconMail}
              placeholder="Your E-mail"
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>

          {/* Submit Button */}
          <Button containerStyle={tw`bg-primaryBase border-0`} textStyle={tw`text-white`} onPress={handleOtpVerification} title="Submit" />
        </View>
      </View>
      <StatusBar translucent={false}/>
    </ScrollView>
  );
};

export default ForgetPassword;