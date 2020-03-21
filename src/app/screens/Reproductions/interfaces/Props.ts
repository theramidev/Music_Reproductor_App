import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { MReproduction } from "../../../models/reproduction.model";
import { WithTranslation } from "react-i18next";

export interface IProps extends WithTranslation {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    /**
     * @description Obtiene las canciones escuchadas recientemente
     * @return Promise<void>
     */
    getRecents(): Promise<void>,
    fileReducer: {
        data: {
            reproductions: MReproduction[]
        },
        loadings: {
            loadingGetReproductions: boolean 
        },
        error: {
            errorGetReproductions: any
        }
    }
}