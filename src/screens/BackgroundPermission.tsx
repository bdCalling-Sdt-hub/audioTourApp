import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import tw from '../lib/tailwind';
import Button from '../components/buttons/Button';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

type Props = {};

const BackgroundPermission = ({navigation}) => {
  const [permissionStatus, setPermissionStatus] = useState('');

  // Function to handle background location permission
  const handleBackgroundPermission = async () => {
    const result = await request(
      Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
        android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      }),
    );

    if (result === RESULTS.GRANTED) {
      Alert.alert(
        'Permission Granted',
        'Background location permission is now enabled.',
      );
      setPermissionStatus('Granted');
    } else if (result === RESULTS.DENIED) {
      Alert.alert(
        'Permission Denied',
        'You need to grant background location permission for the best experience.',
      );
      setPermissionStatus('Denied');
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Blocked',
        'Background location permission is blocked. Please enable it in settings.',
      );
      setPermissionStatus('Blocked');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 bg-white items-center justify-between px-[4%]`}>
      {/* Main Content (Image, Text, Button) */}
      <View style={tw`flex-1 justify-center items-center`}>
        <Image
          source={require('../assets/imgages/LocatioinIndicationBP.png')}
        />
        <Text style={tw`text-textPrimary font-bold text-lg mt-4`}>
          Background Permission
        </Text>
        <Text style={tw`text-textSecondary py-2 text-sm text-center`}>
          Background location gives you the best experience. The magic of Puerto
          Rico Audio Tours is discovering stories as you drive even if you’re
          not using the app. Let Puerto Rico Audio Tours use your locations,
          even if you’re in your favorite navigation or music apps. We never
          share or sell your location information to third parties.
        </Text>

        {/* Button */}
        <View style={tw`flex-row w-[90%]`}>
        <View style={tw`w-[80%]`}>
          <Button
            onPress={handleBackgroundPermission}
            containerStyle={tw`bg-[#0187D1] border-0 px-4 h-14  my-12 items-center justify-center`}
            title="Set background permission"
            textStyle={tw`text-white border-b-white border-b-2`}
          />
        </View>
        <View style={tw`w-[20%]`}>
          <Button
            onPress={() => navigation.navigate('BackgroundLocation')}
            containerStyle={tw`bg-gray-500 border-0 w-[90%] h-14 mx-auto my-12 items-center justify-center`}
            title="next"
            textStyle={tw`text-white border-b-white border-b-2`}
          />
        </View>
        </View>
      </View>

      {/* Logo at the bottom */}
      <View style={tw` pb-10`}>
        <Image
          style={tw`w-48 h-22`} // Resize the image here
          source={require('../assets/imgages/SplashLgo.png')}
        />
      </View>

      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default BackgroundPermission;

const styles = StyleSheet.create({});
