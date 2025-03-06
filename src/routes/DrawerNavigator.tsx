import { StyleSheet } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';  // Assuming you have stack navigation to integrate
import LikeScreen from '../screen/likeScreen/LikeScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screen/HomeScreen'; // Placeholder for your HomeScreen

// Define the drawer navigator type
type DrawerParamList = {
  HOME_SCREEN: undefined;
  LIKE_SCREEN: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // Disable default headers to allow for custom headers
        drawerType: 'slide',  // Drawer slides from the side
        swipeEdgeWidth: 0,
        drawerStyle: {
          backgroundColor: '#fff',  // Set custom background color for drawer
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Custom Drawer content
    >
      {/* Screen entries in the Drawer */}
      <Drawer.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Drawer.Screen name="LIKE_SCREEN" component={LikeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
