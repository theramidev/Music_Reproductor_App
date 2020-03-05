import React from 'react';
import {View} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './styles';

export const BackgroundLayout = ({children}: any) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return <View style={styles.container}>{children}</View>;
};
