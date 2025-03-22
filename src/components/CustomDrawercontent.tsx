import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {fontSizes, spacing, iconSizes} from '../constants/dimensions';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fontFamilies} from '../constants/fonts';
import {DrawerNavigationProp, useTheme} from '@react-navigation/native';
import {useThemeStore} from '../store/ThemeStore';
import {
  AboutusIcon,
  FaqIcon,
  IconEdit,
  IconLeftArrow,
  leftArrow,
  LogoutIcon,
  PrivacyPolicyIcon,
  TermsAndConditionIcon,
} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import {lStorage, removeStorageToken} from '../utils/utils';

// Define the type for navigation props
type CustomDrawerContentProps = {
  navigation: DrawerNavigationProp<any>;
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {isDarkMode, toggleTheme} = useThemeStore();
  const {colors} = useTheme();

  const closeDrawer = () => {
    props.navigation.closeDrawer(); // Properly closes the drawer
  };

  const handleLogout = () => {
   
   
    lStorage.removeItem('token');
    const token = lStorage.getString("token")
    console.log("token =======================", token)
  
    // props.navigation?.replace('LoadingSplash');
    props?.navigation?.closeDrawer();
    props?.navigation?.reset({routes: [{name: 'LoadingSplash'}]});
  };

  return (
    <DrawerContentScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerItemContainer}>
        <TouchableOpacity onPress={closeDrawer}>
          <AntDesign
            name={'close'}
            color={colors.iconPrimary}
            size={iconSizes.lg}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => toggleTheme()}>
          <Octicons name={isDarkMode ? 'sun' : 'moon'} color={colors.iconPrimary} size={iconSizes.lg} />
        </TouchableOpacity> */}
      </View>
      {/* Menu item container */}
      <View style={styles.drawerItemContainer}>
        <DrawerItem
          label={'About us'}
          icon={() => <SvgXml xml={AboutusIcon} width={25} height={25} />}
          labelStyle={[styles.labelStyle, {color: colors.textPrimary}]}
          style={styles.drawerItem}
          onPress={() => props?.navigation.navigate('Aboutus')}
        />
        <DrawerItem
          label={'FAQ'}
          icon={() => <SvgXml xml={FaqIcon} width={25} height={25} />}
          labelStyle={[styles.labelStyle, {color: colors.textPrimary}]}
          style={styles.drawerItem}
          onPress={() => props?.navigation.navigate('faq')}
        />
        <DrawerItem
          label={'Terms and condition'}
          icon={() => <SvgXml xml={PrivacyPolicyIcon} width={25} height={25} />}
          labelStyle={[styles.labelStyle, {color: colors.textPrimary}]}
          style={styles.drawerItem}
          onPress={() => props?.navigation.navigate('PrivacyPolicy')}
        />
        {/* <DrawerItem
          label={'Terms & conditions'}
          icon={() => (
            <SvgXml xml={TermsAndConditionIcon} width={25} height={25} />
          )}
          labelStyle={[styles.labelStyle, {color: colors.textPrimary}]}
          style={styles.drawerItem}
          onPress={() => props?.navigation.navigate('TermsAndCondition')}
        /> */}
        <DrawerItem
          label={'Change password'}
          icon={() => <SvgXml xml={IconEdit} width={25} height={25} />}
          labelStyle={[styles.labelStyle, {color: colors.textPrimary}]}
          style={styles.drawerItem}
          onPress={() => props?.navigation.navigate('ChangePassword')}
        />
        <DrawerItem
          label={'Logout'}
          icon={() => (
            <SvgXml xml={LogoutIcon} width={25} height={25} /> // Customize size and color as needed
          )}
          labelStyle={[styles.labelStyle, {color: 'red'}]}
          style={styles.drawerItem}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  headerItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerItemContainer: {
    marginVertical: spacing.xl,
  },
  labelStyle: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.medium,
  },
  drawerItem: {
    marginVertical: spacing.sm,
  },
});
