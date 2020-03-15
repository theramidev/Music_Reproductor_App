import { Animated } from "react-native";

export interface IState {
    inSplash: boolean,
    springVal: Animated.Value,
    fadeVal: Animated.Value,
    fadePrincipal: Animated.Value
}
