import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import React, {useRef, useState} from 'react';
  import tw from '../../lib/tailwind';
  import Button from '../../components/buttons/Button';
  import Header from '../../components/header/Header';
  import { useNavigation } from '@react-navigation/native';
  import { StackNavigationProp } from '@react-navigation/stack';
  
  // Define the route params list
  type RootStackParamList = {
    otpVerification: undefined;
    newPassword: undefined;
  };
  
  // Define the type for your navigation prop
  type OtpVerificationNavigationProp = StackNavigationProp<RootStackParamList, 'otpVerification'>;
  
  const OtpVerification = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null); // State to track which input is focused
    const inputs = useRef<Array<TextInput | null>>([]);
    
    // Use typed navigation for OTP verification screen
    const navigation = useNavigation<OtpVerificationNavigationProp>();
  
    const handleChangeText = (text: string, index: number) => {
      if (text.length > 1) {
        text = text.slice(-1);
      }
  
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
  
      if (text !== '' && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    };
  
    const handleKeyPress = ({nativeEvent}: any, index: number) => {
      if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    };
  
    const handleSubmit = () => {
      // if (otp.every(digit => digit !== '')) {
        // const otpCode = otp.join('');
        // console.log('OTP Code:', otpCode);
        // Redirect to newPassword screen
        navigation.navigate('newPassword');
      // } else {
      //   console.log('Please fill in all OTP fields.');
      // }
    };
  
    return (
      <ScrollView style={tw`p-[4%] bg-primaryBase h-full`}>
        <Header />
  
        {/* form */}
        <View style={tw`mt-8`}>
          <Text style={tw`text-[20px] font-LexDecaBold text-primary200`}>
            OTP Verification
          </Text>
          <Text style={tw`text-sm font-LexDecaRegular text-primary300 mt-1`}>
            We’ve sent a verification code to the
          </Text>
          <Text style={tw`text-sm font-LexDecaRegular text-primary50 mt-1`}>
            alm...@gmail.com
          </Text>
  
          <View style={tw`mt-8 gap-y-4`}>
            <View style={tw`flex-row justify-between items-center gap-4`}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => (inputs.current[index] = ref)}
                  value={digit}
                  onChangeText={text => handleChangeText(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  onFocus={() => setFocusedIndex(index)} // Set focused input index
                  onBlur={() => setFocusedIndex(null)} // Clear focus when not active
                  style={tw` ${
                    focusedIndex === index
                      ? 'border-primary'
                      : 'border-inputBorder'
                  } border-[1px] rounded-2xl w-16 h-16 font-extrabold text-center text-4xl font-LexDecaBold text-primary200 `} // Conditional style for background color
                  keyboardType="numeric"
                  placeholderTextColor={'#60606A'}
                  placeholder="0"
                  maxLength={1}
                  autoFocus={index === 0}
                />
              ))}
            </View>
  
            <Button
              title="Submit OTP"
              onPress={handleSubmit}
              containerStyle={tw`mt-4`}
            />
          </View>
          <View style={tw`flex-row justify-center items-center mt-12`}>
            <Text
              style={tw`font-LexDecaRegular text-sm text-offWhite text-center`}>
              Didn’t receive the code?{' '}
            </Text>
            <TouchableOpacity>
              <Text style={tw`font-LexDecaRegular text-sm text-primary50`}>
                Send again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };
  
  export default OtpVerification;
  