import {ViewStyle, TextStyle} from 'react-native';
import {DynamicViewStyle, DynamicTextStyle} from 'react-native-dark-mode';

export interface LoadingStyle {
  container: ViewStyle | DynamicViewStyle;
  text: TextStyle | DynamicTextStyle;
}
