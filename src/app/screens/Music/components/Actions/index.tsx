import React, {useEffect, useState, FC} from 'react';
import {View, TouchableOpacity} from 'react-native';
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
} from '../../../../redux/actions/musicActions';

const Actions: FC<any> = (props: any) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const [mode, setMode] = useState('RANDOM');

  useEffect(() => {
    getMode();
  }, []);

  const getMode = async () => {
    const data = await AsyncStorage.getItem('@Mode');
    setMode(data || 'RANDOM');
  };

  const changeMode = async () => {
    const {listSongs, current} = props.musicReducer;
    console.log(mode);
    if (mode === 'RANDOM') {
      await AsyncStorage.setItem('@Mode', 'LINE');

      props.changeToLineMode(listSongs, current);

      setMode('LINE');
    } else {
      await AsyncStorage.setItem('@Mode', 'RANDOM');

      props.changeToRandomMode(listSongs, current);

      setMode('RANDOM');
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
      <TouchableOpacity>
        <AntDesign name="star" size={20} color={styles.icon.color} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="list" size={20} color={styles.icon.color} />
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
};

// eslint-disable-next-line prettier/prettier
export default connect<any, any>(mapStateToProps, mapDispatchToProps)(Actions);
