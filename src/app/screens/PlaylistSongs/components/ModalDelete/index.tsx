import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { IProps } from './PropsInterface';
import { staticStyle, dynamicStyleSheet } from './style';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { useTranslation } from 'react-i18next';

export const ModalDelete: FC<IProps> = ({isVisible, onClose, onAccept}) => {
    const dynamicStyle = useDynamicStyleSheet(dynamicStyleSheet);
    const { t } = useTranslation('ModalDelete');

    return(
        <Modal
            isVisible={isVisible}
            hasBackdrop={true}
            backdropOpacity={0.0}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            animationIn="zoomIn"
            animationOut="zoomOut"
        >
            <View style={[staticStyle.container, dynamicStyle.container]}>
                <Text style={[staticStyle.title, dynamicStyle.textColor]}>
                    {t('title')}
                </Text>
                <Text style={staticStyle.message}>
                    {t('message')}
                </Text>

                <View style={staticStyle.buttonsContainer}>
                    <TouchableOpacity style={staticStyle.button} onPress={onClose}>
                        <Text style={[staticStyle.buttonText, dynamicStyle.textColor]}>
                            {t('cancel')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={staticStyle.button} onPress={onAccept}>
                        <Text style={[staticStyle.buttonText, dynamicStyle.textColor]}>
                            {t('accept')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}