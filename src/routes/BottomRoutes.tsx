import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import Home from '../screens/Home';
import {
  matches,
  matchesNonFocus,
  createMatches,
  crateMatchesNonFoucs, 
  community,
  communityNonFocus,
  settings,
  settingsNonFocus,
  StarWithRound,
  StarWithRoundFocus,
  play,
  playFocus,
  story,
  storyFocus,
} from '../assets/icons/icons';


import _default from './../../node_modules/react-native-svg/lib/typescript/fabric/LineNativeComponent.d';

import MessageList from '../screens/message/MessageList';
import SettingsScreen from '../screens/settings/SettingsScreen';
import Play from '../screens/Play';
import Story from '../screens/Story';
import Settings from '../screens/Settings';
import LikeScreen from '../screens/LikeScreent';
import HomeScreen from '../screens/Home';
import PlayerScreen from '../screens/PlayerScreen';

const Tab = createBottomTabNavigator();

type Props = {};

const BottomRoutes = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: tw`h-16 bg-primaryBase shadow-none border-0 `,
        contentStyle: tw`h-16 bg-primaryBase shadow-none border-0 `, 
        tabBarItemStyle: tw`my-[10px] tablet:my-5 flex-col`,
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarIcon: ({ focused }) => {
          let icon: any;

          // Choose icon based on route name and focused state
          switch (route.name) {
            case 'Featured':
              icon = focused ? StarWithRoundFocus : StarWithRound;
              break;
            case 'Play':
              icon = focused ? playFocus : play ; // Corrected the name
              break;
            case 'My Story':
              icon = focused ? storyFocus : story;
              break;
            case 'Settings':
              icon = focused ? settings : settingsNonFocus;
              break;
            default:
              icon = null;
          }

          return icon ? <SvgXml xml={icon} /> : null;
        },
        tabBarLabel: ({ focused }) => {
          const color = focused ? 'gray' : 'gray';
          const font = focused ? 'NunitoSansBold' : 'NunitoSansRegular';

          return (
            <Text
              style={{
                color,
                fontSize: 12,
                textTransform: 'capitalize',
                fontFamily: font,
              }}
            >
              {route.name}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Featured" component={HomeScreen} />
      <Tab.Screen name="PlayerScreen" component={PlayerScreen} />
      <Tab.Screen name="Play" component={Play} />
      <Tab.Screen name="My Story" component={Story} />
      <Tab.Screen name="Settings" component={Settings} />
     

    </Tab.Navigator>
  );
};

export default BottomRoutes;

const styles = StyleSheet.create({});
