import React, {Component} from 'react';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Image,
  Text,
} from 'react-native';
import {IProps} from './interfaces/Props';
import IconIo from 'react-native-vector-icons/Ionicons';
import {staticStyles} from './style';
import {searchSong, clearSearch} from '../../redux/actions/musicActions';
import {updateFavorite, deleteSong} from '../../redux/actions/allSongsActions';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {BackgroundLayout} from '../../components/BackgroundLayout';
import {Header} from '../../components/Header';
import {ListOfMusic} from '../../components/ListOfMusic';
import {showAd} from '../../../utils/interstitialAd';

class SearchSongScreen extends Component<IProps, {search: string}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      search: '',
    };
  }

  componentWillUnmount() {
    showAd();
  }

  _onChange = (input: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const textSearch = input.nativeEvent.text;

    if (textSearch.length) {
      this.props.searchSong(textSearch);
    } else {
      this.props.clearSearch();
    }
    this.setState({search: textSearch});
  };

  render() {
    return (
      <BackgroundLayout>
        <Header navigation={this.props.navigation} title="">
          <View style={staticStyles.inputSearch}>
            <IconIo name="ios-search" size={30} color="white" />
            <TextInput
              placeholder={this.props.t('inputPlaceholder')}
              autoCapitalize="none"
              autoCompleteType="off"
              placeholderTextColor="white"
              style={{marginLeft: 10, width: '84%', color: 'white'}}
              onChange={this._onChange}
              autoFocus={true}
            />
          </View>
        </Header>

        {this.props.musicReducer.searchSongs.length === 0 &&
        this.state.search.length > 2 ? (
          <View style={staticStyles.notFoundContainer}>
            <Image
              source={require('../../../assets/images/crying.png')}
              style={staticStyles.imageNotFound}
            />
            <Text style={staticStyles.textNotFound}>
              {this.props.t('notResults')}
            </Text>
          </View>
        ) : (
          <ListOfMusic
            navigate={this.props.navigation.navigate}
            songs={this.props.musicReducer.searchSongs}
            updateFavorite={this.props.updateFavorite}
            deleteSong={this.props.deleteSong}
            paddingBottom={105}
          />
        )}
      </BackgroundLayout>
    );
  }
}

const mapStateToProps = ({musicReducer}: any) => {
  return {
    musicReducer,
  };
};

const mapDispatchToProps = {
  searchSong,
  clearSearch,
  updateFavorite,
  deleteSong,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // @ts-ignore
)(withTranslation('SearchSong')(SearchSongScreen));
