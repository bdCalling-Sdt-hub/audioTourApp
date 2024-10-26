import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer'; // Drawer Navigator
import {NavigationContainer} from '@react-navigation/native';
import {useDeviceContext} from 'twrnc'; // Ensures compatibility with Tailwind in React Native
import tw from '../lib/tailwind'; // Tailwind setup for styling

import BottomRoutes from './BottomRoutes'; // Bottom tab routes
import Login from '../screens/auth/Login';
import ForgetPassword from '../screens/auth/ForgetPassword';
import OtpVerification from '../screens/auth/OtpVerification';
import NewPassword from '../screens/auth/NewPassword';
import SignUp from '../screens/auth/Signup';
import TermsAndConditions from '../screens/TermsAndConditions';
import Faq from '../screens/Faq';
import TrackPlayer from 'react-native-track-player';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import PlayerScreen from '../screens/PlayerScreen';
import LikeScreen from '../screens/LikeScreent';
import CustomDrawerContent from '../components/CustomDrawercontent';
import SplashScreen from '../screens/SplashScreen';

// Create the stack and drawer navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="splash" component={SplashScreen} />
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="signUp" component={SignUp} />
    <Stack.Screen name="forgetPassword" component={ForgetPassword} />
    <Stack.Screen name="otpVerification" component={OtpVerification} />
    <Stack.Screen name="newPassword" component={NewPassword} />
    <Stack.Screen name="termsCondition" component={TermsAndConditions} />
    <Stack.Screen name="faq" component={Faq} />
    <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
    <Stack.Screen name="BottomHome" component={BottomRoutes} />
  </Stack.Navigator>
);

const AppRoutes: React.FC = () => {
  useEffect(() => {
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    console.log('Track player setup successfully');
  };

  // Apply Tailwind configuration
  useDeviceContext(tw);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={tw`flex-1`}>
          <NavigationContainer>
            <Drawer.Navigator
              screenOptions={{
                headerShown: false,
                drawerType: 'slide',
                // swipeEdgeWidth: 0,
              }}
              drawerContent={props => <CustomDrawerContent {...props} />}>
              <Drawer.Screen name="DRAWER_HOME" component={StackNavigator} />
            </Drawer.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default AppRoutes;
