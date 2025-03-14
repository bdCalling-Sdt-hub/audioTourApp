// import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useState} from 'react';
// // import {colors} from '../../constants/color';

// import Header from '../components/Header';
// import FloatingPlayer from '../components/player/FloatingPlayer';
// import {songWithCategory} from '../data/SongsWithCategory';
// import {useTheme} from '@react-navigation/native';
// import SongCardWithCategory from '../components/player/SongCardWithCategory';


// const Home: React.FC = () => {
//   const {colors} = useTheme();
//   const [selectedSong, setSelectedSong] = useState(null);
//   console.log("18 Selected Song", selectedSong);
//   // function to handle song selection
//   const handleSongSelect = (song) => {
//     console.log("home song+++++++++++++++++++++++++++++++++",song)
//     setSelectedSong(song);
//   }
//   // return (
//   //   <View style={[styles.container, {backgroundColor: colors.background}]}>
//   //     <Header />
//   //     <FlatList  data={songWithCategory} renderItem={({item})=> <SongCardWithCategory
//   //     item={item}
//   //     onSelect={(song) => handleSongSelect(song)}
//   //     />}
//   //     contentContainerStyle={{
//   //       paddingBottom: 400,
//   //     }}
//   //     />
//   //     {/* conditionally render the floatingPlayer if a song is selected */}
//   //     {selectedSong && <FloatingPlayer song={selectedSong} />}

//   //   </View>
//   // );
//   return (
//     <View style={[styles.container, {backgroundColor: "bg-red-600"}]}>
      
//       <Header />
//       <FlatList
//         data={songWithCategory}
//         renderItem={({item}) => <SongCardWithCategory item={item}/>}
//         contentContainerStyle={{
//           paddingBottom: 400,
//         }}
        
//       />
     
//      <FloatingPlayer/>
      
    
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor: colors.background,
//     flex: 1,
//     // color: colors.textPrimary,
//   },
// });

import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
// import {colors} from '../../constants/color';


import {fontFamilies} from '../constants/fonts';
import {fontSizes, spacing} from '../constants/dimensions';
import SongCard from '../components/player/SongCard';
import SongCardWithCategory from '../components/player/SongCardWithCategory';
import FloatingPlayer from '../components/player/FloatingPlayer';
import {songWithCategory} from '../data/SongsWithCategory';
import {useTheme} from '@react-navigation/native';
import Header from '../components/Header';
import tw from '../lib/tailwind';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {colors} = useTheme();
  const [selectedSong, setSelectedSong] = useState(null);
  console.log("Selected Song", selectedSong);
  // function to handle song selection
  const handleSongSelect = (song) => {
    setSelectedSong(song);
  }

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#064145" />
        <Text style={tw`text-primary mt-2`}>Loading ....</Text>
      </View>
    );
  }
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header />
      <FlatList  data={songWithCategory} renderItem={({item})=> <SongCardWithCategory
      item={item}
      onSelect={(song) => handleSongSelect(song)}
      />}
      contentContainerStyle={{
        paddingBottom: 400,
      }}
      />
      {/* conditionally render the floatingPlayer if a song is selected */}
      {selectedSong && <FloatingPlayer song={selectedSong} />}

    </View>
  );
  // return (
  //   <View style={[styles.container, {backgroundColor: colors.background}]}>
  //     <Header />
  //     <FlatList
  //       data={songWithCategory}
  //       renderItem={({item}) => <SongCardWithCategory item={item}/>}
  //       contentContainerStyle={{
  //         paddingBottom: 400,
          
  //       }}
        
  //     />
     
  //    <FloatingPlayer/>
     
    
  //   </View>
  // );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.background,
    flex: 1,
    // color: colors.textPrimary,
  },
});
