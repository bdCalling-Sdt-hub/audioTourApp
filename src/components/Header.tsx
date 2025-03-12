import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {colors} from '../constants/color';

// icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {iconSizes, spacing} from '../constants/dimensions';
import {useNavigation, DrawerNavigationProp} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {GlobeIcon, IconNotification, KibupIcon} from '../assets/icons/icons';
import tw from '../lib/tailwind';
import {
  useGetNotificationQuery,
  usePutMarkAllReadMutation,
} from '../redux/apiSlices/notificationSlice';

// Define the type for navigation (assuming Drawer navigation is used)
type RootStackParamList = {
  Drawer: undefined; // Adjust based on your navigation structure
};

const Header: React.FC = () => {
  const [res, setRes] = useState()
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const {data, isLoading, isError} = useGetNotificationQuery({});
  const [putMarkAllRead] = usePutMarkAllReadMutation();
  console.log('notification data', data?.data.length);

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  const handleNotification = async () => {
    const res = await putMarkAllRead();
    console.log('read res', res?.data?.data);
    setRes(res?.data?.data)
    navigation.navigate('Notification')
  };
  return (
    <View style={tw``}>
      <View style={tw`flex-row items-center justify-between px-[4%]`}>
        <Image
          style={tw`w-28 h-12 my-4`}
          source={require('../assets/imgages/PuetroRicoLogo.png')}
        />
        <View style={tw`flex-row gap-4`}>
          <TouchableOpacity onPress={handleNotification}>
            <SvgXml style={tw`relative`} xml={IconNotification} />
            {res?.length > 0 && (
              <View
                style={tw`absolute bottom-4 z-20 bg-red-400 w-4 rounded-full h-4 right-2`}>
                <Text style={tw`text-center text-xs text-white`}>
                  {data?.data.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDrawer}>
            <View>
              <SvgXml xml={KibupIcon} />
            </View>
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
