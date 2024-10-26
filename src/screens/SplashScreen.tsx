import { View, Text } from 'react-native'
import React from 'react'
import tw from '../lib/tailwind'
import logo from '../assets/imgages/SplashLgo.png'

type Props = {}

const SplashScreen = (props: Props) => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen