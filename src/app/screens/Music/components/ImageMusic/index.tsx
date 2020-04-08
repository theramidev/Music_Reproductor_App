import React, {FC, useState, useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import fs from 'react-native-fs';
import AutoScrolling from 'react-native-auto-scrolling';

import styles from './styles';
import {MSong} from 'src/app/models/song.model';

interface IProps {
  item: MSong;
}

export const ImageMusic: FC<IProps> = ({item}) => {
  useEffect(() => {
    console.log(item.cover);
  }, []);

  const cutText = (text: string, limit: number, styleText?: any) => {
    if (text.length > limit) {
      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <AutoScrolling style={{height: 30, width: '80%'}}>
          <Text style={styleText}>{text}</Text>
        </AutoScrolling>
      );
    } else {
      return <Text style={styleText}>{text}</Text>;
    }
  };

  return (
    <View style={styles.contentImage}>
      {item.cover ? (
        <Image
          style={styles.image}
          source={{
            uri: item.cover,
          }}
        />
      ) : (
        <Image
          style={[styles.image, {backgroundColor: '#838383'}]}
          source={require('../../../../../assets/images/music_notification.png')}
        />
      )}
      {cutText(item.author || '<unknown>', 31, styles.author)}
      {cutText(item.album || '<unknown>', 55, styles.album)}
    </View>
  );
};
