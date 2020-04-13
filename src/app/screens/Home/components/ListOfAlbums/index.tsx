import React, { FC, useEffect, useState } from 'react';
import { Text, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { IProps } from './PropsInterface';
import { staticStyles } from './style';
import AutoScrolling from 'react-native-auto-scrolling';
import { MSong } from '../../../../models/song.model';
import { useDarkMode } from 'react-native-dark-mode';
import { theme } from '../../../../../assets/themes';

export const ListOfAlbums: FC<IProps> = ({
    navigation,
    songs = [],
    paddingBottom = 60
}) => {
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const isDarkMode = useDarkMode();

    useEffect(() => {
        const allAlbums: IAlbum[] = songs.map(song => {
            return {name: song.album ? song.album : 'unknown', cover: song.cover}
        });
        const albumsArray: IAlbum[] = [];
        allAlbums.forEach((album) => {
            const found = albumsArray.find(albumFind => {
                if (albumFind.name.toLowerCase().trim()  === album.name.toLowerCase().trim()) {
                    return true;
                }
            });
            
            if (!found) {
                albumsArray.push({cover: album.cover, name: album.name});
            }
        })

        setAlbums(albumsArray);
    }, [songs]);

    const _renderItem = ({cover, name}: IAlbum) => {

        const goToMusicList = () => {
            const albumSongs: MSong[] = songs.filter(song => {
                if (name === 'unknown') {
                    return true;
                }
                
                if (song.album?.trim() === name.trim()) {
                    return true;
                }
            })
            
            navigation.navigate('MusicList', {title: name, songs: albumSongs})
        }

        return(
            <TouchableOpacity 
                style={staticStyles.cardContainer}
                onPress={goToMusicList}
            >
                <Image 
                    source={cover ? {uri: cover} : require('../../../../../assets/images/music_notification.png')}
                    style={staticStyles.cardImage}
                />
                {
                    name.length > 20 ?
                    <AutoScrolling style={{height: 20}}>
                        <Text style={[staticStyles.cardText, {color: isDarkMode ? theme().light : theme().text}]}>
                            {name}
                        </Text>
                    </AutoScrolling> :
                    <Text style={[staticStyles.cardText, {color: isDarkMode ? theme().light : theme().text}]}>
                        {name}
                    </Text>
                }
            </TouchableOpacity>
        )
    }

    return(
        <View style={{paddingBottom}}>
            <FlatList 
                data={albums}
                numColumns={2}
                keyExtractor={(item) => item.name}
                renderItem={({item}) => _renderItem(item)}
            />
        </View>
    )
}

interface IAlbum {
    cover: string | null,
    name: string
}