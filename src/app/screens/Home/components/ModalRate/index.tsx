import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IProps } from './PropsInterface';
import { staticStyles } from './style';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RateApp } from '../../../../../utils/rate';
import { useTranslation } from 'react-i18next';

export const ModalRate: FC<IProps> = ({
    isVisible = false,
    onClose
}) => {

    const { t } = useTranslation('ModalRate');

    const openRate = () => {
        onClose();
        RateApp();
    }

    return(
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            animationIn="tada"
          >
            <View style={staticStyles.container}>
              <Text style={staticStyles.title}>
                {t('title')}
              </Text>
              <Text style={staticStyles.message}>
                {t('message')}
              </Text>
              <View style={staticStyles.starsContainer}>
                <AntDesign name="star" color="#ffdf00" size={30} />
                <AntDesign name="star" color="#ffdf00" size={30} />
                <AntDesign name="star" color="#ffdf00" size={30} />
                <AntDesign name="star" color="#ffdf00" size={30} />
                <AntDesign name="star" color="#ffdf00" size={30} />
              </View>
              <View style={staticStyles.buttonsContainer}>
                <TouchableOpacity style={staticStyles.button} onPress={onClose}>
                  <Text style={staticStyles.textButton}>
                    {t('cancel')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={staticStyles.button} onPress={openRate}>
                  <Text style={staticStyles.textButton}>
                    {t('assess')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
    )
}