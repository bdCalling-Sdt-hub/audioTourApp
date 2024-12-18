import { View, Text, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/inputs/InputText';
import { IconCloseEye, IconLock, IconMail, IconOpenEye } from '../../assets/icons/icons';
import Button from '../../components/buttons/Button';
import Header from '../../components/header/Header';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [isHidePassword, setIsHidePassword] = useState(true);

  // Handle OTP Verification Navigation
  const handleOtpVerification = () => {
    navigation.navigate('otpVerification'); // Corrected the function call syntax
  };

  return (
    <ScrollView contentContainerStyle={tw`p-[4%] bg-white h-full items-center justify-center`}>
            {/* Form Section */}
      <View style={tw`mt-8`}>
        {/* Forgot Password Heading */}
        <Text style={tw`text-[20px] font-bold text-center text-textPrimary`}>
        Create new password
        </Text>
        <Text style={tw`text-sm text-textSecondary mt-1`}>
        You have to create a new password if you forget your password.
        </Text>
      

        {/* Email Input Field */}
        <View style={tw`mt-8 gap-y-4`}>
        <View style={tw`h-12 border border-primaryBase rounded-2xl `}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconLock}
              placeholder="Enter new password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>
        <View style={tw`h-12 border border-primaryBase rounded-2xl `}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconLock}
              placeholder="Enter comfirm password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>

          {/* Submit Button */}
          <Button containerStyle={tw`bg-primaryBase border-0`} textStyle={tw`text-white`} onPress={()=>navigation.navigate('login')} title="Login" />
        </View>
      </View>
      <StatusBar translucent={false}/>
    </ScrollView>
  );
};

export default ForgetPassword;