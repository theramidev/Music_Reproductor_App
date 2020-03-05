import React from 'react';
import {View, Text} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './styles';

export const ListOfMusic = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      <Text>List</Text>
    </View>
  );
};
