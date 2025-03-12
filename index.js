/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import AppRoutes from './src/routes/AppRoutes';
import {name as appName} from './app.json';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import TrackPlayer from 'react-native-track-player';

// for push notification
import messaging from '@react-native-firebase/messaging';
import {lStorage, setStorageToken} from './src/utils/utils';

// Request permission to receive notifications
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken();
  }
};

// Get the device's FCM token
const getFcmToken = async () => {
  const fcmtoken = await messaging().getToken();
  lStorage.setString('fcmToken', fcmtoken);
  console.log('FCM Token:', fcmtoken);
  // Send this token to the backend or store it for later use
};

// Handling incoming notifications
messaging().onMessage(async remoteMessage => {
  console.log('Received foreground message:', remoteMessage);
  // Handle the notification in the foreground (e.g., show an alert, navigate, etc.)
});

// Handle background and terminated state messages
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log(
    'Notification caused app to open from background state:',
    remoteMessage.notification,
  );
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(
    'Notification caused app to open from a background state:',
    remoteMessage.notification,
  );
});

// Request permission and setup FCM when the app starts
requestUserPermission();

if (__DEV__) {
  require('./ReactotronConfig');
}
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Change to false if you want to disable strict mode
});
AppRegistry.registerComponent(appName, () => AppRoutes);
TrackPlayer.registerPlaybackService(() => require('./service'));
