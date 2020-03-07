import { ReactNode } from "react";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    children?: ReactNode,
    iconName?: string
}