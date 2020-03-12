import { GestureResponderEvent } from "react-native";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { MPlaylist } from "../../../../models/playlist.model";

export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    playlists: MPlaylist[],
    onCreate: (event: GestureResponderEvent) => void
}