import React, { FC, useState, useEffect } from 'react';
import { ScrollView, View, Modal, Image, TouchableOpacity, Text } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';
import DocumentPicker from 'react-native-document-picker';

import { PhotoCard } from '../PhotoCard';
import { BackgroundLayout } from '../../../../components/BackgroundLayout';


export const ListOfPhotoCard: FC<IProps> = ({onWallpaperSelect, wallpapers = [], onWallpaperChange, onDeleteWallpaper}) => {
    const [photo, setPhoto] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = async (photo: string) => {
        // console.log(photo);
        if (photo && photo !== 'default') {
            console.log(photo);
            setPhoto(photo);
            setModalVisible(true);
            return;
        } else if (photo === 'default') {
            setPhoto('');
            onWallpaperChange(null);
            return;
        }

        try {
            const {uri, name} = await DocumentPicker.pick({
                type: [DocumentPicker.types.images]
            });

            onWallpaperSelect({uri, name});
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log('DocumentPicker canceled!');
                return;
            }
            console.error(error);
        }
    }

    const changeCurrentWallpaper = () => {
        onWallpaperChange(photo);
        setModalVisible(false);
    }

    const closeModal = () => setModalVisible(false);

    return(
        <ScrollView>
            <View style={styles.photosContainer}>
                <PhotoCard mode="add" onPress={openModal} />
                <PhotoCard mode="default" onPress={openModal} />
                {
                    wallpapers.map((wallpaper, i) => {
                        return(
                            <PhotoCard key={i}
                                mode="photo" 
                                onPress={openModal} 
                                wallpaperPath={wallpaper}
                                onDelete={onDeleteWallpaper}
                            />
                        )
                    })
                }
            </View>

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
            >
                <BackgroundLayout>
                    {
                        photo && 
                        <Image 
                            source={{uri: `file://${photo}`}}
                            style={styles.modalImage}
                        />
                    }

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={closeModal}>
                            <Text style={styles.textButton}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={changeCurrentWallpaper}>
                            <Text style={styles.textButton}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </BackgroundLayout>
            </Modal>
        </ScrollView>
    )
}