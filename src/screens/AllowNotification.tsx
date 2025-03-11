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
import notifee, { AndroidImportance } from '@notifee/react-native';





type Props = {};

const AllowNotification = ({navigation}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  console.log("permitions", permissionGranted)

  // Function to handle notification permission
  const handleNotificationPermission = async () => {
    try {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus === 1) {
        // Permission granted
        Alert.alert('Permission Granted', 'Notifications have been enabled.');
        setPermissionGranted(true);
        await createNotificationChannel();
        navigation.navigate('BackgroundPermission');
      } else {
        // Permission denied
        Alert.alert(
          'Permission Denied',
          'Please enable notifications in your device settings to continue.',
        );
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  // Function to create a notification channel (required for Android)
  const createNotificationChannel = async () => {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH, // Fix applied here
      // importance: notifee?.AndroidImportance.HIGH, // Fix applied here
    });
  };
  

  return (
    <ScrollView contentContainerStyle={tw`bg-white`}>
      <View style={tw`mx-auto bg-cover w-full`}>
        <Image
          style={tw`w-full relative`}
          source={require('../assets/imgages/allowNotiGroup.png')}
        />
        <View style={tw`absolute top-[35%] left-[2%]`}>
          <View style={tw`mx-auto my-2`}>
            <View
              style={tw`flex-row gap-4 bg-white rounded-lg py-4 shadow-lg w-[75%] px-[4%]`}>
              <Image
                source={require('../assets/imgages/notificationimg1.png')}
              />
              <View style={tw`flex justify-center`}>
                <View style={tw`flex-row w-full items-center justify-between`}>
                  <Text style={tw`font-bold text-textPrimary text-sm`}>
                    Niagara Falls
                  </Text>
                  <Text>3min ago</Text>
                </View>
                <Text style={tw`text-textSecondary text-sm`}>
                  You are now going near Sajek
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`mx-auto my-2`}>
            <View
              style={tw`flex-row gap-4 bg-white rounded-lg py-4 shadow-lg w-[75%] px-[4%]`}>
              <Image
                source={require('../assets/imgages/notificationimg2.png')}
              />
              <View style={tw`flex justify-center`}>
                <View style={tw`flex-row w-full items-center justify-between`}>
                  <Text style={tw`font-bold text-textPrimary text-sm`}>
                    Sajek Bangladesh
                  </Text>
                  <Text>3min ago</Text>
                </View>
                <Text style={tw`text-textSecondary text-sm`}>
                  You are now going near Niagara
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={tw`px-[4%]`}>
        <Text style={tw`font-bold text-primaryBase text-3xl`}>
          Puerto Rico Audio Tours
        </Text>
        <Text style={tw`font-bold text-textPrimary text-3xl`}>
          would like to send you notifications
        </Text>
        <Text style={tw`text-textSecondary text-sm`}>
          Notifications may include alerts, sounds, and icon badges. These can
          be configured in settings.
        </Text>
      </View>

      <View style={tw`flex-row w-[90%] mx-auto`}>
        <View style={tw`w-[80%]`}>
          <Button
            onPress={handleNotificationPermission}
            containerStyle={tw`bg-[#0187D1] border-0 w-[90%] h-14 mx-auto my-12 items-center justify-center`}
            title="Set Notification Permission"
            textStyle={tw`text-white border-b-white border-b-2`}
          />
        </View>
        <View style={tw`w-[20%]`}>
          <Button
            onPress={() => navigation.navigate('BackgroundPermission')}
            containerStyle={tw`bg-gray-500 border-0 w-[90%] h-14 mx-auto my-12 items-center justify-center`}
            title="next"
            textStyle={tw`text-white border-b-white border-b-2`}
          />
        </View>
      </View>
      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default AllowNotification;

const styles = StyleSheet.create({});
