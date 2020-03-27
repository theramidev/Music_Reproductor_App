import {ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {
  DynamicViewStyle,
  DynamicTextStyle,
  DynamicImageStyle,
} from 'react-native-dark-mode';

export interface StylesProgress {
  container: ViewStyle | DynamicViewStyle;
  text: TextStyle | DynamicTextStyle;
  bar: ViewStyle | DynamicViewStyle;
  time: ViewStyle | DynamicViewStyle;
  start: TextStyle | DynamicTextStyle;
  finish: TextStyle | DynamicTextStyle;
  actions: TextStyle | DynamicTextStyle;
}

export interface StylesActions {
  container: ViewStyle | DynamicViewStyle;
  icon: TextStyle | DynamicTextStyle;
  iconActive: TextStyle | DynamicTextStyle;
}

export interface StylesModal {
  container: ViewStyle | DynamicViewStyle;
  icon: TextStyle | DynamicTextStyle;
  iconHeader: TextStyle | DynamicTextStyle;
  header: ViewStyle | DynamicViewStyle;
  textHeader: TextStyle | DynamicTextStyle;
  text: TextStyle | DynamicTextStyle;
  textWarning: TextStyle | DynamicTextStyle;
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
