import React, {Fragment, FC} from 'react';
import {Header} from '../../../../components/Header';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {useActionSheet} from '@expo/react-native-action-sheet';
import dynamicStyles from './style';
import {MSong} from 'src/app/models/song.model';

export const HeaderMusic: FC<{item: MSong; navigation: any}> = ({
  item,
  navigation,
}: any) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {showActionSheetWithOptions} = useActionSheet();
  // abre la ventana de opciones
  const openOptions = () => {
    showActionSheetWithOptions(
      {
        title: item.title,
        options: [
          'Agregar a lista de reproduccion',
          'Editar informacion',
          'Cancel',
        ],
        destructiveButtonIndex: 2,
        containerStyle: styles.actions,
        textStyle: styles.actionsText,
        titleTextStyle: styles.actionsTitle,
        cancelButtonIndex: -1,
      },
      async (index: number) => {
        switch (index) {
          case 0:
            break;
          case 1:
            navigation.navigate('UpdateSong', {item});
            break;

          default:
            break;
        }
      },
    );
  };

  return (
    <Fragment>
      <Header
        title={item.title}
        navigation={navigation}
        iconName="options-vertical"
        onPress={openOptions}
      />
    </Fragment>
  );
};
