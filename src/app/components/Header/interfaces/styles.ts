import {ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {DynamicViewStyle, DynamicTextStyle} from 'react-native-dark-mode';

export interface StylesHeader {
  container: ViewStyle | DynamicViewStyle;
  text: TextStyle | DynamicTextStyle;
  back: TextStyle | DynamicTextStyle;
  icon: TextStyle | DynamicTextStyle;
}

