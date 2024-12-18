import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {leftArrow, lessThanIcon} from '../assets/icons/icons';
import {NavigProps} from '../interfaces/NaviProps';

type Props = {};

const FavoriteScreen = ({navigation}: NavigProps<string>) => {
  return (
    <ScrollView contentContainerStyle={tw` bg-white p-[4%]`}>
      <TouchableOpacity
        onPress={() => navigation?.goBack()}
        style={tw`flex-row items-center`}>
        <SvgXml xml={lessThanIcon} width={20} height={20} />
      
          <Text style={tw`text-textPrimary text-xl`}>Favorite Screen</Text>
         
      </TouchableOpacity>
      <Text style={tw`text-textSecondary px-5`}>
            Here you can find your favorites audio.
          </Text>
        

      <View style={tw`px-[4%] my-8`}>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center py-2`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center py-2`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center py-2`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center py-2`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center py-2`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center py-2`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center py-2`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center py-2`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('SrotyPreview')}
          style={tw`flex-row gap-4 items-center`}>
          <Image source={require('../assets/imgages/freeVideoimg1.png')} />
          <Text> Atlanta, Georgia</Text>
        </TouchableOpacity>
      </View>
      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
