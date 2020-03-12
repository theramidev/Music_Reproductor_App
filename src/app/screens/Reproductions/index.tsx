import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { BackgroundLayout } from '../../components/BackgroundLayout';
import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';
import { Header } from '../../components/Header';
import { ListOfMusic } from '../../components/ListOfMusic';
import { MSong } from '../../models/song.model';
import { getRecents } from '../../redux/actions/fileActions';
import { theme } from '../../../assets/themes';

class ReproductionsScreen extends Component<IProps, IState> {
    state = {
        songs: []
    }

    async componentDidMount() {
        await this.props.getRecents();
        const songs: MSong[] = this.props.fileReducer.data.reproductions.map(reproduction => {
            return reproduction.song;
        });
        this.setState({songs});
    }

    render() {
        return(
            <BackgroundLayout>
                <Header 
                    navigation={this.props.navigation}
                    title="Recientes"
                />

                {
                    this.state.songs.length > 0 ?
                    <View style={{marginTop: 10, height: '100%'}}>
                        <ListOfMusic 
                        songs={this.state.songs}
                        navigate={this.props.navigation.navigate}
                        />
                    </View> :
                    <Text style={{marginTop: 10, textAlign: 'center', color: theme().text, fontSize: 20, fontWeight: 'bold'}}>
                        No se han reproducido canciones :(
                    </Text>
                }
            </BackgroundLayout>
        )
    }
}

const mapStateToProps = ({fileReducer}: any) => {
    return {
        fileReducer
    }
}

const mapDispatchToProps = {
    getRecents
}

export default connect<any>(mapStateToProps, mapDispatchToProps)(ReproductionsScreen);