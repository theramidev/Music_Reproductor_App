import React, {FC, useState} from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import fs from 'react-native-fs';

import dynamicStyles from './styles';

export const UpdateImage: FC<{
  cover: string;
  onChange(image: string): void;
}> = ({cover, onChange}: any) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const [image, setImage] = useState('');
  /* const [pickerImage, setPickerImage] = useState<DocumentPickerResponse | null>(
    null,
  ); */

  /**
   * @description Abre el DocimentPicker
   */
  const openDocumentPiecker = async () => {
    try {
      const picker = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const existsDir = await fs.exists(
        `${fs.DocumentDirectoryPath}/temp/playlist`,
      );
      const existsFile = await fs.exists(
        `${fs.DocumentDirectoryPath}/temp/playlist/${picker.name}`,
      );

      if (!existsDir) {
        await fs.mkdir(`${fs.DocumentDirectoryPath}/temp/playlist`);
      }

      if (!existsFile) {
        await fs.moveFile(
          picker.uri,
          `${fs.DocumentDirectoryPath}/temp/playlist/${picker.name}`,
        );
      }

      const file = await fs.stat(
        `${fs.DocumentDirectoryPath}/temp/playlist/${picker.name}`,
      );

      setImage(file.path);
      onChange(file.path);
      //setPickerImage(picker);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('DocumentPicker canceled!');
        return;
      }

      console.error('DocumentPicker Error: ', error);
    }
  };

  const showImage = (imagePath: string) => {
    if (imagePath) {
      return (
        <Image source={{uri: 'file://' + imagePath}} style={styles.image} />
      );
    } else {
      return (
        <Image
          source={require('../../../../../assets/images/music_notification.png')}
          style={styles.image}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foto de portada</Text>

      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <TouchableOpacity onPress={openDocumentPiecker}>
          {!image ? (
            showImage(cover)
          ) : (
            <Image source={{uri: 'file://' + image}} style={styles.image} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
