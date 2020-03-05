import React, {FC} from 'react';
import {View, Text} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import dynamicStyles from './styles';
import {useDynamicStyleSheet} from 'react-native-dark-mode';

export const Sections: FC = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <IconAntDesign
            name="clockcircleo"
            size={20}
            color={styles.icon.color}
          />
          <Text style={styles.iconText}>Recientes</Text>
        </View>
        <View style={styles.icon}>
          <IconAntDesign name="star" size={20} color={styles.icon.color} />
          <Text style={styles.iconText}>Favoritos</Text>
        </View>
        <View style={styles.icon}>
          <IconFeather name="list" size={20} color={styles.icon.color} />
          <Text style={styles.iconText}>Listas</Text>
        </View>
      </View>
    </View>
  );
};
