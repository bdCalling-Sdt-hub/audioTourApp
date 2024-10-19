import {TouchableOpacity, View} from 'react-native';
import {TextField, TextFieldProps} from 'react-native-ui-lib'; // Import the type for TextField props
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

interface InputTextProps
  extends Omit<TextFieldProps, 'containerStyle' | 'fieldStyle'> {
  onPress?: () => void;
  svgFirstIcon?: string; // Left icon (search icon)
  svgSecondIcon?: string; // Right icon (optional)
  containerStyle?: any;
  fieldStyle?: any;
  Component?: React.ReactNode;
  focusSTyle?: any;
}

const InputText = ({
  onPress,
  svgFirstIcon, // Left icon
  svgSecondIcon, // Right icon
  containerStyle,
  fieldStyle,
  focusSTyle,
  Component,
  ...inputProps // Spread remaining props to pass to TextField
}: InputTextProps) => {
  const [focus, setFocus] = React.useState(false);

  return (
    <View
      style={[
        tw`flex-1 rounded-2xl px-4 bg-white flex-row items-center gap-3 h-14 `,
        containerStyle,
        focus && focusSTyle,
      ]}>
      {/* Render the left icon (search icon) if provided */}
      {svgFirstIcon && <SvgXml xml={svgFirstIcon} width={20} height={20} />}
      
      {/* TextField component */}
      <TextField
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        containerStyle={[tw`flex-1`]}
        fieldStyle={[
          tw`${inputProps?.floatingPlaceholder ? 'pb-4' : 'p-0'}`,
          fieldStyle,
        ]}
        {...inputProps} // Spread props here
      />

      {/* Render the right component or icon if provided */}
      {Component && Component}
      {svgSecondIcon && (
        <TouchableOpacity onPress={onPress}>
          <SvgXml xml={svgSecondIcon} width={20} height={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputText;
