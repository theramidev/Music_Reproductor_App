import React, { FC, useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { IProps } from './PropsInterface';
import { useDarkMode } from 'react-native-dark-mode';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ListOfMusic } from '../../../../components/ListOfMusic';
import { ListOfDirs } from '../../../../components/ListOfDirs';
import { theme } from '../../../../../assets/themes';
import { ListOfAlbums } from '../ListOfAlbums';
import { ListOfAuthors } from '../ListOfAuthors';

export const Tabs: FC<IProps> = ({
    navigation,
    listSongs,
    updateFavorite,
    current,
    refreshing,
    refreshListSong
}) => {
    const isDarkMode = useDarkMode();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'songs' },
        { key: 'dirs' },
        { key: 'albums' },
        { key: 'authors' },
    ]);

    const _renderTabBar = (props: any) => {
        return <TabBar 
            {...props}
            style={{backgroundColor: isDarkMode ? theme(.2).light : theme(.1).dark, elevation: 0}}
            labelStyle={{color: isDarkMode ? theme().light : theme().dark, textTransform: 'capitalize', fontSize: 15}}
            indicatorStyle={{backgroundColor: isDarkMode ? theme().secondary : theme().primary}}
            renderIcon={({route}) => {
                const ICON_COLOR = isDarkMode ? theme().light : theme().text;
                const ICON_SIZE = 15;
                switch(route.key) {
                    case 'songs': 
                        return <MaterialIcons 
                            name="music-note" 
                            color={ICON_COLOR}
                            size={ICON_SIZE}
                        />;
                    case 'dirs':
                        return <FontAwesome
                            name="folder"
                            color={ICON_COLOR}
                            size={ICON_SIZE}
                        />;
                    case 'albums':
                        return <MaterialIcons 
                            name="album" 
                            color={ICON_COLOR}
                            size={ICON_SIZE}
                        />;
                    case 'authors':
                        return <MaterialCommunityIcons 
                            name="artist" 
                            color={ICON_COLOR}
                            size={ICON_SIZE}
                        />;
                    default: null;
                }
            }}
        />
    }

    const _renderScene = ({ route }: any) => {
        switch (route.key) {
            case 'songs':
                return <ListOfMusic
                    songs={listSongs}
                    updateFavorite={updateFavorite}
                    navigate={navigation.navigate}
                    paddingBottom={
                    Object.keys(current).length === 0
                        ? 50
                        : 108
                    }
                    refreshing={refreshing}
                    onRefresh={refreshListSong}
                />;
            case 'dirs':
                return <ListOfDirs 
                    songs={listSongs}
                    navigation={navigation}
                    paddingBottom={
                    Object.keys(current).length === 0
                        ? 0
                        : 108
                    }
                />;
            case 'albums':
                return <ListOfAlbums 
                    navigation={navigation}
                    songs={listSongs}
                    paddingBottom={
                        Object.keys(current).length === 0
                        ? 0
                        : 60
                    }
                />;
            case 'authors':
                return <ListOfAuthors 
                    navigation={navigation}
                    songs={listSongs}
                    paddingBottom={
                        Object.keys(current).length === 0
                        ? 0
                        : 62
                    }
                />;
            default:
            return null;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={_renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: Dimensions.get('window').width}}
            renderTabBar={_renderTabBar}
            style={{marginTop: 15}}
        />
    );
}