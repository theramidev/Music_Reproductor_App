import {createAppContainer} from 'react-navigation';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';
import ReproductionsScreen from './screens/Reproductions';
import ChangeImageScreen from './screens/ChangeImage';

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
    Reproductions: {
      screen: ReproductionsScreen,
      navigationOptions: {
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }
    },
    ChangeImage: {
      screen: ChangeImageScreen,
      navigationOptions: {
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(Routes);
