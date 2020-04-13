import React, { FC, useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { IProps } from './PropsInterface';
import AutoScrolling from 'react-native-auto-scrolling';
import { staticStyles, dynamicStyleSheet } from './style';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import Ripple from 'react-native-material-ripple';
import { MSong } from '../../../../models/song.model';

export const ListOfAuthors: FC<IProps> = ({
    navigation,
    paddingBottom = 100,
    songs = []
}) => {
    const [authors, setAuthors] = useState<string[]>([]);
    const dynamicStyles = useDynamicStyleSheet(dynamicStyleSheet);

    useEffect(() => {
        const allNames: string[] = songs.map(({author}) => author ? author : '<unknown>');
        const authorsArray: string[] = [];
        allNames.forEach(name => {
            const found = authorsArray.find(nameFind => {
                if (name.trim() === nameFind) {
                    return true;
                }
            });
            if (!found) {
                authorsArray.push(name)
            }
        });

        authorsArray.sort((a, b) => {
            if (a.toLowerCase() > b.toLowerCase()) {
                return 1
            } else {
                return -1
            }
        })

        setAuthors(authorsArray);
    }, [songs]);

    const _renderItem = (author: string) => {

        const goToMusicList = () => {
            const listSongs: MSong[] = songs.filter(song => {
                if (author === '<unknown>' && !song.author) {
                    return true;
                }

                if (author.trim() === song.author?.trim()) {
                    return true;
                }
            });

            navigation.navigate('MusicList', {title: author, songs: listSongs});
        }

        return(
            <Ripple 
                style={[staticStyles.cardContainer, dynamicStyles.cardContainer]}
                rippleDuration={500}
                onPress={goToMusicList}
            >
                {
                    author.length > 40 ? 
                    <AutoScrolling>
                        <Text style={[staticStyles.cardText, dynamicStyles.colorText]}>
                            {author}
                        </Text>
                    </AutoScrolling> :
                    <Text style={[staticStyles.cardText, dynamicStyles.colorText]}>
                        {author}
                    </Text>
                }
            </Ripple>
        )
    }

    return(
        <View style={{paddingBottom, marginHorizontal: 5, marginTop: 10}}>
            <FlatList 
                data={authors}
                renderItem={({item}) => _renderItem(item)}
                keyExtractor={(item) => item}
            />
        </View>
    )
}