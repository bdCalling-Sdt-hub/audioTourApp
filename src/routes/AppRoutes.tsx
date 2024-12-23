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
import OnboardingScreen1 from '../screens/OnboardingScreen1';
import OnboardingScreen2 from '../screens/OnboardingScreen2';
import AllowNotification from '../screens/AllowNotification';
import BackgroundPermission from '../screens/BackgroundPermission';
import BackgroundLocation from '../screens/BackgroundLocation';
import EnjoyThreeAudiosFree from '../screens/EnjoyThreeAudiosFree';
import StoryPreview from '../screens/StoryPreview';
import MyStories from '../screens/MyStories';
import FavoriteScreen from '../screens/FavoriteScreen';
import BookMarkScreen from '../screens/BookMarkScreen';
import ChangePassword from '../screens/ChangePassword';
import SuccessScreen from '../screens/SuccessScreen';
import FaqScreen from '../screens/FaqScreen';
import Aboutus from '../screens/Aboutus';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import { useSetupTrackPlayer } from '../hooks/useSetupTrackPlayer.';
import { AppState } from 'react-native';

// Create the stack and drawer navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator: React.FC = () => (
  <Stack.Navigator
  
    initialRouteName="splash"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="splash" component={SplashScreen} />
    <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
    <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
    <Stack.Screen name="AllowNotification" component={AllowNotification} />
    <Stack.Screen name="BackgroundPermission" component={BackgroundPermission} />
    <Stack.Screen name="BackgroundLocation" component={BackgroundLocation} />
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="signUp" component={SignUp} />
    <Stack.Screen name="forgetPassword" component={ForgetPassword} />
    <Stack.Screen name="otpVerification" component={OtpVerification} />
    <Stack.Screen name="newPassword" component={NewPassword} />
    <Stack.Screen name="termsCondition" component={TermsAndConditions} />
    <Stack.Screen name="faq" component={Faq} />
    {/* <Stack.Screen name="PlayerScreen" component={PlayerScreen} /> */}
    <Stack.Screen name="EnjoyThreeFreeAudio" component={EnjoyThreeAudiosFree} />
    <Stack.Screen name="SrotyPreview" component={StoryPreview} />
    <Stack.Screen name="MyStories" component={MyStories} />
    <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
    <Stack.Screen name="BookMarkScreen" component={BookMarkScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
    <Stack.Screen name="Aboutus" component={Aboutus} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="TermsAndCondition" component={TermsAndConditions} />

    
    <Stack.Screen name="BottomHome" component={BottomRoutes} />
  </Stack.Navigator>
);

const AppRoutes: React.FC = () => {
  useEffect(() => {
    const initializePlayer = async () => {
      if (AppState.currentState === 'active') {
        try {
          await setupPlayer();
        } catch (error) {
          console.error('Error during TrackPlayer setup:', error);
        }
      } else {
        console.warn('TrackPlayer can only be set up when the app is in the foreground.');
      }
    };

    initializePlayer();
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    console.log('Track player setup successfully');
  };
  // useEffect(() => {
  //   setupPlayer();
  // }, []);

  // const setupPlayer = async () => {
  //   await TrackPlayer.setupPlayer();
  //   console.log('Track player setup successfully');
  // };
  // const onLoad = () => {
  //   console.log('track player setup success...');
  // };
  // Apply Tailwind configuration
  useDeviceContext(tw);
  // useSetupTrackPlayer({onLoad});
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
