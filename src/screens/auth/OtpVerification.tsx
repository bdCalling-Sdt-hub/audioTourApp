import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import tw from '../../lib/tailwind';
import Button from '../../components/buttons/Button';
import {NavigProps} from '../../interfaces/NaviProps';
import {
  useOtipVerifyMutation,
  useResentOtpMutation,
} from '../../redux/apiSlices/authSlice';

const OtpVerificaton = ({navigation, route}: NavigProps<null>) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const [otipVerify, {isLoading, isError}] = useOtipVerifyMutation();
  const [resentOtp] = useResentOtpMutation();

  const email = route?.params?.email
  const from = route?.params?.from;
  console.log("from 27", from)
  console.log("email", email)

  console.log('13', otp);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    console.log(text);
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    console.log(newOtp);
    setOtp(newOtp);

    if (text && index < 4) {
      const nextInput = `otp-${index + 1}`;
      const nextField = textInputsRefs[nextInput];
      nextField?.focus();
    }
  };

  const textInputsRefs: {[key: string]: any} = {}; // To store TextInput refs

  const renderInputs = () => {
    return otp.map((digit, index) => (
      <TextInput
        cursorColor={'black'}
        key={index}
        style={tw`h-16 w-16 border items-center justify-center border-textSecondary rounded-xl my-6`}
        keyboardType="numeric"
        maxLength={1}
        value={digit}
        onChangeText={text => handleChange(text, index)}
        ref={input => (textInputsRefs[`otp-${index}`] = input)}
        onKeyPress={({nativeEvent}) => {
          if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = `otp-${index - 1}`;
            const prevField = textInputsRefs[prevInput];
            prevField?.focus();
          }
        }}
      />
    ));
  };

  const handleVerify = async () => {
    console.log('verify click');
    console.log('otp++++++++++++', otp?.join(''));
    const otpString = otp.join('');
    if (otpString.length !== 4 || isNaN(Number(otpString))) {
      console.log('Invalid OTP:', otpString);
      Alert.alert('Invalid OTP! Please enter a 4-digit code.');
      return;
    }
    try {
      // const formData = new FormData()
      // formData.append('otp', otp)
      // console.log("formData", formData)

      const verifyRes = await otipVerify({otp: otpString});
      console.log(verifyRes)
      console.log('+++verify res', verifyRes?.data?.success);

      if (verifyRes?.data?.success) {
        if(from === "forgetPassword") {
          navigation?.navigate("ChangePassword")
        }else{
          navigation?.navigate('OnboardingScreen1');
        }
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendOtp = async () => {
    console.log('click');
    try {
      const formData = new FormData();
      formData.append('email', email)
      const res = await resentOtp(formData);
      console.log("res", res)
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View style={tw`px-[4%]`}>
        <View style={tw`my-[20%]`}>
          <Text style={tw`font-bold text-center text-textPrimary text-2xl`}>
            Verify Email
          </Text>
          <Text
            style={tw`text-sm text-center text-textSecondary font-MontserratRegular`}>
            We have sent 4 digits code into your email account.
          </Text>

          <View
            style={tw`flex-row justify-between items-center w-[90%] mx-auto`}>
            {renderInputs()}
          </View>

          {timer > 0 ? (
            <Text style={tw`mt-5 font-MontserratRegular text-black`}>
              Resend code in 00:{timer < 10 ? `0${timer}` : timer}
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={tw`mt-5 px-[4%] text-black font-MontserratRegular`}>
                Didn’t received code?{' '}
                <Text style={tw` text-blue-800 border-b-2 border-b-blue-700`}>
                  Send again
                </Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={tw`z-2 flex mx-auto mb-0 top-0 items-center justify-center px-[4%]`}>
          <View style={tw`my-2 flex items-center justify-center mx-auto`}>
            <Button
              style={tw`w-80`}
              // onPress={() => navigation?.navigate('WelcomeScreen')}
              onPress={handleVerify}
              titleStyle={tw`text-white font-MontserratBold text-center mx-auto`}
              title="Verify"
              textStyle={tw`text-white`}
              containerStyle={tw`bg-primaryBase  border-0 my-2 rounded-full`}
            />
          </View>
        </View>
      </View>

      <StatusBar backgroundColor={'gray'} translucent />
    </View>
  );
};

export default OtpVerificaton;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full-screen view
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  timer: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  resend: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#007bff',
  },
});
