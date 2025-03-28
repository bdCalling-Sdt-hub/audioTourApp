// import {
//     Image,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React from 'react';
// import {SvgXml} from 'react-native-svg';
// import {crossIcon, DirectionIcon, locationIndicator, PlayButton} from '../assets/icons/icons';
// import tw from '../lib/tailwind';
// import {NavigProps} from '../interfaces/NaviProps';

// type Props = {};

// const StoryPreview = ({navigation}: NavigProps<string>) => {
//   return (
//     <ScrollView contentContainerStyle={tw`flex-1`}>
//       <View style={tw`flex-row justify-between p-[4%]`}>
//         <Text style={tw`text-textPrimary font-bold`}>Story Preview</Text>
//         <TouchableOpacity onPress={() => navigation?.goBack()}>
//           <SvgXml xml={crossIcon} width={25} height={25} />
//         </TouchableOpacity>
//       </View>
//       <View style={tw` w-full`}>
//         <Image style={tw`w-full`} source={require('../assets/imgages/StoryOnClick.png')}/>
//         <View style={tw`flex-row justify-between py-4 mx-[6%] border-b-gray-300 border-b-2`}>
//           <Text style={tw`text-textPrimary`}>Atlanta, Georgia</Text>
//         <TouchableOpacity onPress={() => navigation?.navigate('Player')}>
//         <SvgXml xml={PlayButton} width={25} height={25} />
//         </TouchableOpacity>
//         </View>
//       </View>
//       <View style={tw`p-[4%]`}>
//         <Text style={tw`text-primaryBase`}>Puerto Rico Audio Tours production</Text>
//         <View style={tw`flex-row gap-4 items-center py-1`}>
//             <SvgXml xml={locationIndicator} width={15} height={15}/>
//             <Text>Los angles CA</Text>
//         </View>
//       </View>
//       <View style={tw`px-[4%]`}>
//         <Text>
//         Lorem ipsum dolor sit amet consectetur. Diam malesuada viverra purus bibendum vestibulum. Elementum a id gravida quis nec viverra. 
//         </Text>
//       </View>
//       <View style={tw`m-[4%] border h-48 rounded-lg`}>
  
//       </View>
//       <View style={tw`px-[4%] flex-row gap-2`}>
//       <SvgXml xml={DirectionIcon} width={20} height={20}/>
//       <Text style={tw`text-textSecondary`}>Get Direction</Text>
//       </View>
//       <StatusBar translucent={false} />
//     </ScrollView>
//   );
// };

// export default StoryPreview;

// const styles = StyleSheet.create({});

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
import {SvgXml} from 'react-native-svg';
import {crossIcon, DirectionIcon, locationIndicator, PlayButton} from '../assets/icons/icons';
import tw from '../lib/tailwind';
import {NavigProps} from '../interfaces/NaviProps';

const StoryPreview = ({navigation, route}: NavigProps<string>) => {
  // Extract selectedTrack and trackList from route.params
  const {selectedTrack, trackList} = route.params || {};

  return (
    <ScrollView contentContainerStyle={tw`flex-1`}>
      <View style={tw`flex-row justify-between p-[4%]`}>
        <Text style={tw`text-textPrimary font-bold`}>Story Preview</Text>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <SvgXml xml={crossIcon} width={25} height={25} />
        </TouchableOpacity>
      </View>

      <View style={tw`w-full`}>
        {/* Show track image or fallback */}
        <Image
          style={tw`w-full`}
          source={
            selectedTrack?.image
              ? {uri: selectedTrack.image}
              : require('../assets/imgages/StoryOnClick.png') // Fallback image
          }
        />
        <View style={tw`flex-row justify-between py-4 mx-[6%] border-b-gray-300 border-b-2`}>
          <Text style={tw`text-textPrimary`}>
            {selectedTrack?.location || 'Unknown Location'}
          </Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Player', {selectedTrack, trackList})}>
            <SvgXml xml={PlayButton} width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`p-[4%]`}>
        <Text style={tw`text-primaryBase`}>
          {selectedTrack?.description || 'Puerto Rico Audio Tours production'}
        </Text>
        <View style={tw`flex-row gap-4 items-center py-1`}>
          <SvgXml xml={locationIndicator} width={15} height={15} />
          <Text>{selectedTrack?.city || 'Los Angeles, CA'}</Text>
        </View>
      </View>

      <View style={tw`px-[4%]`}>
        <Text>
          {selectedTrack?.details ||
            'Lorem ipsum dolor sit amet consectetur. Diam malesuada viverra purus bibendum vestibulum. Elementum a id gravida quis nec viverra.'}
        </Text>
      </View>

      <View style={tw`m-[4%] border h-48 rounded-lg`}>
        {/* Placeholder for additional content */}
      </View>

      <View style={tw`px-[4%] flex-row gap-2`}>
        <SvgXml xml={DirectionIcon} width={20} height={20} />
        <Text style={tw`text-textSecondary`}>Get Direction</Text>
      </View>

      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default StoryPreview;

const styles = StyleSheet.create({});
