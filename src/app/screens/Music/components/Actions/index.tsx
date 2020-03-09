import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './style';

export const Actions = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesome name="random" size={20} color={styles.icon.color} />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="star" size={20} color={styles.icon.color} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="list" size={20} color={styles.icon.color} />
      </TouchableOpacity>
    </View>
  );
};
