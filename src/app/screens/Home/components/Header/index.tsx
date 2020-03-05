import React, {FC} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './styles';

export const Header: FC<any> = ({navigate}: any) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const goSettings = () => {
    navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputIcon}>
        <Icon
          style={styles.searchIcon}
          name="search1"
          size={20}
          color={styles.searchIcon.color}
        />
        <TextInput
          style={styles.search}
          placeholder="Search"
          underlineColorAndroid="transparent"
        />
      </View>

      <TouchableOpacity onPress={goSettings} style={styles.settings}>
        <IconFeather
          style={styles.iconSettings}
          name="settings"
          size={20}
          color={styles.searchIcon.color}
        />
      </TouchableOpacity>
    </View>
  );
};
