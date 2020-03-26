import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {Header} from '../../components/Header';
import {ListOfMusic} from '../../components/ListOfMusic';
import {getRecents} from '../../redux/actions/recentsActions';
import {updateFavorite, deleteSong} from '../../redux/actions/allSongsActions';
import {theme} from '../../../assets/themes';
import FooterMusic from '../../components/FooterMusic';
import {withTranslation} from 'react-i18next';
import {showAd} from '../../../utils/interstitialAd';

class ReproductionsScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getRecents();
  }

  componentWillUnmount() {
    showAd();
  }

  render() {
    //console.log(this.props.recentsReducer.listRecents);
    return (
      <BackgroundLayout>
        <Header
          navigation={this.props.navigation}
          title={this.props.t('headerTitle')}
        />

        {this.props.recentsReducer.listRecents.length > 0 ? (
          <View style={{marginTop: 10, height: '100%'}}>
            <ListOfMusic
              songs={this.props.recentsReducer.listRecents}
              navigate={this.props.navigation.navigate}
              updateFavorite={this.props.updateFavorite}
              deleteSong={this.props.deleteSong}
              defaultOrder="DATE"
              paddingBottom={
                Object.keys(this.props.musicReducer.current).length === 0
                  ? 100
                  : 120
              }
            />
          </View>
        ) : (
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginTop: 10,
              textAlign: 'center',
              color: theme().text,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {this.props.t('notSongs')}
          </Text>
        )}

        <FooterMusic
          // @ts-ignore
          navigation={this.props.navigation}
        />
      </BackgroundLayout>
    );
  }
}

const mapStateToProps = ({recentsReducer, musicReducer}: any) => {
  return {
    recentsReducer,
    musicReducer,
  };
};

const mapDispatchToProps = {
  getRecents,
  updateFavorite,
  deleteSong,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('Reproductions')(ReproductionsScreen));
