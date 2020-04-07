import {ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {
  DynamicViewStyle,
  DynamicTextStyle,
  DynamicImageStyle,
} from 'react-native-dark-mode';

export interface StylesListOfMusic {
  options: ViewStyle | DynamicViewStyle;
  random: ViewStyle | DynamicViewStyle;
  textRandom: TextStyle | DynamicTextStyle;
  iconOptions: TextStyle | DynamicTextStyle;

  container: ViewStyle | DynamicViewStyle;
  containerItem: ViewStyle | DynamicViewStyle;
  itemContent: ViewStyle | DynamicViewStyle;
  item: ViewStyle | DynamicViewStyle;
  image: ImageStyle | DynamicImageStyle;
  info: ViewStyle | DynamicViewStyle;
  title: TextStyle | DynamicTextStyle;
  group: TextStyle | DynamicTextStyle;
  icon: TextStyle | DynamicTextStyle;

  actions: ViewStyle | DynamicViewStyle;
  actionsText: TextStyle | DynamicTextStyle;
  actionsTitle: TextStyle | DynamicTextStyle;
}
