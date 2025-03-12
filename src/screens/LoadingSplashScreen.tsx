import {StatusBar, StyleSheet, View} from 'react-native';
// import {getSocket, initiateSocket} from '../../redux/services/socket';

import React from 'react';
import FastImage from 'react-native-fast-image';
// import {NavigProps} from '../../interfaces/NaviProps';
import { getStorageToken, lStorage } from '../utils/utils';
import tw from '../lib/tailwind';
import { useLazyGetCheckTokenQuery } from '../redux/apiSlices/authSlice';
// import {getStorageToken} from '../../utils/utils';

const LoadingSplash = ({navigation}) => {
 
  const [triggerCheckToken, { data, error, isLoading }] = useLazyGetCheckTokenQuery()
 const token = lStorage.getString("token")
 console.log("17", token)
 
  const handleCheckValidToken = async () => {
    try {
      const res = await triggerCheckToken(token).unwrap();
      // const res = await checkToken(token).unwrap();
      console.log("loading token++++++++++++++++++++++", res)
      if (res?.token_status === true) {
        (navigation as any)?.replace('BottomHome');
      } else {
        (navigation as any)?.replace('login');
      }
    } catch (error) {
      console.log("28", error);
      (navigation as any)?.replace('login');
    }
  };
  React.useEffect(() => {
    if (token) {
      handleCheckValidToken();
    } else {
      (navigation as any)?.replace('login');
    }
  }, []);

  return (
    <View style={tw`flex-1 w-full bg-white justify-center items-center`}>
      <FastImage
        style={tw`w-28 h-28 flex-1 `}
        resizeMode={FastImage.resizeMode.contain}
        source={require('../assets/imgages/SplashLgo.png')}
      />
      <StatusBar barStyle="light-content" backgroundColor={'#4964C6'} />
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({});
