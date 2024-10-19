import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/inputs/InputText';
import {
  IconCloseEye,
  IconFacebook,
  IconGoogle,
  IconLock,
  IconMail,
  IconOpenEye,
  IconUser,
} from '../../assets/icons/icons';
import { Checkbox } from 'react-native-ui-lib';
import Button from '../../components/buttons/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for your navigation routes
type RootStackParamList = {
  login: undefined;
  forgetPassword: undefined;  // Define forgetPassword route
  signUp: undefined;
  home: undefined;
};

// Define the type for the navigation prop
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'login'>;

const Login = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  
  // Use typed navigation for better safety
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  const handleForgetPassword = () => {
    navigation.navigate('forgetPassword');
  };
const handleLogin = ()=> {
  navigation.navigate('BottomHome')
}
  return (
    <ScrollView style={tw`p-[4%] bg-primaryBase h-full`}>
      <Text style={tw`text-center text-primary text-3xl font-LexDecaBold`}>
        Audio Tour
      </Text>

      {/* form */}
      <View style={tw`mt-8`}>
        <Text style={tw`text-3xl font-LexDecaBold text-primary200`}>Login</Text>
        <Text style={tw`text-sm font-LexDecaRegular text-primary300 mt-1`}>
          Log In with your data that you entered during your registration
        </Text>
        
        <View style={tw`mt-8 gap-y-4`}>
          {/* Email Input */}
          <View style={tw`h-14`}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconMail}
              placeholder="Your E-mail"
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>

          {/* Password Input */}
          <View style={tw`h-14`}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconLock}
              placeholder="Enter your password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>
          
          {/* Password instructions */}
          <Text style={tw`text-darkSub text-xs font-LexDecaMedium`}>
            Password needs to be at least 8 characters long. Contain at least 1 number and 1 symbol.
          </Text>

          {/* Log In Button */}
          <Button onPress={handleLogin} title="Log In" />

          {/* Forgot Password */}
          <View style={tw`flex-row justify-end`}>
            <TouchableOpacity onPress={handleForgetPassword}>
              <Text style={tw`font-LexDecaRegular text-sm text-primary50 border-b-primary border-b`}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={tw`flex-row justify-center items-center mt-2`}>
            <Text style={tw`font-LexDecaRegular text-sm text-offWhite text-center`}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
              <Text style={tw`font-LexDecaRegular text-sm text-primary50`}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
