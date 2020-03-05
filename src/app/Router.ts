import {createAppContainer} from 'react-navigation';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import Settings from './screens/Settings';

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
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(Routes);
