import React, { Component } from 'react';
import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';
import { connect } from 'react-redux';
import { getWallpapers, setLocalWallpaper, changeCurrentWallpaper } from '../../redux/actions/wallpaperActions';

import { BackgroundLayout } from '../../components/BackgroundLayout';
import { Header } from '../../components/Header';
import { ListOfPhotoCard } from './components/ListOfPhotocard';


class ChangeImageScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getWallpapers();
    }

    setWalppaper = ({name, uri}: any) => {
        this.props.setLocalWallpaper(uri, name);
    }

    changeCurrentWallpaper = (wallpaperPath: string) => {
        this.props.changeCurrentWallpaper(wallpaperPath);
    }

    render() {
        return(
            <BackgroundLayout>
                <Header navigation={this.props.navigation} title="Cambiar imagen" />

                <ListOfPhotoCard 
                    wallpapers={this.props.wallpaperReducer.data.wallpapers}
                    onWallpaperSelect={this.setWalppaper}
                    onWallpaperChange={this.changeCurrentWallpaper}
                />
            </BackgroundLayout>
        )
    }
}

const mapstateToProps = ({wallpaperReducer}: any) => {
    return {
        wallpaperReducer
    }
}

const mapDispatchToProps = {
    getWallpapers,
    setLocalWallpaper,
    changeCurrentWallpaper
}

export default connect<any>(mapstateToProps, mapDispatchToProps)(ChangeImageScreen);