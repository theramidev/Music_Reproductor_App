import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {IProps} from './interfaces/Props';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AutoScrolling from 'react-native-auto-scrolling';

import dynamicStyles from './style';
import {HeaderBackButton} from 'react-navigation-stack';

export const Header: FC<IProps> = ({navigation, iconName, title, onPress}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentText}>
        {title.length <= 24 && <Text style={styles.text}>{title}</Text>}
        {title.length > 24 && (
          <AutoScrolling style={styles.scroll}>
            <Text style={styles.text}>{title}</Text>
          </AutoScrolling>
        )}
      </View>

      <TouchableOpacity style={styles.back}>
        <HeaderBackButton tintColor={styles.back.color} onPress={back} />
      </TouchableOpacity>

      {iconName && (
        <TouchableOpacity style={styles.icon} onPress={onPress}>
          <Icon name={iconName} size={30} color={styles.icon.color} />
        </TouchableOpacity>
      )}
    </View>
  );
};
