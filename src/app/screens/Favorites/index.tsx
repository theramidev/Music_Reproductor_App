import React, {Component} from 'react';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {Header} from '../../components/Header';
import {IProps} from './interfaces/Props';
import {connect} from 'react-redux';
import {getFavoriteSongs} from '../../redux/actions/fileActions';
import {ListOfMusic} from '../../components/ListOfMusic';
import {Text, View} from 'react-native';
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
    return (
      <BackgroundLayout>
        <Header title="Favoritos" navigation={this.props.navigation} />

        <View style={{marginTop: 10, height: '100%'}}>
          {this.props.fileReducer.data.favorites &&
          this.props.fileReducer.data.favorites.length ? (
            <ListOfMusic
              navigate={this.props.navigation.navigate}
              songs={this.props.fileReducer.data.favorites}
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

        <FooterMusic navigation={this.props.navigation} />
      </BackgroundLayout>
    );
  }
}

const mapStateToProps = ({fileReducer}: any) => {
  return {
    fileReducer,
  };
};

const mapDispatchToProps = {
  getFavoriteSongs,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(FavoritesScreen);
