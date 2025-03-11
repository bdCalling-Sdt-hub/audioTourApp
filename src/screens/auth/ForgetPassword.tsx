import {View, Text, ScrollView, StatusBar} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/inputs/InputText';
import {IconMail} from '../../assets/icons/icons';
import Button from '../../components/buttons/Button';
import Header from '../../components/header/Header';
import {useNavigation} from '@react-navigation/native';
import {NavigProps} from '../../interfaces/NaviProps';
import {useResentOtpMutation} from '../../redux/apiSlices/authSlice';

const ForgetPassword = ({navigation}: NavigProps<string>) => {
  const [resentOtp, {isLoading, isError}] = useResentOtpMutation();
  const [email, setEamil] = useState();

  // Handle OTP Verification Navigation
  const handleOtpVerification = async () => {
    try {
      const formData = new FormData()
      formData.append("email", email)
      const res = await resentOtp(formData);
      console.log("res", res)
      navigation.navigate('otpVerification', {email: email, from: "forgetPassword"}); 
    }catch(error) {
      console.log(error)
    }
  // Corrected the function call syntax
  };

  return (
    <ScrollView
      contentContainerStyle={tw`p-[4%] bg-white h-full items-center justify-center`}>
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
              onChangeText={text => setEamil(text)}
              floatingPlaceholder
              svgFirstIcon={IconMail}
              placeholder="Your E-mail"
              style={tw`text-black`}
              focusStyle={tw`border-primary`}
            />
          </View>

          {/* Submit Button */}
          <Button
            containerStyle={tw`bg-primaryBase border-0`}
            textStyle={tw`text-white`}
            onPress={handleOtpVerification}
            title="Submit"
          />
        </View>
      </View>
      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default ForgetPassword;
