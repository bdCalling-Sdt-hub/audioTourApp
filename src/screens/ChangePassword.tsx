import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import tw from '../lib/tailwind';
import InputText from '../components/inputs/InputText';
import {
  IconCloseEye,
  IconLock,
  IconOpenEye,
  lessThanIcon,
} from '../assets/icons/icons';
import Button from '../components/buttons/Button';
import {SvgXml} from 'react-native-svg';
import {NavigProps} from '../interfaces/NaviProps';
import {useChangePasswordMutation} from '../redux/apiSlices/authSlice';

const ChangePassword = ({navigation}: NavigProps<string>) => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [changePassword, {isLoading, isError}] = useChangePasswordMutation();

  const hanndleChangePassword = async () => {
    console.log('click');
    try {
      const formData = new FormData();
      formData.append('password', newPassword);
      formData.append('password_confirmation', confirmPassword);
      console.log('formData', formData);
      const changeRes = await changePassword(formData);
      console.log('changeRes', changeRes);
      if (changeRes?.data?.success === true) {
        navigation?.navigate('login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`p-[4%] bg-white h-full `}>
      {/* Form Section */}
      <View style={tw`mt-8`}>
        {/* Forgot Password Heading */}
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={tw`flex-row items-center`}>
          <SvgXml xml={lessThanIcon} width={20} height={20} />
          <Text style={tw`text-[20px] font-bold  text-textPrimary`}>
            Change your password
          </Text>
        </TouchableOpacity>

        {/* Email Input Field */}
        <View style={tw`mt-8 gap-y-4 my-24`}>
          {/* <View style={tw`h-12 border border-primaryBase rounded-2xl `}>
            <InputText
              floatingPlaceholder
              floatingPlaceholderStyle={tw`text-textPrimary`}
              svgFirstIcon={IconLock}
              placeholder="Enter Old password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              style={tw`text-textPrimary`}
              focusStyle={tw`border-primary`}
            />
          </View> */}
          <View style={tw`h-12 border border-primaryBase rounded-2xl `}>
            <InputText
              onChangeText={text => setNewPassword(text)}
              floatingPlaceholder
              floatingPlaceholderStyle={tw`text-textPrimary`}
              svgFirstIcon={IconLock}
              placeholder="Enter New password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              style={tw`text-textPrimary`}
              focusStyle={tw`border-primary`}
            />
          </View>
          <View style={tw`h-12 border border-primaryBase rounded-2xl `}>
            <InputText
              onChangeText={text => setConfirmPassword(text)}
              floatingPlaceholder
              floatingPlaceholderStyle={tw`text-textPrimary`}
              svgFirstIcon={IconLock}
              placeholder="Enter comfirm password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              style={tw`text-textPrimary`}
              focusStyle={tw`border-primary`}
            />
          </View>

          {/* Submit Button */}
          <Button
            containerStyle={tw`bg-primaryBase border-0`}
            textStyle={tw`text-white`}
            onPress={hanndleChangePassword}
            // onPress={() => {
            //   handleChangePassword();
            //   navigation?.navigate('SuccessScreen');
            // }}

            title="Update"
          />
        </View>
      </View>
      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default ChangePassword;
