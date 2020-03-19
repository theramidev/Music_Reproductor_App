import React, { FC } from 'react';
import { FlatList } from 'react-native';
import { DarkMode } from '../DarkMode';
import { Option } from '../Option';

export const ListOfOptions: FC<any> = ({navigation, onLanguageChange}) => {

    const goToChangeImage = () => {
        navigation.navigate('ChangeImage')
    }

    const dataList = [
        {
            id: '0',
            Component: <DarkMode />
        },
        {
            id: '1',
            Component: 
            <Option 
                onNavigation={goToChangeImage}
                title="Cambiar imagen de fondo" 
                iconLibrary="Feather"
                iconName="image"
            />
        },
        {
            id: '2',
            Component:
            <Option 
                title="Cambiar idioma"
                iconLibrary="MaterialIcons"
                iconName="language"
                mode="select"
                selectData={[{label: 'Español', value: 'es'},{label: 'English', value: 'en'}]}
                onLanguageChange={onLanguageChange}
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