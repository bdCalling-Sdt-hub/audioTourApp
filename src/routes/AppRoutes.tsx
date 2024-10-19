import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDeviceContext } from 'twrnc'; // Ensures compatibility with Tailwind in React Native
import tw from '../lib/tailwind'; // Tailwind setup for styling

import BottomRoutes from './BottomRoutes'; // Bottom tab routes
import Login from '../screens/auth/Login';
import ForgetPassword from '../screens/auth/ForgetPassword';
import OtpVerification from '../screens/auth/OtpVerification';
import NewPassword from '../screens/auth/NewPassword';
import SignUp from '../screens/auth/Signup';
import TermsAndConditions from '../screens/TermsAndConditions';
import Faq from '../screens/Faq';


// Create the stack navigator
const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  // Apply Tailwind configuration
  useDeviceContext(tw);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
        {/* Correct the typo in screen name */}
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signUp" component={SignUp} />
   
       
      
        <Stack.Screen name="forgetPassword" component={ForgetPassword} />
        <Stack.Screen name="otpVerification" component={OtpVerification} />
        <Stack.Screen name="newPassword" component={NewPassword} />
      
       
      
        <Stack.Screen name="termsCondition" component={TermsAndConditions} />
        <Stack.Screen name="faq" component={Faq} />
     

        <Stack.Screen name="BottomHome" component={BottomRoutes} />
        {/* <Stack.Screen name="BottomHome" component={BottomRoutes} /> */}
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
