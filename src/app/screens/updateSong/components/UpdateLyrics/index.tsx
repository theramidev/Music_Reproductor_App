import React, {FC, useState} from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {Text, View, TouchableOpacity} from 'react-native';
import dynamicStyles from './styles';
import {InputArea} from '../../../../components/Input';
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UrlWebView } from '../../../../components/UrlWebView';

export const UpdateLyrics: FC<{lyrics: string; onChange: any, songName?: string}> = ({
  lyrics,
  onChange,
  songName = ''
}: any) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { t } = useTranslation('UpdateSong');
  const [webViewIsVisible, setWebViewIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', marginHorizontal: 20}}>
        <Text style={styles.title}>Letra</Text>
        <TouchableOpacity
          onPress={() => setWebViewIsVisible(true)}
        >
          <FontAwesome name="search" color="white" size={25} />
        </TouchableOpacity>
      </View>

      <InputArea
        title={t('lyrics')}
        placeholder={t('pasteText')}
        value={lyrics}
        onChange={onChange}
      />

      <UrlWebView 
        isVisible={webViewIsVisible}
        search={`${t('search')} ${songName}`}
        onclose={() => setWebViewIsVisible(false)}
      />
    </View>
  );
};
