import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {WithTranslation} from 'react-i18next';
import {TFunction} from 'i18next';

export interface IProps extends WithTranslation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  t: TFunction;
}
