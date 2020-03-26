import React, {FC} from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {Text, View} from 'react-native';
import dynamicStyles from './styles';
import {InputArea} from '../../../../components/Input';
import { useTranslation } from 'react-i18next';

export const UpdateLyrics: FC<{lyrics: string; onChange: any}> = ({
  lyrics,
  onChange,
}: any) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { t } = useTranslation('UpdateSong');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Letra</Text>

      <InputArea
        title={t('lyrics')}
        placeholder={t('pasteText')}
        value={lyrics}
        onChange={onChange}
      />
    </View>
  );
};
