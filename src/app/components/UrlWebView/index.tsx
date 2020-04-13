import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import 'react-native-get-random-values';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import { IProps } from './PropsInterface';
import { theme } from '../../../assets/themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

export const UrlWebView: FC<IProps> = ({
    search,
    isVisible,
    onclose
}) => {
    const { t } = useTranslation('UrlWebView');

    const removeSpaces = (words: string = ''): string => {
        return words.replace(' ', '+');
    }

    return(
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onclose}
            onBackdropPress={onclose}
        >
            <TouchableOpacity
                onPress={onclose}
                style={{
                    width: '100%', 
                    height: 40, 
                    backgroundColor: theme().text, 
                    paddingHorizontal: 15,
                    borderTopEndRadius: 10,
                    borderTopLeftRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <FontAwesome 
                    name="close"
                    color="white"
                    size={25}
                />
                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 10}}>
                    {t('close')}
                </Text>
            </TouchableOpacity>
            <WebView 
                source={{uri: `https://www.google.com/search?q=${removeSpaces(search)}`}}
            />
        </Modal>
    )
}