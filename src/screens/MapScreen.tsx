import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { SvgXml } from 'react-native-svg';
import { PlayButton } from '../assets/icons/icons';
import Header from '../components/Header';
import tw from '../lib/tailwind';
import { NavigProps } from '../interfaces/NaviProps';

interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const MapScreen = ({ navigation }: NavigProps<string>) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  console.log(currentLocation);

  // Request location permissions
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to display the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } else if (Platform.OS === 'ios') {
        const permissionGranted = await Geolocation.requestAuthorization('whenInUse');
        if (permissionGranted === 'granted') {
          console.log('iOS location permission granted');
          getCurrentLocation();
        } else {
          console.log('iOS location permission denied');
        }
      }
    } catch (err) {
      console.warn('Permission request error:', err);
    }
  };

  // Get the current location
  const getCurrentLocation = () => {
    console.log('Fetching location...');
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Position fetched:', position);
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setIsFetchingLocation(false);
      },
      (error) => {
        console.warn('Error fetching location:', error);
        setIsFetchingLocation(false);
        if (error.code === 3) {
          Alert.alert('Timeout', 'Location request timed out. Please try again.');
        } else if (error.code === 1) {
          Alert.alert('Permission Denied', 'Please grant location permission.');
        } else if (error.code === 2) {
          Alert.alert('Location Unavailable', 'Unable to fetch location.');
        } else {
          Alert.alert('Error', `Unable to fetch location: ${error.message}`);
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 60000,
        maximumAge: 10000,
      }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (position) => {
        console.log('Position updated:', position);
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => {
        console.warn('Error watching location:', error);
      },
      {
        enableHighAccuracy: false,
        distanceFilter: 10,
      }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  // Handle location fetching states
  if (isFetchingLocation) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-textPrimary`}>Fetching location...</Text>
      </View>
    );
  }

  if (!currentLocation) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-textPrimary`}>Unable to fetch location.</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <View style={tw`z-10`}>
        <Header />
      </View>
      <View>
        <MapView
          style={tw`w-full h-screen`}
          provider={PROVIDER_GOOGLE}
          region={currentLocation}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={currentLocation}
            onPress={() => setShowPopup(true)}
          />
        </MapView>
        {showPopup && (
          <View style={styles.popup}>
            <Text style={styles.title}>You can choice</Text>
            {/* <Text style={styles.description}>
              Latitude: {currentLocation.latitude.toFixed(6)}, Longitude: {currentLocation.longitude.toFixed(6)}
            </Text> */}
            <View style={tw``}>
              <TouchableOpacity style={tw`bg-white shadow-lg rounded-xl p-4`}>
             <View style={tw`flex-row justify-between`}>
             <Text style={tw`text-center text-textSecondary`}>Listening in English</Text>
             <Image source={require('../assets/imgages/usaFlag.png')}/>
             </View>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-white shadow-lg rounded-xl my-1 p-4`}>
                <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-center text-textSecondary`}>Listening in Spanish</Text>
                <Image source={require('../assets/imgages/spanishFlag.png')}/>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={[
          tw`bg-[#DFEAF4] justify-end flex-col z-30`,
          { position: 'absolute', bottom: 0, left: 0, right: 0, },
        ]}
      >
        <View style={tw`flex-row gap-4 py-2 px-[6%]`}>
          <SvgXml xml={PlayButton} width={25} height={25} />
          <Text style={tw`text-textPrimary`}>Atlanta, Georgia</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation?.navigate('EnjoyThreeFreeAudio')}
          activeOpacity={0.7}
          style={tw`flex-row bg-[#00216B] gap-4 py-3 px-[6%]`}
        >
          <Text style={tw`text-white flex mx-auto text-center`}>
            Enjoy 3 audios free
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    // bottom: 120,
    top: 150,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
    fontSize: 14,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#FF0000',
    fontSize: 14,
  },
});
