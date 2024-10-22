import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';

import LikeScreen from '../screen/likeScreen/LikeScreen';
import CustomDrawerContent from '../components/CustomDrawercontent';

// Define the drawer navigator type
type DrawerParamList = {
  DRAWER_HOME: undefined;
  LIKE_SCREEN: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="DRAWER_HOME" component={LikeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
