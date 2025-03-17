import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import tw from '../lib/tailwind';
import {
  useGetSubscriptionQuery,
  usePostSubscriptionMutation,
} from '../redux/apiSlices/subsCriptionSlice';
import { useFocusEffect } from '@react-navigation/native';
import WebView from 'react-native-webview';

const {width, height} = Dimensions.get("screen")
const SubscriptionScreen = ({navigation}) => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [connected, setConnected] = useState()
  const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);
  const [postSubscription, {isLoading, isError, }] =
    usePostSubscriptionMutation();
  const {data, refetch} = useGetSubscriptionQuery({});
  // console.log('data ++++++++++++++++++++', data?.plans);

  const handleSubscription = async () => {
    console.log('click', selectedPlan);
    try {
      const formData = new FormData();
      formData.append('plan_id', selectedPlan);
      console.log("formData", formData)
      const res = await postSubscription(formData)
      console.log("res",  res?.data?.payment_url)
      const url = res?.data?.payment_url;
      if (url) {
        console.log('Onboarding URL:', url);
        setOnboardingUrl(url); // Store URL in state
      } else {
        console.warn('Onboarding URL is undefined:', res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleWebViewNavigation = async (event: any) => {
    console.log('WebView Navigation State:', event.url);
    console.log(event.url.includes('success'));
    // if (event.url.includes('your-app-success-url')) {
    if (event.url.includes('success')) {
      console.log('Onboarding Successful! Fetching account status...');
      setConnected(event.url.includes('success'))
      // const urlParams = new URLSearchParams(new URL(event.url).search);
      // const email = urlParams.get('email') as string; // Type assertion
      
      // console.log('Extracted Email:', email);
      // Fetch Stripe Account Status
      // try {
      //   const accountStatus = await checkConnet();
      //   console.log('Account Status:', accountStatus);

      //   // Replace with actual screen
      // } catch (error) {
      //   console.error('Error checking account status:', error);
      // }

      // Close the WebView
      setOnboardingUrl(null);
    }
    // useEffect(()=> {
    //   setTimeout(()=> {
    //     refetch()
    //   })
    // }, [1000])

    useFocusEffect(() => {
      console.log('refetch call');
      refetch();
    });

    if (event.url.includes('your-app-failure-url')) {
      console.warn('Onboarding Failed');
      setOnboardingUrl(null);
    }
  };

  if (onboardingUrl) {
    return (
      <WebView
        source={{uri: onboardingUrl}}
        style={{ flex: 1, width: "100%", height: height * 0.7 }}
        onNavigationStateChange={handleWebViewNavigation} 
      />
    );
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
    <View style={tw`flex-1 justify-center items-center bg-gray-100 p-4`}>
      <View style={tw`bg-white w-full max-w-md rounded-lg shadow-lg p-4`}>
        <Text style={tw`text-2xl font-bold text-center mb-4`}>
          Puerto Rico Audio Tours Premium
        </Text>

        <Text style={tw`text-sm text-gray-500 mb-6 text-justify`}>
          Lorem ipsum dolor sit amet consectetur. Arcu pulvinar pulvinar risus
          ac mattis viverra lectus leo. Risu...
        </Text>

        <View>
          {data?.plans.map(plan => {
            // console.log('plan', plan);
            return (
              <TouchableOpacity
                key={plan.id}
                style={[
                  tw`flex-row items-center p-4 mb-3 rounded-lg`,
                  selectedPlan === plan.id ? tw`bg-blue-600` : tw`bg-gray-200`,
                ]}
                onPress={() => setSelectedPlan(plan.id)}>
                <View style={tw`mr-2`}>
                  <Text style={tw`text-lg font-semibold`}>
                    {selectedPlan === plan.id ? '✔' : '◯'}
                  </Text>
                </View>
                <Text
                  style={[
                    tw`text-lg font-semibold`,
                    selectedPlan === plan.id ? tw`text-white` : tw`text-black`,
                  ]}>
                  {plan.plan_name}
                </Text>
                <Text
                  style={[
                    tw`ml-auto text-sm text-gray-400`,
                    selectedPlan === plan.plan_name
                      ? tw`text-white`
                      : tw`text-black`,
                  ]}>
                  {plan.price}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            style={tw`bg-gray-200 py-3 px-4 rounded-lg flex-1 mr-2`}
            onPress={() => navigation.goBack()}>
            <Text style={tw`text-blue-600 text-center`}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-blue-600 py-3 px-4 rounded-lg flex-1 ml-2`}
            onPress={handleSubscription}>
            <Text style={tw`text-white text-center`}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SubscriptionScreen;
