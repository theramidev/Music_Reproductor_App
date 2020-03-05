import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';

import dynamicStyles from './styles';
import {HeaderBackButton} from 'react-navigation-stack';

export const Header: FC<any> = ({goBack}: any) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const back = () => {
    goBack(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>

      <TouchableOpacity style={styles.back}>
        <HeaderBackButton tintColor={styles.back.color} onPress={back} />
      </TouchableOpacity>
    </View>
  );
};
