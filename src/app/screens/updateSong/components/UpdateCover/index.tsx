import React, {FC} from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {Text, View, Image} from 'react-native';
import dynamicStyles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const UpdateCover: FC<any> = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foto de portada</Text>

      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <TouchableOpacity>
          <Image
            source={{
              uri:
                'https://i.pinimg.com/originals/71/af/1d/71af1d7689eeb346b089aa8d56bcc6b6.jpg',
            }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
