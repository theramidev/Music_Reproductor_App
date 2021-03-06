import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {connect} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import dynamicStyles from './styles';
import {MSong} from 'src/app/models/song.model';
import {
  getPlaylists,
  addAndDeleteSongsOfPLaylist,
} from '../../redux/actions/playlistActions';
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
import {useTranslation} from 'react-i18next';
import {CardItemMusic} from '../CardItemMusic';

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
    onRefresh,
    refreshing,
    onChangeList,
    withDir = false,
  } = props;

  const [orderList, setOrderList] = useState<
    'ASC' | 'DES' | 'TIME' | 'ARTIST' | 'DATE'
  >(defaultOrder || 'ASC');
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {showActionSheetWithOptions} = useActionSheet();
  const [addListIsVisible, setAddlistVisible] = useState(false);
  const [songSelected, setSongSelected] = useState<MSong | null>(null);
  const {t} = useTranslation('ListOfMusic');

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
          item.isFavorite ? t('deleteFavorite') : t('addFavorite'),
          t('addPlaylist'),
          t('editSong'),
          t('share'),
          t('cancel'),
        ],
        destructiveButtonIndex: 4,
        containerStyle: styles.actions,
        textStyle: styles.actionsText,
        titleTextStyle: styles.actionsTitle,
        cancelButtonIndex: -1,
      },
      async (index: number) => {
        switch (index) {
          case 0:
            if (updateFavorite) {
              await updateFavorite(item);
              ShowToast(
                !item.isFavorite ? t('yesAddFavorite') : t('yesDeleteFavorite'),
              );
            }
            break;

          case 1:
            if (playlists.length > 0) {
              setAddlistVisible(true);
            } else {
              ShowToast(t('noPlalist'));
            }
            break;
          case 2:
            navigate('UpdateSong', {item, songs});
            break;
          case 3:
            share(item);
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
        title: t('changeOrder'),
        options: [t('alphabetical'), t('duration'), t('author'), t('falling')],
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
        {t('noSongs')}
      </Text>
    );
  }

  const _renderItem = ({item}: {item: MSong}) => {
    return (
      <CardItemMusic
        item={item}
        songs={songs}
        navigate={navigate}
        openOptions={openOptions}
      />
    );
  };

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
            <Text style={styles.textRandom}>{t('random')}</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            {withDir && (
              <TouchableOpacity
                style={[styles.iconOptions, {marginRight: 10}]}
                onPress={() => (onChangeList ? onChangeList('DIRS') : null)}>
                <FontAwesome
                  name="folder-o"
                  size={20}
                  color={styles.iconOptions.color}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.iconOptions}
              onPress={openActionOrder}>
              <MaterialIcons
                name="sort"
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
          marginHorizontal: 5,
        }}
      />

      <FlatList
        refreshControl={
          onRefresh && (
            <RefreshControl
              refreshing={refreshing ? refreshing : false}
              onRefresh={onRefresh}
            />
          )
        }
        data={order(songs, orderList)}
        renderItem={_renderItem}
      />

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
