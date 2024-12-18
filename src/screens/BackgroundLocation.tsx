import { Image, ScrollView, StatusBar, Text, View, StyleSheet } from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import Button from '../components/buttons/Button';

type Props = {};

const BackgroundLocation = ({ navigation }) => {
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
            onPress={() => navigation.navigate('BackgroundLocation')}
            containerStyle={tw`bg-[#0187D1] border-0 px-24 h-14 mx-auto my-12 items-center justify-center`}
            title="Set Location permission"
            textStyle={tw`text-white border-b-white border-b-2`}
          />
        </View>
      </View>

      {/* Logo at the bottom */}
      <View style={tw`w-full mx-auto pb-10`}>
        <Image
          style={tw`w-48 h-22 mx-auto`}
          source={require('../assets/imgages/SplashLgo.png')}
        />
      </View>

      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default BackgroundLocation;

const styles = StyleSheet.create({});
