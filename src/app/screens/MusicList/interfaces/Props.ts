import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { MSong } from "../../../models/song.model";

export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    musicReducer: {
        current: MSong
    }
}