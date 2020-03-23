import React, {FC} from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {Text, View} from 'react-native';
import dynamicStyles from './styles';
import {InputArea} from '../../../../components/Input';

export const UpdateLyrics: FC<{lyrics: string; onChange: any}> = ({
  lyrics,
  onChange,
}: any) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Letra</Text>

      <InputArea
        title="Lyrics"
        placeholder="pegar texto"
        value={lyrics}
        onChange={onChange}
      />
    </View>
  );
};
