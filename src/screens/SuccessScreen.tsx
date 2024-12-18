import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import tw from '../lib/tailwind';

type Props = {
    navigation: any; 
}

const SuccessScreen = (props:Props) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            props.navigation.goBack()
        }, 2000)
        return () => clearTimeout(timeout)
    }, [props.navigation]);
  return (
    <View style={tw`flex-1 items-center justify-center`}>
        <Image source={require('../assets/imgages/SUCCESS.png')}/>
      <Text>Success</Text>
    </View>
  )
}

export default SuccessScreen

const styles = StyleSheet.create({})