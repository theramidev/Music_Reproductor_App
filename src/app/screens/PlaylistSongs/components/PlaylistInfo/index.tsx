import React, { FC, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { IProps } from './PropsInterface';
import { stataticStyle, dynamicStyles } from './style';
import AutoScrolling from 'react-native-auto-scrolling';
import { useDynamicStyleSheet, useDarkMode } from 'react-native-dark-mode';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconMa from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../../../assets/themes';
import { useTranslation } from 'react-i18next';

export const PlaylistInfo: FC<IProps> = ({playlist, quantitySongs = 0, onDelete, onEdit, onAdd}) => {
    const dynamicStyle = useDynamicStyleSheet(dynamicStyles);
    const isDarkMode = useDarkMode();
    const { t } = useTranslation('PlaylistInfo');

    const getDate = (date: Date): string => {
        const months: string[] = [t('january'), t('februeary'), t('march'), t('april'), t('may'), 
        t('june'), t('july'), t('august'), t('september'), t('october'), t('november'), t('december')];

        return  t('date', {day: date.getDate(), month: months[date.getMonth()], year: date.getFullYear()}); 
        // `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;

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
                        {`${ playlist ? getDate(playlist.created) : ''}`}
                    </Text>
                </AutoScrolling>
                <Text style={[stataticStyle.songs, dynamicStyle.colorText]}>
                    {`${quantitySongs} ${t('song')}${quantitySongs === 1 ? `${t('sOne')}` : `${t('sMore')}`}`}
                </Text>
            </View>

            <View style={stataticStyle.buttonsContainer}>
                <TouchableOpacity style={stataticStyle.button} onPress={onDelete}>
                    <IconFa name="trash" size={30} color={isDarkMode ? theme().light : theme().text} />
                    <Text style={[stataticStyle.buttonText, dynamicStyle.colorText]}>
                        {t('delete')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={stataticStyle.button} onPress={onEdit}>
                    <IconFa name="edit" size={30} color={isDarkMode ? theme().light : theme().text} />
                    <Text style={[stataticStyle.buttonText, dynamicStyle.colorText]}>
                        {t('edit')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={stataticStyle.button} onPress={onAdd}>
                    <IconMa name="library-add" size={30} color={isDarkMode ? theme().light : theme().text} />
                    <Text style={[stataticStyle.buttonText, dynamicStyle.colorText]}>
                        {t('add')} 
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}