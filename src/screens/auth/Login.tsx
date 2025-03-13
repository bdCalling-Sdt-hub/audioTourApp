import {View, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useState} from 'react';
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
import {Checkbox} from 'react-native-ui-lib';
import Button from '../../components/buttons/Button';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SvgXml} from 'react-native-svg';
import { useLoginUserMutation } from '../../redux/apiSlices/authSlice';
import { lStorage, setStorageToken } from '../../utils/utils';

// Define the types for your navigation routes
type RootStackParamList = {
  login: undefined;
  forgetPassword: undefined; // Define forgetPassword route
  signUp: undefined;
  home: undefined;
};

// Define the type for the navigation prop
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'login'
>;

const Login = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {isLoading, isError}] = useLoginUserMutation()

  console.log("email password", email, password)
  // Use typed navigation for better safety
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleForgetPassword = () => {
    navigation.navigate('forgetPassword');
  };
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }
  const fcmtoken = lStorage.getString('fcmToken')
      console.log("fcmToken", fcmtoken)
    const formData = new FormData();
    formData.append('email', email); 
    formData.append('password', password);
    formData.append('device_token', fcmtoken)
  
    console.log('FormData before sending:', formData);
  
    try {
      const res = await login(formData).unwrap(); 
      if(res?.access_token){
      lStorage.setString('token', res?.access_token);
        // setStorageToken(res?.access_token);
        navigation?.replace('LoadingSplash');
      }
     
      console.log('Login successful:', res);
     
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={tw`p-[4%] bg-white h-full items-center justify-center`}>
      {/* form */}
      <View style={tw`mt-8`}>
        <Text style={tw`text-3xl  text-textPrimary font-bold text-center`}>
          Login
        </Text>
        <Text style={tw`text-sm text-center text-textSecondary mt-1`}>
          Log In with your data that you entered during your registration
        </Text>

        <View style={tw`mt-8 gap-y-4 `}>
          {/* Email Input */}
          <View style={tw`h-12 border border-primaryBase rounded-2xl `}>
            <InputText
            
              floatingPlaceholder
              svgFirstIcon={IconMail}
              placeholder="Your E-mail"
              style={tw`text-black`}
              onChangeText={(text)=> setEmail(text)}
              focusStyle={tw`border-primary`}
            />
          </View>

          {/* Password Input */}
          <View style={tw`h-12 border border-primaryBase rounded-2xl `}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconLock}
              placeholder="Enter your password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              onChangeText={(text)=> setPassword(text)}
              style={tw`text-black`}
              focusStyle={tw`border-primary`}
            />
          </View>

          {/* Password instructions */}
          <Text style={tw`text-darkSub text-xs font-LexDecaMedium py-2`}>
            Password needs to be at least 8 characters long. Contain at least 1
            number and 1 symbol.
          </Text>

          {/* Log In Button */}
          <Button
            containerStyle={tw`border-0 bg-primaryBase`}
            textStyle={tw`text-white font-bold`}
            onPress={handleLogin}
            title="Log In"
          />

          {/* Forgot Password */}
          <View style={tw`flex-row justify-end`}>
            <TouchableOpacity onPress={handleForgetPassword}>
              <Text
                style={tw` text-sm text-primaryBase border-b-primary border-b`}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row justify-between items-center px-[6%]`}>
            <View style={tw`border-b-primaryBase border-b-2 w-36`} />
            <Text>or</Text>
            <View style={tw`border-b-primaryBase border-b-2 w-36`} />
          </View>
          <View style={tw`flex-row flex mx-auto gap-4`}>
            <SvgXml xml={IconGoogle} />
            <Text style={tw`text-textPrimary`}>Continue with Google</Text>
          </View>
          {/* Sign Up Link */}
          <View style={tw`flex-row justify-center items-center mt-2`}>
            <Text
              style={tw` text-sm text-textSecondary text-center`}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
              <Text style={tw` text-sm text-primary50`}>
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
