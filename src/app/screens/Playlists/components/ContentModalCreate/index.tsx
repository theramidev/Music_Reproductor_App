import React, { FC, useState, useEffect, Dispatch } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { IProps } from './PropsInterface';
import { staticStyle } from './style';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import fs from 'react-native-fs';
import { ShowToast } from '../../../../../utils/toast';

export const ContentModalCreate: FC<IProps> = ({onClose, onCreate}) => {
    const [image, setImage] = useState('');
    const [pickerImage, setPickerImage] = useState<DocumentPickerResponse | null>(null);
    const [playlistName, setPLaylistName] = useState('');

    useEffect(() => {

        return () => {
            fs.exists(`${fs.DocumentDirectoryPath}/temp/playlist`).then(async (exists) => {
                if (exists) {
                    await fs.unlink(`${fs.DocumentDirectoryPath}/temp/playlist`);
                }
            })
        }
    }, []);

    const _onCreate = () => {

        if (playlistName.trim() === '') {
            ShowToast('Nombre requerido');
            return;
        }

        onCreate(pickerImage, playlistName);
        onClose();
    }

    const _onChange = (input: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPLaylistName(input.nativeEvent.text);
    }

    /**
     * @description Abre el DocimentPicker
     */
    const openDocumentPiecker = async () => {
        try {
            const picker = await DocumentPicker.pick({
                type: [DocumentPicker.types.images]
            });

            const existsDir = await fs.exists(`${fs.DocumentDirectoryPath}/temp/playlist`);
            const existsFile = await fs.exists(`${fs.DocumentDirectoryPath}/temp/playlist/${picker.name}`);

            if (!existsDir) {
                await fs.mkdir(`${fs.DocumentDirectoryPath}/temp/playlist`);
            }

            if (!existsFile) {
                await fs.moveFile(picker.uri, `${fs.DocumentDirectoryPath}/temp/playlist/${picker.name}`);
            }

            const file = await fs.stat(`${fs.DocumentDirectoryPath}/temp/playlist/${picker.name}`);

            setImage('file://'+file.path);
            setPickerImage(picker);
            
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log('DocumentPicker canceled!');
            }

            console.error('DocumentPicker Error: ', error);
        }
    }

    return(
        <View style={staticStyle.container}>
            <View style={staticStyle.left}>
                <TouchableOpacity style={staticStyle.photoContainer} onPress={openDocumentPiecker}>
                    {
                        image ? 
                        <Image 
                            source={{uri: 'file://'+image}}
                            style={staticStyle.image}
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
                        onChange={_onChange}
                    />
                </View>
            </View>

            <View style={staticStyle.buttonContainer}>
                <TouchableOpacity style={[staticStyle.button, staticStyle.buttonCancel]} onPress={onClose}>
                    <Text style={staticStyle.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[staticStyle.button, staticStyle.buttonAccept]} onPress={_onCreate}>
                    <Text style={staticStyle.buttonText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}