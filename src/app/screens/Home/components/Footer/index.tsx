import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import dynamicStyles from './styles';
import {useDynamicStyleSheet} from 'react-native-dark-mode';

export const Footer: FC = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      <View style={styles.music}>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Green_Day_-_American_Idiot_album_cover.png/220px-Green_Day_-_American_Idiot_album_cover.png',
          }}
        />

        <View style={styles.info}>
          <Text style={styles.title}>Green Day - american idi...</Text>
          <Text style={styles.group}>Green Day</Text>
        </View>
      </View>

      <View style={styles.options}>
        <Foundation
          style={styles.icon}
          name="play"
          size={27}
          color={styles.icon.color}
        />
        <Entypo
          style={styles.icon}
          name="controller-next"
          size={27}
          color={styles.icon.color}
        />
      </View>
    </View>
  );
};
