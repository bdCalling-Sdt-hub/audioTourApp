import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import Button from '../components/buttons/Button';

type Props = {};

const AllowNotification = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={tw`bg-white`}>
      <View style={tw`mx-auto bg-cover w-full`}>
        <Image
          style={tw`w-full relative`}
          source={require('../assets/imgages/allowNotiGroup.png')}
        />
        <View style={tw`absolute top-[35%] left-[2%]`}>
          <View style={tw`mx-auto my-2`}>
            <View style={tw`flex-row gap-4 bg-white rounded-lg py-4 shadow-lg w-[75%] px-[4%]`}>
              <Image
                source={require('../assets/imgages/notificationimg1.png')}
              />
              <View style={tw`flex justify-center`}>
                <View style={tw`flex-row w-full items-center justify-between`}>
                  <Text style={tw`font-bold text-textPrimary text-sm`}>
                    Niagara falls 
                  </Text>
                  <Text>3min ago</Text>
                </View>
                <Text style={tw` text-textSecondary text-sm`}>
                  You are now going near Sajek
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`mx-auto my-2`}>
            <View style={tw`flex-row gap-4 bg-white rounded-lg py-4 shadow-lg w-[75%] px-[4%]`}>
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
                <Text style={tw` text-textSecondary text-sm`}>
                  You are now going near niagara
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={tw`px-[4%]`}>
        <Text
          style={tw`font-bold text-primaryBase text-3xl `}>
       Puerto Rico Audio Tours
        </Text>
        <Text style={tw`font-bold text-textPrimary text-3xl`}>
         would like to send you notifications
        </Text>
        <Text style={tw` text-textSecondary text-sm`}>
        Notifications may include alerts, sounds & icon badges. These can be configure in settings.  
      </Text>
      </View>
      
      <View style={tw`w-full`}>
        <Button
          onPress={() => navigation.navigate('BackgroundPermission')}
          containerStyle={tw`bg-[#0187D1] border-0 w-[90%] h-14 mx-auto my-12 items-center justify-center`}
          title="Set notification permission"
          textStyle={tw`text-white border-b-white border-b-2`}
        />
      </View>
      <StatusBar translucent={false} />
    </ScrollView>
  );
}; 

export default AllowNotification;

const styles = StyleSheet.create({});
