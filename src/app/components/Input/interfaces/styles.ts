import {ViewStyle, TextStyle} from 'react-native';
import {DynamicViewStyle, DynamicTextStyle} from 'react-native-dark-mode';

export interface StylesInput {
  label: TextStyle | DynamicTextStyle;
  input: ViewStyle | DynamicViewStyle;
  search: ViewStyle | TextStyle | DynamicViewStyle | DynamicTextStyle;
}
