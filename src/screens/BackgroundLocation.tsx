import { Image, ScrollView, StatusBar, Text, View, StyleSheet, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import tw from '../lib/tailwind';
import Button from '../components/buttons/Button';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

type Props = {};

const BackgroundLocation = ({ navigation }) => {
  const [permissionStatus, setPermissionStatus] = useState('');

  // Function to request location permission
  const handleLocationPermission = async () => {
    try {
      const result = await request(
        Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        })
      );

      if (result === RESULTS.GRANTED) {
        Alert.alert('Permission Granted', 'Location permission is now enabled.');
        setPermissionStatus('Granted');
        navigation.navigate('login');
      } else if (result === RESULTS.DENIED) {
        Alert.alert('Permission Denied', 'You need to grant location permission to use this feature.');
        setPermissionStatus('Denied');
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert('Permission Blocked', 'Location permission is blocked. Please enable it in settings.');
        setPermissionStatus('Blocked');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      Alert.alert('Error', 'An error occurred while requesting permission. Please try again.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 bg-white items-center justify-between px-[4%]`}>
      {/* Main content */}
      <View style={tw`flex-1 justify-center items-center`}>
        <Image source={require('../assets/imgages/LocatioinIndicationBP.png')} />
        <Text style={tw`text-textPrimary font-bold text-lg mt-4`}>
          Location Permission
        </Text>
        <Text style={tw`text-textSecondary py-2 text-sm text-center`}>
          Select “Allow While Using App” to discover nearby stories, especially on road trips.
        </Text>
  
        {/* Button */}
        <View style={tw``}>
          <Button
            onPress={handleLocationPermission}
            containerStyle={tw`bg-[#0187D1] border-0 px-24 h-14 mx-auto my-12 items-center justify-center`}
            title="Set Location permission"
            textStyle={tw`text-white border-b-white border-b-2`}
          />
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

export default BackgroundLocation;

const styles = StyleSheet.create({});
