import { GestureResponderEvent } from "react-native";
import { MPlaylist } from "../../../../models/playlist.model";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    mode: 'add' | 'playlist',
    playlist?: MPlaylist
    onCreate?: (event: GestureResponderEvent) => void,
    title?: string
}