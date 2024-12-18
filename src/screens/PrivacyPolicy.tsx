import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from '../lib/tailwind'
import { SvgXml } from 'react-native-svg'
import { leftArrow } from '../assets/icons/icons'
import { NavigProps } from '../interfaces/NaviProps'

type Props = {}

const PrivacyPolicy = ({navigation}:NavigProps<string>) => {
  return (
    <ScrollView>
     <View style={tw`flex-row px-[4%]`}>
        <TouchableOpacity onPress={()=> navigation?.goBack()} style={tw`py-6 px-4 flex-row gap-2 items-center`}>
          <SvgXml xml={leftArrow} width={25} height={25} />
          <Text style={tw`text-textPrimary text-2xl`}>
          FAQ
        </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus neque veritatis nam quae cupiditate dolor deserunt natus? Quaerat omnis commodi, sint laudantium esse, repellendus accusamus animi necessitatibus aliquid explicabo voluptatibus?
        </Text>
        <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus neque veritatis nam quae cupiditate dolor deserunt natus? Quaerat omnis commodi, sint laudantium esse, repellendus accusamus animi necessitatibus aliquid explicabo voluptatibus?
        </Text>
      </View>
      <StatusBar translucent={false}/>
    </ScrollView>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({})