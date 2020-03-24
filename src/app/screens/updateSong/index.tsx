import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

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

class UpdateSongScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    // @ts-ignore
    const item: MSong = props.navigation.state.params.item;
    console.log(item);
    this.state = {
      id: item.id,
      title: item.title,
      author: item.author || '',
      album: item.album || '',
      cover: item.cover || '',
      lyrics: item.lyrics || '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string,
  ) => {
    this.setState({[name]: event.nativeEvent.text});
  };

  handleChangeImage = (image: string) => {
    this.setState({cover: image});
  };

  submit = async () => {
    await this.props.updateSong(this.state);

    ShowToast('Se modificaron los datos de la cancion');
  };

  render() {
    return (
      <BackgroundLayout>
        <Header
          title="Editar cancion"
          navigation={this.props.navigation}
          iconName="pencil"
          onPress={this.submit}
        />

        <ScrollView>
          <Input
            title="Titulo"
            value={this.state.title}
            onChange={e => {
              this.handleChange(e, 'title');
            }}
          />
          <Input
            title="Artista"
            value={this.state.author}
            onChange={e => {
              this.handleChange(e, 'author');
            }}
          />
          <Input
            title="Album"
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
)(UpdateSongScreen);
