import React, {FC, useState, useEffect} from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Ripple from 'react-native-material-ripple';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import dynamicStyles from './styles';
import {IProps} from './Interfaces/Props';

export const CardItemMusic: FC<IProps> = ({
  item,
  songs,
  openOptions,
  navigate,
}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const cutText = (txt: string): string => {
    if (txt.length > 35) {
      return txt.substring(0, 35) + '...';
    }

    return txt;
  };

  return (
    <View style={styles.containerItem}>
      <Ripple
        rippleColor={styles.title.color}
        style={styles.itemContent}
        onPress={() => navigate('Music', {item, songs})}>
        <View style={styles.item}>
          {item.cover ? (
            <Image
              style={styles.image}
              source={{
                uri: 'file://' + item.cover,
              }}
            />
          ) : (
            <Image
              style={styles.image}
              source={require('../../../assets/images/music_notification.png')}
            />
          )}

          <View style={styles.info}>
            <Text style={styles.title}>{cutText(item.title)}</Text>
            <Text style={styles.group}>{item.author}</Text>
          </View>
        </View>
      </Ripple>
      <TouchableOpacity
        onPress={() => {
          openOptions(item);
        }}
        hitSlop={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        style={styles.icon}>
        <SimpleLineIcons
          name="options-vertical"
          color={styles.title.color}
          size={15}
        />
      </TouchableOpacity>
    </View>
  );
};
