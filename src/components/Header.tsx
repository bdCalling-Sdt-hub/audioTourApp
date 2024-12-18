import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';

// icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {iconSizes, spacing} from '../constants/dimensions';
import {useNavigation, DrawerNavigationProp} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {GlobeIcon, KibupIcon} from '../assets/icons/icons';
import tw from '../lib/tailwind';

// Define the type for navigation (assuming Drawer navigation is used)
type RootStackParamList = {
  Drawer: undefined; // Adjust based on your navigation structure
};

const Header: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };      

  return (
    <View style={tw``}>
      <View style={tw`flex-row items-center justify-between px-[4%]`}>
        <Image
          style={tw`w-28 h-12 my-4`}
          source={require('../assets/imgages/SplashLgo.png')}
        />
        <View style={tw`flex-row gap-2`}>
          <TouchableOpacity>
            <SvgXml xml={GlobeIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDrawer}>
            <SvgXml xml={KibupIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar translucent={false} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});
