/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import AppRoutes from './src/routes/AppRoutes';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

// for push notification
import messaging from '@react-native-firebase/messaging';

// Request permission to receive notifications
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken();
  }
};

// Get the device's FCM token
const getFcmToken = async () => {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  // Send this token to the backend or store it for later use
};

// Handling incoming notifications
messaging().onMessage(async remoteMessage => {
  console.log('Received foreground message:', remoteMessage);
  // Handle the notification in the foreground (e.g., show an alert, navigate, etc.)
});

// Handle background and terminated state messages
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('Notification caused app to open from background state:', remoteMessage.notification);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Notification caused app to open from a background state:', remoteMessage.notification);
});

// Request permission and setup FCM when the app starts
requestUserPermission();




if (__DEV__) {
    require("./ReactotronConfig");
  }
AppRegistry.registerComponent(appName, () => AppRoutes);
TrackPlayer.registerPlaybackService(() => require('./service'));
