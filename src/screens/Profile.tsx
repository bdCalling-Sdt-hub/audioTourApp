import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import tw from '../lib/tailwind';
import InputText from '../components/inputs/InputText';
import Button from '../components/buttons/Button';
import {launchImageLibrary} from 'react-native-image-picker';

type Props = {};

const Profile = (props: Props) => {
  const [profileImage, setProfileImage] = useState<string>('');

  // Function to handle image selection
  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri); // Only set the URI if it exists
    }
  };
  return (
    <ScrollView contentContainerStyle={tw``}>
      <Header />
            <TouchableOpacity onPress={selectImage} style={tw`items-center my-24`}>
        <Image
          source={
            profileImage
              ? {uri: profileImage}
              : require('../assets/imgages/profileAvater.png')
          }
          style={tw`w-24 h-24 rounded-full`}
        />
        <Text style={tw`text-primaryBase text-xs mt-2`}>
          Tap to change photo
        </Text>
      </TouchableOpacity>
      <View>
        <View
          style={tw`h-12 border w-[90%] mx-auto border-primaryBase rounded-2xl `}>
          <InputText
            floatingPlaceholder
            placeholder="Your First Name"
            style={tw`text-textPrimary`}
            focusStyle={tw`border-primary`}
          />
        </View>
        <View
          style={tw`h-12 border w-[90%] mx-auto border-primaryBase rounded-2xl my-2 `}>
          <InputText
            floatingPlaceholder
            placeholder="Your Last Name"
            style={tw`text-textPrimary`}
            focusStyle={tw`border-primary`}
          />
        </View>
        <View
          style={tw`h-12 border w-[90%] mx-auto border-primaryBase rounded-2xl `}>
          <InputText
            floatingPlaceholder
            placeholder="Phone Number"
            style={tw`text-textPrimary`}
            focusStyle={tw`border-primary`}
          />
        </View>
        <View style={tw`w-[90%] mx-auto my-4`}>
          <Button
            title="Update"
            textStyle={tw`text-white font-bold`}
            containerStyle={tw`bg-primaryBase border-0`}
          />
        </View>
      </View>
      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
