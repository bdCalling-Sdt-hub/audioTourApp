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
  Map,
  MapFocus,
  HomeFocusIcon,
  HomeIcon,
  StoriesFocusIcon,
  StoriesIcon,
  userIcon,
  ProfileIconFocus,
  ProfileIcon,
} from '../assets/icons/icons';


import _default from './../../node_modules/react-native-svg/lib/typescript/fabric/LineNativeComponent.d';

import MessageList from '../screens/message/MessageList';
import Play from '../screens/Play';
import Story from '../screens/Story';
import Settings from '../screens/Profile';
import LikeScreen from '../screens/LikeScreent';
// import HomeScreen from '../screens/Home';
// import PlayerScreen from '../screens/PlayerScreen';
import MapScreen from '../screens/MapScreen';
import HomeScreen from '../screens/HomeScreen';
import PlayerScreen from '../screens/PlayerScreen';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

type Props = {};

const BottomRoutes = (props: Props) => {
  return (
    <Tab.Navigator
    initialRouteName='Map'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: tw`h-16 bg-white shadow-none border-0 `,
        contentStyle: tw`h-16 bg-white shadow-none border-0 `, 
        tabBarItemStyle: tw`my-[10px] tablet:my-5 flex-col`,
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarIcon: ({ focused }) => {
          let icon: any;

          // Choose icon based on route name and focused state
          switch (route.name) {
            case 'Home':
              icon = focused ? HomeFocusIcon : HomeIcon;
              break;
            case 'Map':
              icon = focused ? MapFocus : Map;
              break;
            case 'Player':
              icon = focused ? playFocus : play ; // Corrected the name
              break;
            case 'Stories':
              icon = focused ? StoriesFocusIcon : StoriesIcon;
              break;
            case 'Profile':
              icon = focused ? ProfileIconFocus :ProfileIcon;
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
  
  <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="PlayerScreen" component={PlayerScreen} /> */}
      <Tab.Screen name="Player" component={PlayerScreen} />
      <Tab.Screen name="Map" component={MapScreen} />

      <Tab.Screen name="Stories" component={Story} />
      <Tab.Screen name="Profile" component={Profile} />
     

    </Tab.Navigator>
  );
};

export default BottomRoutes;

const styles = StyleSheet.create({});
