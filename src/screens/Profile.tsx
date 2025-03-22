import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import tw from '../lib/tailwind';
import InputText from '../components/inputs/InputText';
import Button from '../components/buttons/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  useGetProfileQuery,
  usePostUpdateProfileMutation,
} from '../redux/apiSlices/profileSlice';

type Props = {};
interface ProfileData {
  fullname: string;
  phone: string;
  avatar: File | null; // Assuming 'file' is of type File
}

const Profile = (props: Props) => {
  const [profileImage, setProfileImage] = useState<string>('');
  console.log('profileImg', profileImage);
  const [postUpdateProfile, {isLoading, isError}] =
    usePostUpdateProfileMutation();
  const {data} = useGetProfileQuery({}, {
    refetchOnFocus:true
  });
  console.log('profile data', data?.data);

  useEffect(() => {

    const img = data?.data?.avatar;
    setProfileImage(img)
  }, [data?.data?.avatar]);

  const [profileData, setProfileData] = useState<ProfileData>({
    fullname: '',
    phone: '',
    avatar: null,
  });

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

  const handleUpdate = async () => {
    console.log('click');
    try {
      const formData = new FormData();
      formData.append('fullname', profileData?.fullname);
      formData.append('phone', profileData?.phone);

      // if (profileImage && profileImage.length > 0) {
      //   const fileUri =profileImage.split('/').pop();; // Full URI of the image
      //   console.log('fileUri', fileUri);

      //   formData.append('avatar', {
      //     uri: profileImage,
      //     name: "image",
      //     type: 'jpg',
      //   });
      // }

      if (profileImage) {
        formData.append('avatar', {
          uri: profileImage,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }
      console.log('formdata', formData);
      const updateRes = await postUpdateProfile(formData);
      console.log('updateRes', updateRes);
    } catch (error) {
      console.log(error);
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

        <Text style={tw`text-primaryBase text-lg mt-2`}>
        {data?.data?.name}
        </Text>
        <Text style={tw`text-primaryBase text-xs mt-2`}>
        {data?.data?.email}
        </Text>
      </TouchableOpacity>
      <View>
        <View
          style={tw`h-12 border w-[90%] mx-auto border-primaryBase rounded-2xl `}>
          <InputText
            onChangeText={text => {
              setProfileData(prev => ({
                ...prev,
                fullname: text,
              }));
            }}
            floatingPlaceholder
            placeholder="Your Full name"
            style={tw`text-textPrimary`}
            focusStyle={tw`border-primary`}
          />
        </View>
        {/* <View
          style={tw`h-12 border w-[90%] mx-auto border-primaryBase rounded-2xl my-2 `}>
          <InputText
            floatingPlaceholder
            placeholder="Your Last Name"
            style={tw`text-textPrimary`}
            focusStyle={tw`border-primary`}
          />
        </View> */}
        <View
          style={tw`h-12 border w-[90%] mx-auto border-primaryBase rounded-2xl mt-4 `}>
          <InputText
            onChangeText={text => {
              setProfileData(prev => ({
                ...prev,
                phone: text,
              }));
            }}
            floatingPlaceholder
            placeholder="Phone Number"
            style={tw`text-textPrimary`}
            focusStyle={tw`border-primary`}
          />
        </View>
        <View style={tw`w-[90%] mx-auto my-4`}>
          <Button
            onPress={handleUpdate}
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
