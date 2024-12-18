import { View, Text, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import tw from '../lib/tailwind'
import logo from '../assets/imgages/SplashLgo.png'

type Props = {}

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    
    const timer = setTimeout(() => {
    
      navigation.replace('OnboardingScreen1'); 
    }, 2000);

     return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <View>
        <Image source={require('../assets/imgages/SplashLgo.png')}/>
      </View>
     <StatusBar translucent={false}/>
    </View>
  )
}

export default SplashScreen