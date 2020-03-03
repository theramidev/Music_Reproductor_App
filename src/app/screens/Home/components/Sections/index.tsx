import React, {FC} from 'react';
import {View, Text} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import styles from './styles';

export const Sections: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <IconAntDesign name="clockcircleo" size={20} color="#000" />
        <Text>Recientes</Text>
      </View>
      <View style={styles.icon}>
        <IconAntDesign name="star" size={20} color="#000" />
        <Text>Favoritos</Text>
      </View>
      <View style={styles.icon}>
        <IconFeather name="list" size={20} color="#000" />
        <Text>Listas</Text>
      </View>
    </View>
  );
};
