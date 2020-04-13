import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import fs from 'react-native-fs';
import { withTranslation } from 'react-i18next';

import {updateSong} from '../../redux/actions/allSongsActions';
import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {Header} from '../../components/Header';
import {Input} from '../../components/Input';
import {UpdateImage} from './components/UpdateImage';
import {UpdateLyrics} from './components/UpdateLyrics';
import {MSong} from '../../models/song.model';
import {ShowToast} from '../../../utils/toast';
import { showAd } from '../../../utils/interstitialAd';

class UpdateSongScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    // @ts-ignore
    const item: MSong = props.navigation.state.params.item;

    this.state = {
      id: item.id,
      title: item.title,
      author: item.author || '',
      album: item.album || '',
      cover: item.cover || '',
      lyrics: item.lyrics || '',
      updateCover: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    showAd();
  }

  handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string,
  ) => {
    this.setState({[name]: event.nativeEvent.text});
  };

  handleChangeImage = (image: string) => {
    this.setState({cover: image, updateCover: true});
  };

  submit = async () => {
    if (this.state.title?.length === 0) {
      ShowToast('El titulo no puede estar vacio');
    }

    this.state.author?.length === 0 && this.setState({author: '<unknown>'});
    this.state.album?.length === 0 && this.setState({album: 'musica'});

    if (this.state.updateCover) {
      const time = new Date().getTime();
      const pathCover = `${fs.DocumentDirectoryPath}/coverSong/${this.state.id}_${time}.png`;

      const existDir: boolean = await fs.exists(
        `${fs.DocumentDirectoryPath}/coverSong`,
      );
      const existCover: boolean = await fs.exists(pathCover);
      if (!existDir) {
        await fs.mkdir(`${fs.DocumentDirectoryPath}/coverSong`);
      }
      if (existCover && this.state.cover) {
        await fs.unlink(pathCover);
      }

      if (this.state.cover) {
        await fs.copyFile(this.state.cover, pathCover);
        this.setState({cover: 'file://' + pathCover});
      }
    }

    await this.props.updateSong(this.state);

    ShowToast(this.props.t('updated'));

    this.props.navigation.goBack();
  };

  render() {
    const {loadingUpdateSong} = this.props.musicReducer;

    return (
      <BackgroundLayout>
        <Header
          title={this.props.t('headerTitle')}
          navigation={this.props.navigation}
          iconName="pencil"
          onPress={this.submit}
          loading={loadingUpdateSong}
        />

        <ScrollView>
          <Input
            title={this.props.t('titleSong')}
            value={this.state.title}
            onChange={e => {
              this.handleChange(e, 'title');
            }}
          />
          <Input
            title={this.props.t('author')}
            value={this.state.author}
            onChange={e => {
              this.handleChange(e, 'author');
            }}
          />
          <Input
            title={this.props.t('album')}
            value={this.state.album || ''}
            onChange={e => {
              this.handleChange(e, 'album');
            }}
          />

          <UpdateImage
            cover={this.state.cover || ''}
            onChange={this.handleChangeImage}
          />

          <UpdateLyrics
            lyrics={this.state.lyrics || ''}
            onChange={(e: any) => {
              this.handleChange(e, 'lyrics');
            }}
            songName={this.state.title}
          />
        </ScrollView>
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
  updateSong,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('UpdateSong')(UpdateSongScreen));
