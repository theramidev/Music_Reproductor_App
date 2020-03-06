import {ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {
  DynamicViewStyle,
  DynamicTextStyle,
  DynamicImageStyle,
} from 'react-native-dark-mode';

export interface StylesHeader {
  container: ViewStyle | DynamicViewStyle;
  text: TextStyle | DynamicTextStyle;
  inputIcon: ViewStyle | DynamicViewStyle;
  searchIcon: TextStyle | DynamicTextStyle;
  search: ViewStyle | TextStyle | DynamicViewStyle | DynamicTextStyle;
  settings: TextStyle | DynamicTextStyle;
  iconSettings: TextStyle | DynamicTextStyle;
}

export interface StylesListOfMusic {
  container: ViewStyle | DynamicViewStyle;
  item: ViewStyle | DynamicViewStyle;
  image: ImageStyle | DynamicImageStyle;
  info: ViewStyle | DynamicViewStyle;
  title: TextStyle | DynamicTextStyle;
  group: TextStyle | DynamicTextStyle;
  icon: TextStyle | DynamicTextStyle;
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
