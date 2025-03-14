// /**
//  * @format
//  */
// import 'react-native-gesture-handler';

// import {AppRegistry} from 'react-native';
// import AppRoutes from './src/routes/AppRoutes';
// import {name as appName} from './app.json';
// import {
//   configureReanimatedLogger,
//   ReanimatedLogLevel,
// } from 'react-native-reanimated';
// import TrackPlayer from 'react-native-track-player';
// import {PermissionsAndroid} from 'react-native';

// // for push notification
// import messaging from '@react-native-firebase/messaging';
// import {lStorage, setStorageToken} from './src/utils/utils';
// import {useEffect} from 'react';

// // Request permission to receive notifications
// // const requestUserPermission = async () => {
// //   const authStatus = await messaging().requestPermission();
// //   const enabled =
// //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
// //   if (enabled) {
// //     getFcmToken();
// //   }
// // };

// // // Get the device's FCM token
// // const getFcmToken = async () => {
// //   const fcmtoken = await messaging().getToken();
// //   lStorage.setString('fcmToken', fcmtoken);
// //   console.log('FCM Token:', fcmtoken);
// //   // Send this token to the backend or store it for later use
// // };

// // useEffect(() => {
//   const requestUserPermission = async () => {
//     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//     if (enabled) {
//       console.log('Authrization status', authStatus)
//       const fcmtoken = await messaging().getToken();
//       lStorage.setString('fcmToken', fcmtoken);
//       console.log('FCM Token:', fcmtoken);
//     }
//   };
// //   requestUserPermission()
// // }, []);

// // Handling incoming notifications
// messaging().onMessage(async remoteMessage => {
//   console.log('Received foreground message:', remoteMessage);
//   // Handle the notification in the foreground (e.g., show an alert, navigate, etc.)
// });

// // Handle background and terminated state messages
// messaging().onNotificationOpenedApp(remoteMessage => {
//   console.log(
//     'Notification caused app to open from background state:',
//     remoteMessage.notification,
//   );
// });

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
 
// });

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log(
//     'Notification caused app to open from a background state:',
//     remoteMessage.notification,
//   );
// });

// // Request permission and setup FCM when the app starts
// requestUserPermission();

// if (__DEV__) {
//   require('./ReactotronConfig');
// }
// configureReanimatedLogger({
//   level: ReanimatedLogLevel.warn,
//   strict: false, // Change to false if you want to disable strict mode
// });
// AppRegistry.registerComponent(appName, () => AppRoutes);
// TrackPlayer.registerPlaybackService(() => require('./service'));

import 'react-native-gesture-handler';
import React, { useEffect } from 'react'; // Import React and useEffect
import { AppRegistry, Alert, Platform } from 'react-native';
import AppRoutes from './src/routes/AppRoutes';
import { name as appName } from './app.json';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import TrackPlayer from 'react-native-track-player';
import { PermissionsAndroid } from 'react-native';

// for push notification
import messaging from '@react-native-firebase/messaging';
import { lStorage } from './src/utils/utils';

const App = () => {
  // Request permission to receive notifications
  const requestUserPermission = async () => {
    // Request notification permission on Android 13+ devices
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const fcmtoken = await messaging().getToken();
      lStorage.setString('fcmToken', fcmtoken);
      console.log('FCM Token:', fcmtoken);
    } else {
      console.log('Permission not granted');
    }
  };

  // Handling incoming notifications in foreground
  messaging().onMessage(async remoteMessage => {
    console.log('Received foreground message:', remoteMessage);
    // Handle the notification in the foreground (e.g., show an alert, navigate, etc.)
    // Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
  });

  // Handle background notifications and when the app is opened from terminated state
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // Optionally, navigate based on the data in the notification
    // Example: navigation.navigate('SomeScreen');
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(
      'Notification caused app to open from a background state:',
      remoteMessage.notification,
    );
    // You can handle background notification here, such as storing the data or navigating
    // Example: show a local notification or save the data for later use
  });

  // Request permission and setup FCM when the app starts
  useEffect(() => {
    requestUserPermission();
  }, []);

  if (__DEV__) {
    require('./ReactotronConfig');
  }

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Change to false if you want to disable strict mode
  });

  return (
    <AppRoutes />
  );
};

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));
