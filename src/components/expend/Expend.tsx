import {Text, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {ExpandableSection} from 'react-native-ui-lib';
import tw from '../../lib/tailwind';
import {IconBottomArrow} from '../../assets/icons/icons';

const Expend = () => {
  const [expend, setExpended] = React.useState(false);
  return (
    <View style={tw`mx-[4%] gap-2 py-6 border-b border-b-inputBorder`}>
      <ExpandableSection
        expanded={expend}
        sectionHeader={
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-primary300 font-NunitoBold text-base`}>
              What is the purpose of this app?
            </Text>
            <SvgXml xml={IconBottomArrow} style={tw`pr-4`} />
          </View>
        }
        onPress={() => setExpended(!expend)}>
        <View style={tw`my-2`}>
          <Text style={tw`text-offWhite font-NunitoRegular text-sm`}>
            This app allows users to transfer funds between wallets securely and
            efficiently. It simplifies peer-to-peer financial transactions with
            minimal fees and maximum security.
          </Text>
        </View>
      </ExpandableSection>
    </View>
  );
};

export default Expend;
