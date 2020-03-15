import React, { FC, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { IProps } from './PropsInterface';
import { stataticStyle, dynamicStyles } from './style';
import AutoScrolling from 'react-native-auto-scrolling';
import { useDynamicStyleSheet, useDarkMode } from 'react-native-dark-mode';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconMa from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../../../assets/themes';

export const PlaylistInfo: FC<IProps> = ({playlist, quantitySongs = 0, onDelete, onEdit, onAdd}) => {
    const dynamicStyle = useDynamicStyleSheet(dynamicStyles);
    const isDarkMode = useDarkMode();

    const getDate = (date: Date): string => {
        const months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 
        'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;

    }

    return(
        <View style={stataticStyle.container}>
            <View style={stataticStyle.left}>
                <Image style={stataticStyle.image}
                    source={
                        playlist && playlist.image ? {uri: playlist.image} :
                        require('../../../../../assets/images/music_notification.png')
                    }
                />
            </View>

            <View style={stataticStyle.right}>
                {
                    playlist && playlist.name.length > 15 ?
                    <AutoScrolling style={{height: 50}}>
                        <Text style={[stataticStyle.name, dynamicStyle.colorText]}>
                            {playlist.name}
                        </Text>
                    </AutoScrolling> : 
                    <Text style={[stataticStyle.name, dynamicStyle.colorText, {marginBottom: 20}]}>
                        {playlist ? playlist.name : ''}
                    </Text>
                }
                <AutoScrolling style={{height: 20}}>
                    <Text style={[stataticStyle.created, dynamicStyle.colorText]}>
                        {`Creado el ${ playlist ? getDate(playlist.created) : ''}`}
                    </Text>
                </AutoScrolling>
                <Text style={[stataticStyle.songs, dynamicStyle.colorText]}>
                    {`${quantitySongs} canci${quantitySongs === 1 ? 'ón' : 'ones'}`}
                </Text>
            </View>

            <View style={stataticStyle.buttonsContainer}>
                <TouchableOpacity style={stataticStyle.button} onPress={onDelete}>
                    <IconFa name="trash" size={30} color={isDarkMode ? theme().light : theme().text} />
                    <Text style={[stataticStyle.buttonText, dynamicStyle.colorText]}>
                        Eliminar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={stataticStyle.button} onPress={onEdit}>
                    <IconFa name="edit" size={30} color={isDarkMode ? theme().light : theme().text} />
                    <Text style={[stataticStyle.buttonText, dynamicStyle.colorText]}>
                        Editar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={stataticStyle.button} onPress={onAdd}>
                    <IconMa name="library-add" size={30} color={isDarkMode ? theme().light : theme().text} />
                    <Text style={[stataticStyle.buttonText, dynamicStyle.colorText]}>
                        Agregar 
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}