import ImagePicker from 'react-native-image-picker';
import fs from 'react-native-fs';

/**
 * @description Abre la galería de fotos
 * @return Promise<string> -> path de la foto
 */
export const takePictureFromGallery = (): Promise<{uri: string, name: string}> => {
    return new Promise((resolve, reject) => {
        try {
            ImagePicker.launchImageLibrary({
                mediaType: 'photo',
                noData: true,
                permissionDenied: {
                    title: 'Permiso denegado',
                    text: 'Para poder tomar fotos con su cámara y elegir imágenes de su biblioteca.',
                    reTryTitle: 'Reintentar',
                    okTitle: 'Estoy seguro'
                }
            }, async ({error, didCancel, uri, fileName}) => {
        
                if (error) {
                    reject(error);
                    return;
                }

                if (didCancel) {
                    reject('canceled');
                    return;
                }

                

                resolve({uri, name: fileName ? fileName : Date.now().toString() + '.jpg'});
            });
        } catch (error) {
            reject(error);
        }
    });
}