import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import { IProps } from './interfaces/Props';
import Icon from 'react-native-vector-icons/MaterialIcons';

import dynamicStyles from './style';
import {HeaderBackButton} from 'react-navigation-stack';

export const Header: FC<IProps> = ({navigation, iconName}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Reciente</Text>

        <TouchableOpacity style={styles.back}>
        <HeaderBackButton tintColor={styles.back.color} onPress={back} />
        </TouchableOpacity>

        {
            iconName &&
            <TouchableOpacity style={styles.icon}>
                <Icon name={iconName} size={30} color={styles.icon.color} />
            </TouchableOpacity>
        }
      
    </View>
  );
};
