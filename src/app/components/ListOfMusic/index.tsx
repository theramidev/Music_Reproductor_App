import React, {Fragment, FC} from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { IProps } from './Interfaces/Props';
import { MSong } from '../../models/song.model';

export const ListOfMusic: FC<IProps> = ({songs}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const cutText = (txt: string): string => {
    if (txt.length > 35) {
      return txt.substring(1, 35) + '...';
    }

    return txt;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={({item}: {item: MSong}) => (
          <Fragment>
            <View style={styles.item}>
              <Image
                style={styles.image}
                key={item.id}
                source={{
                  uri:
                    'https://i.pinimg.com/originals/71/af/1d/71af1d7689eeb346b089aa8d56bcc6b6.jpg',
                }}
              />

              <View style={styles.info}>
                <Text style={styles.title}>{cutText(item.title)}</Text>
                <Text style={styles.group}>{item.author}</Text>
              </View>

              <TouchableOpacity style={styles.icon}>
                <SimpleLineIcons
                  name="options-vertical"
                  color={styles.title.color}
                  size={15}
                />
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
      />
    </View>
  );
};
