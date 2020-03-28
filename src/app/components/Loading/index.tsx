import React, {FC} from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './styles';
import {View, ActivityIndicator, Text} from 'react-native';
import {IProps} from './interfaces/Props';

export const Loading: FC<IProps> = ({message}: IProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#00F1DF" />
      {message && <Text style={styles.text}>{message}</Text>}
    </View>
  );
};
