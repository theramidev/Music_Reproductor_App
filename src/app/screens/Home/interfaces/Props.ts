import { ISong } from "src/app/models/song.model";

export interface IProps {
    navigation: any,
    /**
     * @description Manda a buscar las canciones dentro del dispositivo
     */
    getSongs(): Promise<void>,
    fileReducer: {
        data: {
            songs: ISong[]
        },
        loadings: {
            loadingSongs: boolean
        },
        errors: {
            errorSongs: any
        }
    },
    /**
     * @description Activa el Music Control y se comienza a reproducir las canciones
     * @param songs Canciones
     */
    activateTrackPlayer(songs: ISong[]): Promise<void>,
    /**
     * @description Obtiene el tiempo de duración de la canción en formato mm:ss. Ej: 4:12
     * @param durationInMilisecons Duración de la canción en milisegundo
     * @return string
     */
    getDuration(durationInMilisecons: number): string
}