import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../constants/color';

// icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { iconSizes, spacing } from '../constants/dimensions';
import { useNavigation, DrawerNavigationProp } from '@react-navigation/native';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer}>
          <FontAwesome5
            name={'grip-lines'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name={'search1'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
      </View>
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
