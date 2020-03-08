import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { MReproduction } from "src/app/models/reproduction.model";

export interface IProps {
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