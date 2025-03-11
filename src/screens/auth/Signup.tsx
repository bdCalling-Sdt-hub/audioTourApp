import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/inputs/InputText';
import CheckBox from '@react-native-community/checkbox';
import { IconCloseEye, IconFacebook, IconGoogle, IconLock, IconMail, IconOpenEye, IconUser } from '../../assets/icons/icons';
import Button from '../../components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../navigation/types';
import { SvgXml } from 'react-native-svg';
import { useRegisterUserMutation } from '../../redux/apiSlices/authSlice';
import LinearGradient from 'react-native-linear-gradient';

interface SignupDataProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
 
}

const SignUp = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
  const [signupData, setSignupData] = useState<SignupDataProps>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  
  });

  console.log('Signup data', signupData);

  const navigation = useNavigation<NavigationProps>();

  const handleSignup = async () => {
    try {
      // const formData = new FormData();
      // formData.append('full_name', signupData.fullName);
      // formData.append('email', signupData.email);
      // formData.append('password', signupData.password);
      // formData.append('password_confirmation', signupData.confirmPassword);
      const formData = {
        full_name: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
        password_confirmation: signupData.confirmPassword,
      };
      
      // Debugging logs
      console.log("Sending request with data:", signupData);
      
      const res = await registerUser(formData).unwrap();
      console.log('Signup response:', res);
      
      if (res?.success) {
        navigation.navigate('otpVerification', {email: signupData?.email});
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={tw`p-[4%] bg-white h-full items-center justify-center`}>
      <View style={tw`mt-8`}>
        <Text style={tw`text-3xl text-textPrimary font-bold text-center`}>Sign up</Text>
        <Text style={tw`text-sm text-center text-textSecondary mt-1`}>
          Log In with your data that you entered during your registration
        </Text>

        <View style={tw`mt-8 gap-y-4 `}>
          <View style={tw`h-12 border border-primaryBase rounded-2xl`}>
            <InputText
              onChangeText={(text) =>
                setSignupData((prev) => ({
                  ...prev,
                  fullName: text,
                }))
              }
              floatingPlaceholder
              svgFirstIcon={IconUser}
              placeholder="Your Full Name"
              style={tw`text-black`}
              focusStyle={tw`border-primary`}
            />
          </View>

          <View style={tw`h-12 border border-primaryBase rounded-2xl`}>
            <InputText
              onChangeText={(text) =>
                setSignupData((prev) => ({
                  ...prev,
                  email: text,
                }))
              }
              floatingPlaceholder
              svgFirstIcon={IconMail}
              placeholder="Your E-mail"
              style={tw`text-black`}
              focusStyle={tw`border-primary`}
            />
          </View>

          <View style={tw`h-12 border border-primaryBase rounded-2xl`}>
            <InputText
              onChangeText={(text) =>
                setSignupData((prev) => ({
                  ...prev,
                  password: text,
                }))
              }
              floatingPlaceholder
              svgFirstIcon={IconLock}
              placeholder="Enter your password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              style={tw`text-black`}
              focusStyle={tw`border-primary`}
            />
          </View>

          <View style={tw`h-12 border border-primaryBase rounded-2xl`}>
            <InputText
              onChangeText={(text) =>
                setSignupData((prev) => ({
                  ...prev,
                  confirmPassword: text,
                }))
              }
              floatingPlaceholder
              svgFirstIcon={IconLock}
              placeholder="Confirm your password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              style={tw`text-black`}
              focusStyle={tw`border-primary`}
            />
          </View>

          <View style={tw`flex-row items-center gap-2`}>
            <CheckBox
              onCheckColor="#0187D1"
              onFillColor="#0187D1"
              tintColor="#0187D1"
              value={toggleCheckBox}
              onValueChange={(value) => {
                setToggleCheckBox(value)}}
            />
            <Text style={tw`text-xs text-textSecondary`}>I agree to the Terms and Conditions</Text>
          </View>

          <Text style={tw`text-darkSub text-xs font-LexDecaMedium py-2`}>
            Password needs to be at least 8 characters long, contain at least 1 number and 1 symbol.
          </Text>

          <Button
            containerStyle={tw`border-0 bg-primaryBase`}
            textStyle={tw`text-white font-bold`}
            onPress={handleSignup}
            title="Sign up"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
