import React, {FC, useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {connect} from 'react-redux';
import {
  getPlaylists,
  addAndDeleteSongsOfPLaylist,
} from '../../redux/actions/playlistActions';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import dynamicStyles from './styles';
import {MSong} from 'src/app/models/song.model';
import Ripple from 'react-native-material-ripple';
import {IProps} from './Interfaces/Props';
import {ShowToast} from '../../../utils/toast';
import AsyncStorage from '@react-native-community/async-storage';
import {AddToPlaylist} from '../AddToPlaylist';
import {MPlaylist} from '../../models/playlist.model';
import share from '../../../utils/share';
import {
  getAlphabeticalOrder,
  getAlphabeticalArtistOrder,
  getDurationOrder,
  getDesOrder,
  getDateTimeOrder,
} from '../../../utils/orderListMusic';

const ListOfMusicComponent: FC<IProps> = props => {
  const {
    songs,
    navigate,
    updateFavorite,
    paddingBottom = 0,
    defaultOrder,
    deleteSong,
    getPlaylists,
    playlistReducer: {playlists = []},
    addAndDeleteSongsOfPLaylist,
  } = props;
  const [orderList, setOrderList] = useState<
    'ASC' | 'DES' | 'TIME' | 'ARTIST' | 'DATE'
  >(defaultOrder || 'ASC');
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {showActionSheetWithOptions} = useActionSheet();
  const [addListIsVisible, setAddlistVisible] = useState(false);
  const [songSelected, setSongSelected] = useState<MSong | null>(null);

  useEffect(() => {
    getPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs]);

  const getOrderList = async () => {
    if (orderList === 'DATE') {
      return;
    }
    const order: any = (await AsyncStorage.getItem('@orderList')) || 'ASC';
    setOrderList(order);
  };

  const addSongToPlaylist = (playlist: MPlaylist) => {
    if (songSelected) {
      addAndDeleteSongsOfPLaylist(playlist.playListId, [songSelected.id]);
    }
  };

  const order = (
    array: MSong[],
    mode: 'ASC' | 'DES' | 'TIME' | 'ARTIST' | 'DATE' = 'ASC',
  ) => {
    var newArray = array;
    switch (mode) {
      case 'ASC':
        newArray = getAlphabeticalOrder(array);
        break;
      case 'ARTIST':
        newArray = getAlphabeticalArtistOrder(array);
        break;
      case 'TIME':
        newArray = getDurationOrder(array);
        break;
      case 'DES':
        newArray = getDesOrder(array);
        break;
      case 'DATE':
        newArray = getDateTimeOrder(array);
        break;
      default:
        newArray = getAlphabeticalOrder(array);
        break;
    }

    return newArray;
  };

  // abre la ventana de opciones
  const openOptions = (item: MSong) => {
    setSongSelected(item);
    showActionSheetWithOptions(
      {
        title: item.title,
        options: [
          item.isFavorite ? 'Eliminar de favoritos' : 'Agregar a Favoritos',
          'Agregar a lista de reproduccion',
          'Editar informacion',
          'Compartir',
          'Eliminar',
          'Cancel',
        ],
        destructiveButtonIndex: 5,
        containerStyle: styles.actions,
        textStyle: styles.actionsText,
        titleTextStyle: styles.actionsTitle,
        cancelButtonIndex: -1,
      },
      async (index: number) => {
        switch (index) {
          case 0:
            await updateFavorite(item);
            ShowToast(
              !item.isFavorite
                ? 'Se agrego a favoritos'
                : 'Se elimino de favoritos',
            );
            break;

          case 1:
            if (playlists.length > 0) {
              setAddlistVisible(true);
            } else {
              ShowToast('No tienes listas de reproducción');
            }
            break;
          case 2:
            navigate('UpdateSong', {item, songs});
            break;
          case 4:
            await deleteSong(item);
            break;

          case 3:
            if (songSelected) {
              share(songSelected);
            }
            break;

          default:
            break;
        }
      },
    );
  };

  const openActionOrder = () => {
    showActionSheetWithOptions(
      {
        title: 'Modificar orden',
        options: ['Alfabetico', 'Duraciòn', 'Artista', 'Decendente'],
        containerStyle: styles.actions,
        textStyle: styles.actionsText,
        titleTextStyle: styles.actionsTitle,
        cancelButtonIndex: -1,
      },
      async (index: number) => {
        switch (index) {
          case 0:
            setOrderList('ASC');
            AsyncStorage.setItem('@orderList', 'ASC');
            break;
          case 1:
            setOrderList('TIME');
            AsyncStorage.setItem('@orderList', 'TIME');
            break;
          case 2:
            setOrderList('ARTIST');
            AsyncStorage.setItem('@orderList', 'ARTIST');
            break;
          case 3:
            setOrderList('DES');
            AsyncStorage.setItem('@orderList', 'DES');
            break;
          default:
            break;
        }
      },
    );
  };

  const cutText = (txt: string): string => {
    if (txt.length > 35) {
      return txt.substring(0, 35) + '...';
    }

    return txt;
  };

  const getRandomMusic = async (max: number, min: number) => {
    const position = Math.floor(Math.random() * (max - min) + min);

    await AsyncStorage.setItem('@Mode', 'RANDOM');

    navigate('Music', {item: songs[position], songs});
  };

  if (songs.length === 0) {
    return (
      <Text
        style={[
          styles.textRandom,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
          },
        ]}>
        No se encontraron canciones
      </Text>
    );
  }

  return (
    <View style={[styles.container, {paddingBottom}]}>
      {orderList !== 'DATE' && (
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => {
              getRandomMusic(songs.length - 1, 0);
            }}
            style={styles.random}>
            <FontAwesome name="random" size={15} color={styles.icon.color} />
            <Text style={styles.textRandom}>Reproduccion aleatoria</Text>
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              style={styles.iconOptions}
              onPress={openActionOrder}>
              <MaterialIcons
                name="swap-calls"
                size={20}
                color={styles.iconOptions.color}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: '#CECECE',
          height: 1,
          marginHorizontal: 10,
        }}
      />

      <ScrollView>
        {order(songs, orderList).map((item: MSong, key: number) => (
          <View key={key} style={styles.containerItem}>
            <Ripple
              rippleColor={styles.title.color}
              style={styles.containerItem}
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
        ))}
      </ScrollView>

      <AddToPlaylist
        isVisible={addListIsVisible}
        onClose={() => setAddlistVisible(false)}
        playlists={playlists}
        onCreate={addSongToPlaylist}
      />
    </View>
  );
};

const mapStateToProps = ({playlistReducer}: any) => {
  return {
    playlistReducer,
  };
};

const mapDispatchToProps = {
  getPlaylists,
  addAndDeleteSongsOfPLaylist,
};

export const ListOfMusic = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListOfMusicComponent);
