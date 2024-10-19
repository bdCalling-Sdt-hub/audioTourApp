import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { colors } from '../constants/color';

// icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { iconSizes, spacing } from '../../constants/dimensions';
import { useNavigation } from '@react-navigation/native';




const Header = () => {
  const navigation = useNavigation();
  const toggleDrawer = () => {
    navigation.toggleDrawer()
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
        onPress={toggleDrawer}>
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
      {/* <Text>Header</Text> */}
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
