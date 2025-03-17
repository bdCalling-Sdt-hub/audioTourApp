import {View, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import { useLoginUserMutation, usePostSocialLoginMutation } from '../../redux/apiSlices/authSlice';
import { lStorage, setStorageToken } from '../../utils/utils';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ImageResizer from 'react-native-image-resizer';

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
GoogleSignin.configure({
  webClientId:
    '292720943978-eem026vbf56jsrhnfcrrjf6jkkbp2ql7.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});
const Login = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {isLoading, isError}] = useLoginUserMutation()
  const [soicalLogin] = usePostSocialLoginMutation()
  const [googleUser, setGoogleUser] = useState();
  const [resizeImg, setResizeImg] = useState([]); // Initialize as an array

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
  
  useEffect(() => {
    if (googleUser?.photo) {
      const processImage = async () => {
        try {
          const resizedImage = await ImageResizer.createResizedImage(
            googleUser.photo,
            96,
            96,
            'JPEG',
            100,
            0,
          );

          console.log('Resized Image Path:', resizedImage.uri);

          setResizeImg(prev => [
            ...prev,
            {
              uri: resizedImage.uri,
              name: `image_${Date.now()}.jpeg`, // Use unique names
              type: 'image/jpeg',
            },
          ]);

          // Alert.alert('Image Processed', `Image saved at: ${resizedImage.uri}`);
        } catch (error) {
          console.error('Image Processing Error:', error);
         console.log('Error', 'Failed to process the image.');
        }
      };

      processImage();
    }
  }, [googleUser?.photo]);

  const handleGoogleLogin = async () => {
    try {
      // Ensure Google Play services are available
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log('125', response?.data?.user);
      // if(response?.data?.idToken){
      //   const fcmToken =await AsyncStorage.setItem('token', response?.data?.idToken);
      //   console.log("===", fcmToken)

      // }
      if (response?.data?.user) {
        const {name, email, id: google_id, photo} = response?.data?.user;
        // await navigation?.navigate('Drawer');
        // Set the Google user data for further processing
        setGoogleUser({name, email, google_id, photo});
        console.log('Google Sign-In Successful:', photo, name, email, google_id);

        // Resize the image if photo exists
        let resizedImage = null;
        if (photo) {
          try {
            resizedImage = await ImageResizer.createResizedImage(
              photo,
              96,
              96,
              'JPEG',
              100,
              0,
            );

            console.log('Resized Image Path:', resizedImage.uri);
          } catch (error) {
            console.error('Image Processing Error:', error);
            console.log('Error', 'Failed to process the image.');
          }
        }
        // Send data to the backend
        try {
          const formData = new FormData();
          formData.append('full_name', name);
          formData.append('email', email);
          formData.append('google_id', google_id);
          console.log('179', resizedImage);
          // Append photo as filename only
          // if (photo) {
          //   formData.append('photo', {
          //     uri: photo || null,
          //     name: "image",
          //     type: 'image/jpg',
          //   });
          // }

          // if (resizedImage) {
          //   formData.append("photo", {
          //     uri: resizedImage.uri || null,
          //     name: `profile_${Date.now()}.jpeg`, // Unique name for the photo
          //     type: "image/jpeg",
          //   });
          // }

          console.log('FormData ready. Sending request...');
          // formData._parts.forEach(([key, value]) =>
          //   console.log(`Key: ${key}, Value: ${JSON.stringify(value)}`),
          // );
          console.log('formdata', formData);
          const apiResponse = await soicalLogin(formData).unwrap();
          console.log('Upload Successful:', apiResponse?.data?.access_token);

          if (apiResponse?.data?.access_token) {
           const res = setStorageToken(apiResponse?.data?.access_token);
           console.log("google token", res)
            navigation?.replace('LoadingSplash');
          }
        } catch (error) {
          console.error(
            'Error during upload:',
            error?.data?.message || error.message || error,
          );
          Alert.alert(
            'Wrong somewhere',
            'Please try again',
          );
        }
      } else {
        console.log('Google Sign-In Cancelled by User');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);

      // Handle specific Google Sign-In errors
      if (error.code) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('Google Sign-In already in progress.');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Google Play Services not available or outdated.');
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('User cancelled the Google Sign-In process.');
            break;
          case statusCodes.SIGN_IN_REQUIRED:
            console.log('Sign-in is required but has not yet occurred.');
            break;
          default:
            console.log('An unknown error occurred:', error.message);
        }
      } else {
        console.log('An unexpected error occurred:', error);
      }
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
          <TouchableOpacity
          onPress={handleGoogleLogin}
          style={tw`flex-row flex mx-auto gap-4`}>
            <SvgXml xml={IconGoogle} />
            <Text style={tw`text-textPrimary`}>Continue with Google</Text>
          </TouchableOpacity>
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
