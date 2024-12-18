import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from '../lib/tailwind'
import Button from '../components/buttons/Button'

type Props = {}

const OnboardingScreen1 = ({navigation}) => {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white px-[4%]`}>
      <View style={tw`my-6`}>
        <Image source={require('../assets/imgages/SplashLgo.png')}/>
      </View>
      <View>
        <Text style={tw`font-bold text-textPrimary text-2xl text-center py-12 `}>Welocome, Explorer</Text>
        <Text style={tw`font-bold text-textSecondary text-center text-lg`}>Puerto Rico Audio Tours is a location-based audio app that alerts you to exciting stories along your journey.</Text>
      </View>
      <Text style={tw`font-bold text-textSecondary text-center py-12 text-xl`}>We will need a few permissions to get started</Text>
      <View style={tw`w-full`}>
        <Button
        onPress={()=>navigation.navigate('OnboardingScreen2')}
        containerStyle={tw`bg-[#0187D1] border-0 w-[50%] h-14 mx-auto my-12 items-center justify-center`} title="Lets Go!" textStyle={tw`text-white border-b-white border-b-2`}/>
      </View>
     <StatusBar translucent={false}/>
    </View>
  )
}

export default OnboardingScreen1

const styles = StyleSheet.create({})