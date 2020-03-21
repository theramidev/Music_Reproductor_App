import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMac from 'react-native-vector-icons/MaterialCommunityIcons';
import dynamicStyles from './styles';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import { useTranslation } from 'react-i18next';

export const Sections: FC<any> = ({navigation}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { t } = useTranslation('Sections');

  const goToReproductions = () => navigation.navigate('Reproductions');
  const goToFavorites = () => navigation.navigate('Favorites');
  const goToPlaylists = () => navigation.navigate('Playlists');

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goToReproductions}>
          <View style={styles.icon}>
            <IconAntDesign
              name="clockcircleo"
              size={20}
              color={styles.icon.color}
            />
            <Text style={styles.iconText}>{t('recent')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToFavorites}>
          <View style={styles.icon}>
            <IconAntDesign name="star" size={20} color={styles.icon.color} />
            <Text style={styles.iconText}>{t('favorites')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToPlaylists}>
          <View style={styles.icon}>
            <IconMac
              name="playlist-music-outline"
              size={20}
              color={styles.icon.color}
            />
            <Text style={styles.iconText}>{t('lists')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
