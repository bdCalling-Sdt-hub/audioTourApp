import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/inputs/InputText';
import CheckBox from '@react-native-community/checkbox';
import {
  IconCloseEye,
  IconFacebook,
  IconGoogle,
  IconLock,
  IconMail,
  IconOpenEye,
  IconUser,
} from '../../assets/icons/icons';
import Button from '../../components/buttons/Button';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../navigation/types';
import {SvgXml} from 'react-native-svg';
import {useRegisterUserMutation} from '../../redux/apiSlices/authSlice';
import LinearGradient from 'react-native-linear-gradient';
import {PermissionsAndroid} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getStorageToken, lStorage} from '../../utils/utils';

interface SignupDataProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [deviceId, setDeviceId] = useState('');
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  console.log('checkbox', toggleCheckBox);
  const [registerUser, {isLoading, isError}] = useRegisterUserMutation();
  const [signupData, setSignupData] = useState<SignupDataProps>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // console.log('devicId', deviceId);
  const navigation = useNavigation<NavigationProps>();

  const handleSignup = async () => {
    const fcmtoken = lStorage.getString('fcmToken');
    console.log('fcmToken', fcmtoken);

    // Password validation regex: at least one uppercase, one lowercase, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (toggleCheckBox === true) {
      // Validate password
      if (!passwordRegex.test(signupData.password)) {
        Alert.alert(
          'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
        );
        return;
      }

      try {
        const formData = {
          full_name: signupData.fullName,
          email: signupData.email,
          password: signupData.password,
          password_confirmation: signupData.confirmPassword,
          device_token: fcmtoken,
        };

        console.log('Sending request with data:', signupData);

        const res = await registerUser(formData).unwrap();
        console.log('Signup response:', res);

        if (res?.success) {
          navigation.navigate('otpVerification', {email: signupData?.email});
        }
      } catch (error) {
        console.error('Signup error:', error);
      }
    } else {
      Alert.alert('Please select the checkbox');
    }
  };

  // const requestPhoneStatePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Phone state permission granted');
  //     } else {
  //       Alert.alert('Permission Denied', 'Phone state permission is required to proceed.');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  const requestPhoneStatePermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Phone state permission granted');
      // Handle the logic after permission is granted
    } else {
      console.log('Phone state permission denied');
      // Handle the logic for denied permission
    }
  };
  // const checkPhoneStatePermission = async () => {
  //   const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);

  //   if (hasPermission) {
  //     console.log('Phone state permission granted');
  //   } else {
  //     console.log('Phone state permission not granted');
  //   }
  // };
  const fetchDeviceId = async () => {
    try {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch device information');
    }
    fetchDeviceId();
  };
  // useEffect(() => {
  //   requestPhoneStatePermission();
  //   fetchDeviceId();
  // }, []);
  return (
    <ScrollView
      contentContainerStyle={tw`p-[4%] bg-white h-full items-center justify-center`}>
      <View style={tw`mt-8`}>
        <Text style={tw`text-3xl text-textPrimary font-bold text-center`}>
          Sign up
        </Text>
        <Text style={tw`text-sm text-center text-textSecondary mt-1`}>
          Log In with your data that you entered during your registration
        </Text>

        <View style={tw`mt-8 gap-y-4 `}>
          <View style={tw`h-12 border border-primaryBase rounded-2xl`}>
            <InputText
              onChangeText={text =>
                setSignupData(prev => ({
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
              onChangeText={text =>
                setSignupData(prev => ({
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
              onChangeText={text =>
                setSignupData(prev => ({
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
              onChangeText={text =>
                setSignupData(prev => ({
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
          <Text style={tw`text-gray-400`}> Password atleast 8 (eight) character</Text>

          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`border p-0 rounded-lg`}>
              <CheckBox
                style={tw`text-black border border-black`}
                onCheckColor="#0187D1"
                onFillColor="#0187D1"
                tintColor="#0187D1"
                value={toggleCheckBox}
                onValueChange={value => {
                  setToggleCheckBox(value);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation?.navigate('TermsAndCondition')}>
              <Text style={tw`text-xs text-textSecondary`}>
                I agree to the{' '}
                <Text style={tw`text-green-700 underline`}>
                  Terms and Conditions
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={tw`text-darkSub text-xs font-LexDecaMedium py-2`}>
            Password needs to be at least 8 characters long, contain at least 1
            number and 1 symbol and 1 uppercase letter.
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
