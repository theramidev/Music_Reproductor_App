import React, {FC} from 'react';
import {View, TextInput} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

export const Header: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputIcon}>
        <Icon style={styles.searchIcon} name="search1" size={20} color="#000" />
        <TextInput
          style={styles.search}
          placeholder="Search"
          underlineColorAndroid="transparent"
        />
      </View>

      <IconFeather
        style={styles.settings}
        name="settings"
        size={20}
        color="#000"
      />
    </View>
  );
};
