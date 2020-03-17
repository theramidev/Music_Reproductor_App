import React, {useEffect, useState, FC} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './style';
import {connect} from 'react-redux';
import {
  changeToLineMode,
  changeToRandomMode,
  updateFavorite,
} from '../../../../redux/actions/musicActions';
import {ShowToast} from '../../../../../utils/toast';

const Actions: FC<any> = (props: any) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const [mode, setMode] = useState('RANDOM');

  useEffect(() => {
    getMode();
  }, []);

  useEffect(() => {
    if (props.musicReducer.errorFavorite) {
      ShowToast('Ocurrio un error al momento de agregar a favoritos');
    }
  }, [props.musicReducer]);

  const getMode = async () => {
    const data = await AsyncStorage.getItem('@Mode');
    setMode(data || 'RANDOM');
  };

  const changeMode = async () => {
    if (mode === 'RANDOM') {
      await AsyncStorage.setItem('@Mode', 'LINE');

      props.changeToLineMode();

      setMode('LINE');
    } else {
      await AsyncStorage.setItem('@Mode', 'RANDOM');

      props.changeToRandomMode();

      setMode('RANDOM');
    }
  };

  const updateFavoriteSong = async () => {
    await props.updateFavorite(props.musicReducer.current);

    ShowToast('Se agrego a favoritos');
  };

  const getStateFavorite = () => {
    if (props.musicReducer.current.isFavorite) {
      return (
        <AntDesign name="star" size={20} color={styles.iconActive.color} />
      );
    } else {
      return <AntDesign name="staro" size={20} color={styles.icon.color} />;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeMode}>
        {mode === 'RANDOM' && (
          <FontAwesome name="random" size={20} color={styles.icon.color} />
        )}
        {mode === 'LINE' && (
          <Entypo name="retweet" size={20} color={styles.icon.color} />
        )}
      </TouchableOpacity>
      {!props.musicReducer.loadingFavorite && (
        <TouchableOpacity onPress={updateFavoriteSong}>
          {getStateFavorite()}
        </TouchableOpacity>
      )}
      {props.musicReducer.loadingFavorite && (
        <View>
          <ActivityIndicator size="small" color="#00F1DF" />
        </View>
      )}
      <TouchableOpacity>
        <AntDesign name="sharealt" size={20} color={styles.icon.color} />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({musicReducer}: any) => {
  return {
    musicReducer,
  };
};

const mapDispatchToProps = {
  changeToLineMode,
  changeToRandomMode,
  updateFavorite,
};

// eslint-disable-next-line prettier/prettier
export default connect<any, any>(mapStateToProps, mapDispatchToProps)(Actions);
