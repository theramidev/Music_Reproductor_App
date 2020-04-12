import React, { Component } from 'react';
import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';
import { connect } from 'react-redux';
import { getWallpapers, setLocalWallpaper, changeCurrentWallpaper, deleteWallpaper } from '../../redux/actions/wallpaperActions';
import { withTranslation } from 'react-i18next';

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

    changeCurrentWallpaper = (wallpaperPath: string | null) => {
        console.log(wallpaperPath);
        
        this.props.changeCurrentWallpaper(wallpaperPath);
    }

    deleteWallpaper = (wallpaperPath: string) => {
        this.props.deleteWallpaper(wallpaperPath);
    }

    render() {
        return(
            <BackgroundLayout>
                <Header navigation={this.props.navigation} title={this.props.t('headerTitle')} />

                <ListOfPhotoCard 
                    wallpapers={this.props.wallpaperReducer.data.wallpapers}
                    onWallpaperSelect={this.setWalppaper}
                    onWallpaperChange={this.changeCurrentWallpaper}
                    onDeleteWallpaper={this.deleteWallpaper}
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
    changeCurrentWallpaper,
    deleteWallpaper
}

export default connect<any>(mapstateToProps, mapDispatchToProps)(withTranslation('ChangeImage')(ChangeImageScreen));