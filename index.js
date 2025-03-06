/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import AppRoutes from './src/routes/AppRoutes';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';



if (__DEV__) {
    require("./ReactotronConfig");
  }
AppRegistry.registerComponent(appName, () => AppRoutes);
TrackPlayer.registerPlaybackService(() => require('./service'));
