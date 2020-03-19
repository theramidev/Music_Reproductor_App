import React, {Component} from 'react';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {Header} from '../../components/Header';
import {IProps} from './interfaces/Props';
import {connect} from 'react-redux';
import {getFavoriteSongs} from '../../redux/actions/favoritesActions';
import {updateFavorite} from '../../redux/actions/musicActions';
import {ListOfMusic} from '../../components/ListOfMusic';
import {Text, View, ActivityIndicator} from 'react-native';
import {theme} from '../../../assets/themes';
import FooterMusic from '../../components/FooterMusic';

class FavoritesScreen extends Component<IProps, {}> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.getFavoriteSongs();
  }

  render() {
    const {loadingFavorites} = this.props.favoritesReducer;
    if (loadingFavorites) {
      return (
        <BackgroundLayout>
          <Header title="Favoritos" navigation={this.props.navigation} />

          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#00F1DF" />
          </View>
        </BackgroundLayout>
      );
    }

    return (
      <BackgroundLayout>
        <Header title="Favoritos" navigation={this.props.navigation} />

        <View style={{marginTop: 10, height: '100%'}}>
          {this.props.favoritesReducer.listFavorites.length > 0 ? (
            <ListOfMusic
              navigate={this.props.navigation.navigate}
              songs={this.props.favoritesReducer.listFavorites}
              updateFavorite={this.props.updateFavorite}
              paddingBottom={165}
            />
          ) : (
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                textAlign: 'center',
                color: theme().text,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              No tienes canciones favoritas :(
            </Text>
          )}
        </View>

        <FooterMusic
          // @ts-ignore
          navigation={this.props.navigation}
        />
      </BackgroundLayout>
    );
  }
}

const mapStateToProps = ({favoritesReducer, musicReducer}: any) => {
  return {
    favoritesReducer,
    musicReducer,
  };
};

const mapDispatchToProps = {
  getFavoriteSongs,
  updateFavorite,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(FavoritesScreen);
