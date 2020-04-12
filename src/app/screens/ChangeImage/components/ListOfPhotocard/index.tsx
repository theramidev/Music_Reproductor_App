import React, { FC, useState, useEffect } from 'react';
import { ScrollView, View, Modal, Image, TouchableOpacity, Text } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';
import { useTranslation } from 'react-i18next';

import { PhotoCard } from '../PhotoCard';
import { BackgroundLayout } from '../../../../components/BackgroundLayout';
import { takePictureFromGallery } from '../../../../../utils/takePicture';


export const ListOfPhotoCard: FC<IProps> = ({onWallpaperSelect, wallpapers = [], onWallpaperChange, onDeleteWallpaper}) => {
    const [photo, setPhoto] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { t } = useTranslation('ListOfPhotoCard');

    const openModal = async (photo: string) => {
        // console.log(photo);
        if (photo === 'add') {
            try {
                const {uri, name} = await takePictureFromGallery();
                onWallpaperSelect({uri, name});
            } catch (error) {
                if (error === 'canceled') {
                    console.log('Picker canceled!');
                    return;
                }
                console.error(error);
            }
            return;   
        } else if (photo === 'default') {
            setPhoto('');
            onWallpaperChange(null);
            return;
        }

        // console.log(photo);
        setPhoto(photo);
        setModalVisible(true);
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
                        <Text style={styles.textButton}>{t('cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={changeCurrentWallpaper}>
                        <Text style={styles.textButton}>{t('accept')}</Text>
                        </TouchableOpacity>
                    </View>
                </BackgroundLayout>
            </Modal>
        </ScrollView>
    )
}