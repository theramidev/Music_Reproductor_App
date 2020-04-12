import { NavigationState, NavigationScreenProp, NavigationParams } from "react-navigation";
import { MSong } from "../../../../models/song.model";

export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    listSongs: MSong[],
    updateFavorite(current: MSong): Promise<void>,
    current: MSong,
    refreshing: boolean,
    refreshListSong(): void
}