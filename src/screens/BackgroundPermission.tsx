import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import Button from '../components/buttons/Button';

type Props = {};

const BackgroundPermission = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 bg-white items-center justify-between px-[4%]`}>
      
      {/* Main Content (Image, Text, Button) */}
      <View style={tw`flex-1 justify-center items-center`}>
        <Image source={require('../assets/imgages/LocatioinIndicationBP.png')} />
        <Text style={tw`text-textPrimary font-bold text-lg mt-4`}>
          Background Permission
        </Text>
        <Text style={tw`text-textSecondary py-2 text-sm text-center`}>
          Background location gives you the best experience. The magic of Puerto
          Rico Audio Tours is discovering stories as you drive even if you’re not
          using the app. Let Puerto Rico Audio Tours use your locations, even if
          you’re in your favorite navigation or music apps. We never share or sell
          your location information to third parties.
        </Text>
        
        {/* Button */}
        <View style={tw``}>
          <Button
            onPress={() => navigation.navigate('BackgroundLocation')}
            containerStyle={tw`bg-[#0187D1] border-0 px-12 h-14  my-12 items-center justify-center`}
            title="Set background permission"
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

export default BackgroundPermission;

const styles = StyleSheet.create({});
