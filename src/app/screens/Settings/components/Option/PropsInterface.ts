import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
  
export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    title: string,
    iconName?: string,
    iconLibrary?: 'FontAwesome' | 'Feather' | 'Ionicons' | 'MaterialIcons'
}