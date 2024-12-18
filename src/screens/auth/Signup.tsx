import {View, Text, ScrollView, TouchableOpacity} from 'react-native';

import React, {useState} from 'react';
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
import {NavigationProps} from '../../navigation/types'; // Import the navigation types
import {SvgXml} from 'react-native-svg';

// Remove this import as you are already using @react-native-community/checkbox
// import { Checkbox } from 'react-native-ui-lib';

const SignUp = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const handleSignup = () => {
    navigation.navigate('otpVerification'); // Correctly typed navigation
  };

  const handlePrimaryLanguage = () => {
    navigation.navigate('primaryLanguage'); // Correctly typed navigation
  };

  return (
    <ScrollView
      contentContainerStyle={tw`p-[4%] bg-white h-full items-center justify-center`}>
      {/* form */}
      <View style={tw`mt-8`}>
        <Text style={tw`text-3xl text-textPrimary font-bold text-center`}>
          Sign up
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
              style={tw`text-white`}
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
              style={tw`text-white`}
              focusStyle={tw`border-primary`}
            />
          </View>

          {/* CheckBox for Terms */}
          <View style={tw`flex-row items-center gap-2`}>
            <CheckBox
            onCheckColor={toggleCheckBox ? "#0187D1" : "#D1D1D1"}
            onFillColor="#0187D1"
            tintColor="#0187D1"
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />

            <Text style={tw`text-xs text-textSecondary`}>
              I agree to the Terms and Conditions
            </Text>
          </View>

          {/* Password instructions */}
          <Text style={tw`text-darkSub text-xs font-LexDecaMedium py-2`}>
            Password needs to be at least 8 characters long. Contain at least 1
            number and 1 symbol.
          </Text>

          {/* Sign Up Button */}
          <Button
            containerStyle={tw`border-0 bg-primaryBase`}
            textStyle={tw`text-white font-bold`}
            onPress={handleSignup}
            title="Sign up"
          />

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
            <Text style={tw`text-sm text-textSecondary text-center`}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={tw`text-sm text-primary50`}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
