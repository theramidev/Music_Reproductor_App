import {createAppContainer} from 'react-navigation';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import Settings from './screens/Settings';
import Music from './screens/Music';

const Routes = createStackNavigator(
  {
    Home: HomeScreen,
    Settings: {
      screen: Settings,
      navigationOptions: {
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    Music: {
      screen: Music,
      navigationOptions: {},
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(Routes);
