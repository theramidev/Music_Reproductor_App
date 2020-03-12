import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { IProps } from './PropsInterface';
import { staticStyle } from './style';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';

export const ContentModalCreate: FC<IProps> = () => {
    const [image, setImage] = useState('');

    return(
        <View style={staticStyle.container}>
            <View style={staticStyle.left}>
                <TouchableOpacity style={staticStyle.photoContainer}>
                    {
                        image ? 
                        <Image 
                            source={{uri: 'file://'+image}}
                        /> : 
                        <View>
                            <IconMc name="image-plus" color="white" size={40} />
                        </View>
                    }
                </TouchableOpacity>
                {
                    !image && 
                    <Text 
                        style={staticStyle.addPhotoText}
                    >
                        Agregar imagen (opcional)
                    </Text>
                }
            </View>

            <View style={staticStyle.right}>
                <View>
                    <Text style={staticStyle.inputLabel}>Nombre de la lista</Text>
                    <TextInput 
                        autoCapitalize="none"
                        autoCompleteType="off"
                        placeholder="Escriba el nombre de la lista"
                        style={staticStyle.input}
                    />
                </View>
            </View>

            <View style={staticStyle.buttonContainer}>
                <TouchableOpacity style={[staticStyle.button, staticStyle.buttonCancel]}>
                    <Text style={staticStyle.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[staticStyle.button, staticStyle.buttonAccept]}>
                    <Text style={staticStyle.buttonText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}