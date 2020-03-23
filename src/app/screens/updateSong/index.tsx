import React, {Component} from 'react';
import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {Header} from '../../components/Header';
import {Input} from '../../components/Input';
import {UpdateImage} from './components/UpdateImage';
import {UpdateLyrics} from './components/UpdateLyrics';
import {
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {MSong} from '../../models/song.model';

export default class UpdateSongScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    // @ts-ignore
    const item: MSong = props.navigation.state.params.item;

    this.state = {
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

  submit = () => {
    console.log(this.state);
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
