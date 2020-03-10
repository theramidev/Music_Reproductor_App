import {ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {
  DynamicViewStyle,
  DynamicTextStyle,
  DynamicImageStyle,
} from 'react-native-dark-mode';

export interface StylesHeader {
  container: ViewStyle | DynamicViewStyle;
  text: TextStyle | DynamicTextStyle;
  back: TextStyle | DynamicTextStyle;
}

export interface StylesOptions {
  container: ViewStyle | DynamicViewStyle;
  text: TextStyle | DynamicTextStyle;
  image: ImageStyle | DynamicImageStyle;
}

export interface StylesFooter {
  container: ViewStyle | DynamicViewStyle;
  image: ImageStyle;
  info: ViewStyle;
  music: ViewStyle;
  title: TextStyle | DynamicTextStyle;
  group: TextStyle | DynamicTextStyle;
  options: ViewStyle;
  icon: TextStyle | DynamicTextStyle;
}

export interface StyleOption {
  container: ViewStyle | DynamicViewStyle,
  text: TextStyle | DynamicTextStyle,
  icon: TextStyle | DynamicTextStyle
}
