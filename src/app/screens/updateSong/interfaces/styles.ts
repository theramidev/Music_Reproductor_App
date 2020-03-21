import {ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {
  DynamicViewStyle,
  DynamicTextStyle,
  DynamicImageStyle,
} from 'react-native-dark-mode';

export interface StylesUpdateImage {
  container: ViewStyle | DynamicViewStyle;
  title: TextStyle | DynamicTextStyle;
  image: ImageStyle | DynamicImageStyle;
}
