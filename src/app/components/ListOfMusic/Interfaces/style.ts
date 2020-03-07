import {ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {
  DynamicViewStyle,
  DynamicTextStyle,
  DynamicImageStyle,
} from 'react-native-dark-mode';


export interface StylesListOfMusic {
  container: ViewStyle | DynamicViewStyle;
  item: ViewStyle | DynamicViewStyle;
  image: ImageStyle | DynamicImageStyle;
  info: ViewStyle | DynamicViewStyle;
  title: TextStyle | DynamicTextStyle;
  group: TextStyle | DynamicTextStyle;
  icon: TextStyle | DynamicTextStyle;
}

