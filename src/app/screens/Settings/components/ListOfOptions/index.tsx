import React, { FC } from 'react';
import { FlatList } from 'react-native';
import { DarkMode } from '../DarkMode';
import { Option } from '../Option';

export const ListOfOptions: FC<any> = ({navigation}) => {

    const dataList = [
        {
            id: '0',
            Component: <DarkMode />
        },
        {
            id: '1',
            Component: 
            <Option 
                navigation={navigation} 
                title="Cambiar imagen de fondo" 
                iconLibrary="Feather"
                iconName="image"
            />
        }
    ]

    return(
        <FlatList 
            data={dataList}
            renderItem={({item}) => item.Component}
            keyExtractor={(item) => item.id}
        />
    )
}