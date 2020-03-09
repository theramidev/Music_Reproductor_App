import React, { FC, useState } from 'react';
import { ScrollView, View, Modal, Image, TouchableOpacity, Text } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';

import { PhotoCard } from '../PhotoCard';
import { BackgroundLayout } from '../../../../components/BackgroundLayout';


export const ListOfPhotoCard: FC<IProps> = () => {
    const [photo, setPhoto] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (photo: any) => {
        setPhoto(photo);
        setModalVisible(true);
    }

    const closeModal = () => setModalVisible(false);

    return(
        <ScrollView>
            <View style={styles.photosContainer}>
                <PhotoCard mode="add" onPress={openModal} />
                <PhotoCard mode="photo" onPress={openModal} />
                <PhotoCard mode="photo" onPress={openModal} />
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
                            source={require('../../../../../assets/images/wallpapers/image_1.jpg')}
                            style={styles.modalImage}
                        />
                    }

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={closeModal}>
                            <Text style={styles.textButton}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </BackgroundLayout>
            </Modal>
        </ScrollView>
    )
}