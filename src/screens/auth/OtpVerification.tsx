import {
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
import { NavigProps } from '../../interfaces/NaviProps';


const OtpVerificaton = ({navigation}: NavigProps<null>) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60); // 60 seconds countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval); 
  }, []);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return; 

    const newOtp = [...otp];
    newOtp[index] = text;
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
        style={tw`h-12 w-12 border items-center justify-center border-textSecondary rounded-xl my-6`}
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

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View style={tw`px-[4%]`}>
        <View style={tw`my-[20%]`}>
            <Text style={tw`font-bold text-center text-textPrimary text-2xl`}>
              Verify Email
            </Text>
          <Text style={tw`text-sm text-center text-textSecondary font-MontserratRegular`}>
          We have sent 4 digits code into your email account.
          </Text>

          <View style={tw`flex-row justify-between items-center w-[80%] mx-auto`}>
            {renderInputs()}
          </View>

          {timer > 0 ? (
            <Text style={tw`mt-5 font-MontserratRegular text-black`}>
              Resend code in 00:{timer < 10 ? `0${timer}` : timer}
            </Text>
          ) : (
            <TouchableOpacity>
              <Text style={tw`mt-5 text-black font-MontserratRegular`}>
                Didn’t received code?{' '}
                <Text style={tw` text-blue-800 border-b-2 border-b-blue-700`}>
                  Send again
                </Text>{' '}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={tw`z-2 flex mx-auto mb-0 top-0 items-center justify-center px-[4%]`}>
          <View style={tw`my-2 flex items-center justify-center mx-auto`}>
            <Button
              onPress={() => navigation?.navigate('WelcomeScreen')}
              titleStyle={tw`text-white font-MontserratBold text-center mx-auto`}
              title="Verify"
              textStyle={tw`text-white`}
              containerStyle={tw`bg-primaryBase px-36 border-0 my-2 rounded-full`}
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
