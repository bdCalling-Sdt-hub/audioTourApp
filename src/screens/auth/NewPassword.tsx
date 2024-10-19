import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
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
  IconSuccessTik,
  IconUser,
  successIocn,
} from '../../assets/icons/icons';  
import {Checkbox} from 'react-native-ui-lib';
import Button from '../../components/buttons/Button';
import NormalModal from '../../components/modal/NormalModal';
import {SvgXml} from 'react-native-svg';

const NewPassword = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  return (
    <ScrollView style={tw`p-[4%] bg-primaryBase h-full`}>
      <Text style={tw`text-center text-primary text-3xl font-LexDecaBold`}>
        Audio Tour
      </Text>

      {/* form */}
      <View style={tw`mt-8`}>
        <Text style={tw`text-[20px] font-LexDecaBold text-primary200`}>
          New Password
        </Text>
        <Text style={tw`text-sm font-LexDecaRegular text-primary300 mt-1`}>
          We’ve sent a verification code to the
        </Text>
        <Text style={tw`text-sm font-LexDecaRegular text-primary50 mt-1`}>
          alm...@gmail.com
        </Text>
        <View style={tw`mt-8 gap-y-4`}>
          <View style={tw`h-14`}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconLock}
              placeholder="Craete New password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>
          <View style={tw`h-14`}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconLock}
              placeholder="Confirm Password"
              svgSecondIcon={isHidePassword ? IconCloseEye : IconOpenEye}
              secureTextEntry={isHidePassword}
              onPress={() => setIsHidePassword(!isHidePassword)}
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>

          <Button
            title="Update Password"
            containerStyle={tw`mt-8`}
            onPress={() => setSuccessModal(true)}
          />
          <NormalModal
            layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
            containerStyle={tw`rounded-3xl bg-inputBorder p-5`}
            visible={successModal}
            setVisible={setSuccessModal}>
            <View style={tw`items-center`}>
              <SvgXml xml={successIocn} />
              <Text
                style={tw`text-primary200 font-LexDecaBold text-[20px] mt-6`}>
                Password update successfully
              </Text>
              <Button
                title="Done"
                containerStyle={tw`mt-12 w-full bg-success border-success`}
                onPress={() => setSuccessModal(false)}
              />
            </View>
          </NormalModal>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewPassword;
