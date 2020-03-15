import {createAppContainer} from 'react-navigation';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import MusicScreen from './screens/Music';
import SettingsScreen from './screens/Settings';
import ReproductionsScreen from './screens/Reproductions';
import ChangeImageScreen from './screens/ChangeImage';
import FavoritesScreen from './screens/Favorites';

const Routes = createStackNavigator(
  {
    Home: HomeScreen,
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    Music: {
      screen: MusicScreen,
      navigationOptions: {
        gestureDirection: 'vertical',
        gestureEnabled: true,
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
      },
    },
    Reproductions: {
      screen: ReproductionsScreen,
      navigationOptions: {
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    ChangeImage: {
      screen: ChangeImageScreen,
      navigationOptions: {
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(Routes);
