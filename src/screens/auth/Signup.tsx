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
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../navigation/types'; // Import the navigation types

const SignUp = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [check, setCheck] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const handleLogin = () => {
    navigation.navigate('login'); // Correctly typed navigation
  };

  const handlePrimaryLanguage = () => {
    navigation.navigate('primaryLanguage'); // Correctly typed navigation
  };

  return (
    <ScrollView style={tw`p-[4%] bg-primaryBase h-full`}>
      <Text style={tw`text-center text-primary text-3xl font-LexDecaBold`}>
       Audio Tour
      </Text>

      {/* form */}
      <View style={tw`mt-8`}>
       
          <Text style={tw`text-3xl font-LexDecaBold text-primary200`}>
            Create account
          </Text>
      
        <Text style={tw`text-sm font-LexDecaRegular text-primary300 mt-1`}>
          Give Us some of your information to get free access
        </Text>
        <View style={tw`mt-8 gap-y-4`}>
          <View style={tw`h-14`}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconUser}
              placeholder="Full Name"
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>

          <View style={tw`h-14`}>
            <InputText
              floatingPlaceholder
              svgFirstIcon={IconMail}
              placeholder="Your E-mail"
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>

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
          <Text style={tw`text-darkSub text-xs font-LexDecaMedium`}>
            Password needs to be at least 8 characters long and contain at least 1 number and 1 symbol
          </Text>

          <TouchableOpacity
            style={tw`my-5 flex-row flex-1 items-center`}
            onPress={() => {
              setCheck(!check);
            }}
          >
            <Checkbox
              color="#00cffd"
              iconColor="#121221"
              size={28}
              style={tw`rounded-lg`}
              borderRadius={8}
              value={check}
              outline={false}
              onValueChange={value => setCheck(value)}
            />
            <Text style={tw`ml-4 font-LexDecaRegular text-sm text-primary300`}>
              By creating an account you agree to the Terms of Use and our Privacy policy
            </Text>
          </TouchableOpacity>
          <Button onPress={handlePrimaryLanguage} title="Create Account" />

          <View style={tw`flex-row justify-center items-center mt-2`}>
            <Text style={tw`font-LexDecaRegular text-sm text-offWhite text-center`}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={tw`font-LexDecaRegular text-sm text-primary50`}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`my-4 w-full border-b border-b-inputBorder`} />
          <Button
            title="Continue with Google"
            firstSvg={IconGoogle}
            textStyle={tw`text-primary200`}
            containerStyle={tw`bg-transparent border-inputBorder`}
          />
          <Button
            title="Continue with Facebook"
            firstSvg={IconFacebook}
            textStyle={tw`text-primary200`}
            containerStyle={tw`bg-transparent border-inputBorder`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
