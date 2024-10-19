import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/inputs/InputText';
import { IconMail } from '../../assets/icons/icons';
import Button from '../../components/buttons/Button';
import Header from '../../components/header/Header';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
  const navigation = useNavigation();

  // Handle OTP Verification Navigation
  const handleOtpVerification = () => {
    navigation.navigate('otpVerification'); // Corrected the function call syntax
  };

  return (
    <ScrollView style={tw`p-[4%] bg-primaryBase h-full`}>
      {/* Header */}
      <Header />

      {/* Form Section */}
      <View style={tw`mt-8`}>
        {/* Forgot Password Heading */}
        <Text style={tw`text-[20px] font-LexDecaBold text-primary200`}>
          Forgot Password?
        </Text>
        <Text style={tw`text-sm font-LexDecaRegular text-primary300 mt-1`}>
          We’ll send a verification code to the email address associated with your account.
        </Text>
        {/* Email Masking Placeholder */}
        <Text style={tw`text-sm font-LexDecaRegular text-primary50 mt-1`}>
          alm...@gmail.com
        </Text>

        {/* Email Input Field */}
        <View style={tw`mt-8 gap-y-4`}>
          <View style={tw`h-14`}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconMail}
              placeholder="Your E-mail"
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>

          {/* Submit Button */}
          <Button onPress={handleOtpVerification} title="Submit" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgetPassword;