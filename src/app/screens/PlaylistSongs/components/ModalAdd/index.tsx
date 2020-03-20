import React, { FC, useState, useEffect } from 'react';
import { FlatList, View, TouchableOpacity, Text, Modal, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { IProps } from './PropsInterface';
import { staticStyles, dynamicStyleSheet } from './style';
import IconIo from 'react-native-vector-icons/Ionicons';
import { MSong } from '../../../../models/song.model';
import AutoScrolling from 'react-native-auto-scrolling';
import CheckBox from '@react-native-community/checkbox';
import Ripple from 'react-native-material-ripple';
import { theme } from '../../../../../assets/themes';
import { useDynamicStyleSheet, useDarkMode } from 'react-native-dark-mode';
import { useTranslation } from 'react-i18next';

export const ModalAdd: FC<IProps> = ({isVisible, onAdd, onClose, songs, oldSongs}) => {
    const [songsAdd, setSongsAdd] = useState<string[]>([]);
    const [songsDelete, setSongsDelete] = useState<string[]>([]);
    const [filter, setFilter] = useState('');
    const [visibleSongs, setVisibleSongs] = useState<MSong[]>([]);
    const [filterSelected, setFilterSelected] = useState<'all' | 'checked' | 'noChecked'>('all');
    const dynamicStyles = useDynamicStyleSheet(dynamicStyleSheet);
    const isDarkMode = useDarkMode();
    const { t } = useTranslation('ModalAdd');

    useEffect(() => {
        setVisibleSongs(songs);
    }, [songs]);

    const _onAdd = () => {
        // console.log(songsAdd);
        // console.log(songsDelete);
        onAdd(songsAdd, songsDelete);
        onClose();
        setSongsAdd([]);
        setSongsDelete([]);
    }

    const _onChange = (input: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setFilter(input.nativeEvent.text);
        const textSearch: string = input.nativeEvent.text;
        setFilterSelected('all');

        let newSongsVisibles: MSong[] = songs;

        if (textSearch.length) {
            newSongsVisibles = songs.filter(song => {
                return song.title.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1
            });
        }

        setVisibleSongs(newSongsVisibles);
    }

    const _onChangeFilter = (filter: 'all' | 'checked' | 'noChecked'): void => {
        switch(filter) {
            case 'all': {
                setVisibleSongs(songs);
                setFilterSelected(filter);
                return;
            }

            case 'checked': {
                setVisibleSongs(oldSongs);
                setFilterSelected(filter);
                return;
            }

            case 'noChecked': {
                const songsNoChecked: MSong[] = [];
                songs.forEach(song => {
                    const found = oldSongs.find(songFind => {
                        if (songFind.id === song.id) {
                            return true;
                        }
                    });

                    if (!found) {
                        songsNoChecked.push(song);
                    }
                });

                setVisibleSongs(songsNoChecked);
                setFilterSelected(filter);
                return;
            }

            default: {
                setVisibleSongs(songs);
                return;
            }
        }
    }

    const clearSearch = () => {
        setFilter('');
        setVisibleSongs(songs);
    }

    const SongCard: FC<{song: MSong}> = ({song}) => {
        const [checked, setChecked] = useState(false);

        useEffect(() => {
            const found = oldSongs.find(oldSong => {
                if (oldSong.id === song.id) {
                    return true;
                }
            });
            // console.log(found);
            if (found) {
                setChecked(true);
            }
        }, [oldSongs]);

        const _onChange = () => {
            // console.log(checked);
            if (!checked) {
                const found = oldSongs.find(oldSong => {
                    if (oldSong.id === song.id) {
                        return true;
                    }
                });

                if (!found) {
                    songsAdd.push(song.id);
                }

                const deleteIndex: number = songsDelete.indexOf(song.id);
                if (deleteIndex !== -1) {
                    songsDelete.splice(deleteIndex, 1);
                }
            } else {
                const index: number = songsAdd.indexOf(song.id);
                const found = oldSongs.find(oldSong => {
                    if (song.id === oldSong.id) {
                        return true;
                    }
                });
    
                if (found) {
                    songsDelete.push(found.id);
                }
                songsAdd.splice(index, 1);
            }

            setChecked(!checked);
        }

        return(
            <Ripple onPress={_onChange}>
                <View style={[staticStyles.songCardContainer, dynamicStyles.borderColor]}>
                    <View style={staticStyles.songLeft}>
                        {
                            song.title.length > 40 ? 
                            <AutoScrolling>
                                <Text style={dynamicStyles.texColor}>
                                    {song.title}
                                </Text>
                            </AutoScrolling> : 
                            <Text style={dynamicStyles.texColor}>
                                {song.title}
                            </Text>
                        }
                    </View>

                    <View style={staticStyles.songRight}>
                        <CheckBox 
                            value={checked}
                            onChange={_onChange}
                            tintColors={{
                                true: isDarkMode ? theme().secondary : theme().primary
                            }}
                        />
                    </View>
                </View>
            </Ripple>
        )
    }

    return(
        <Modal
            visible={isVisible}
            animationType="slide"
        >
            <View style={[staticStyles.container, dynamicStyles.container]}>
                <View style={staticStyles.header}>
                    <View style={staticStyles.inputSearch}>
                        <IconIo name="ios-search" size={30} color="white" />
                        <TextInput 
                            placeholder={t('searchPlaceholder')}
                            autoCapitalize="none"
                            autoCompleteType="off"
                            placeholderTextColor="white"
                            style={{marginLeft: 10, width: '84%', color: 'white'}}
                            onChange={_onChange}
                            value={filter}
                        />
                        {
                            filter.length > 0 && 
                            <TouchableOpacity onPress={clearSearch}>
                                <IconIo name="ios-close" size={30} color="white" />
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={staticStyles.buttonsHeader}>
                        <TouchableOpacity 
                            style={staticStyles.buttonHeader}
                            onPress={() => _onChangeFilter('all')}
                        >
                            <IconIo 
                                name="ios-list" 
                                size={30} 
                                color={filterSelected === 'all' ? isDarkMode ? theme().secondary : theme().primary : isDarkMode ? theme().light : theme().text}
                            />
                            <Text 
                                style={[
                                    staticStyles.textButton, 
                                    {
                                        color: filterSelected === 'all' ? isDarkMode ? theme().secondary : theme().primary : isDarkMode ? theme().light : theme().text
                                    }
                                ]}
                            >
                                {t('all')}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={staticStyles.buttonHeader}
                            onPress={() => _onChangeFilter('checked')}
                        >
                            <IconIo 
                                name="md-checkbox-outline" 
                                size={30} 
                                color={filterSelected === 'checked' ? isDarkMode ? theme().secondary : theme().primary : isDarkMode ? theme().light : theme().text}
                            />
                            <Text 
                                style={[
                                    staticStyles.textButton, 
                                    {
                                        color: filterSelected === 'checked' ? isDarkMode ? theme().secondary : theme().primary : isDarkMode ? theme().light : theme().text
                                    }
                                ]}
                            >
                                {t('added')}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={staticStyles.buttonHeader}
                            onPress={() => _onChangeFilter('noChecked')}
                        >
                            <IconIo 
                                name="md-square-outline" 
                                size={30} 
                                color={filterSelected === 'noChecked' ? isDarkMode ? theme().secondary : theme().primary : isDarkMode ? theme().light : theme().text}
                            />
                            <Text 
                                style={[
                                    staticStyles.textButton, 
                                    {
                                        color: filterSelected === 'noChecked' ? isDarkMode ? theme().secondary : theme().primary : isDarkMode ? theme().light : theme().text
                                    }
                                ]}
                            >
                                {t('notAdded')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList 
                    data={visibleSongs}
                    renderItem={({item}) => <SongCard song={item} />}
                    keyExtractor={({id}) => id}
                />

                <View style={staticStyles.buttonsContainer}>
                    <TouchableOpacity style={[staticStyles.button, dynamicStyles.borderColor]} onPress={onClose}>
                        <Text style={[staticStyles.textButton, dynamicStyles.texColor]}>
                            {t('cancel')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[staticStyles.button, dynamicStyles.borderColor]} onPress={_onAdd}>
                        <Text style={[staticStyles.textButton, dynamicStyles.texColor]}>
                            {t('accept')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}