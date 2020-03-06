import React, {Fragment} from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export const ListOfMusic = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'den'},
          {key: 'din'},
          {key: 'cal'},
          {key: 'si'},
          {key: 'o'},
          {key: 'dss'},
          {key: 'ss'},
          {key: 'rggd'},
        ]}
        renderItem={({item}) => (
          <Fragment>
            <View style={styles.item}>
              <Image
                style={styles.image}
                key={item.key}
                source={{
                  uri:
                    'https://i.pinimg.com/originals/71/af/1d/71af1d7689eeb346b089aa8d56bcc6b6.jpg',
                }}
              />

              <View style={styles.info}>
                <Text style={styles.title}>Imagin Dragons - Radioactive</Text>
                <Text style={styles.group}>Imagin Dragons</Text>
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
