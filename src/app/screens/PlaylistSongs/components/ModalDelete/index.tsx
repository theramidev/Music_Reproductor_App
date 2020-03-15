import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { IProps } from './PropsInterface';
import { staticStyle, dynamicStyleSheet } from './style';
import { useDynamicStyleSheet } from 'react-native-dark-mode';

export const ModalDelete: FC<IProps> = ({isVisible, onClose, onAccept}) => {
    const dynamicStyle = useDynamicStyleSheet(dynamicStyleSheet);

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
                    Eliminar lista de reproducción
                </Text>
                <Text style={staticStyle.message}>
                    ¿Está seguro que quiere eliminar la lista?
                </Text>

                <View style={staticStyle.buttonsContainer}>
                    <TouchableOpacity style={staticStyle.button} onPress={onClose}>
                        <Text style={[staticStyle.buttonText, dynamicStyle.textColor]}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={staticStyle.button} onPress={onAccept}>
                        <Text style={[staticStyle.buttonText, dynamicStyle.textColor]}>
                            Aceptar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}