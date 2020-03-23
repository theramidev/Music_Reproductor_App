import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {IProps} from './PropsInterface';
import {staticStyle, dynamicStyleSheet} from './style';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import fs from 'react-native-fs';
import {ShowToast} from '../../../utils/toast';
import Modal from 'react-native-modal';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {useTranslation} from 'react-i18next';

export const ModalPlaylist: FC<IProps> = ({
  onClose,
  onCreate,
  playlist,
  onEdit,
  isVisible,
}) => {
  const [image, setImage] = useState('');
  const [pickerImage, setPickerImage] = useState<DocumentPickerResponse | null>(
    null,
  );
  const [playlistName, setPLaylistName] = useState('');
  const dynamicStyle = useDynamicStyleSheet(dynamicStyleSheet);
  const {t} = useTranslation('ModalPlaylist');

  useEffect(() => {
    if (playlist) {
      if (playlist.image) {
        setImage(playlist.image);
      }

      setPLaylistName(playlist.name);
    }

    return () => {
      fs.exists(`${fs.DocumentDirectoryPath}/temp/playlist`).then(
        async exists => {
          if (exists) {
            await fs.unlink(`${fs.DocumentDirectoryPath}/temp/playlist`);
          }
        },
      );
      close();
    };
  }, []);

  const close = () => {
    setImage('');
    setPickerImage(null);
    setPLaylistName('');
    onClose();
  };

  const _onAccept = () => {
    if (playlistName.trim() === '') {
      ShowToast(t('nameRequired'));
      return;
    }

    if (onCreate) {
      onCreate(pickerImage, playlistName);
    }

    if (onEdit) {
      onEdit(pickerImage, playlistName);
    }

    onClose();
  };

  const _onChange = (input: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPLaylistName(input.nativeEvent.text);
  };

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

      setImage('file://' + file.path);
      setPickerImage(picker);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('DocumentPicker canceled!');
        return;
      }

      console.error('DocumentPicker Error: ', error);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={close}
      onBackdropPress={close}
      hasBackdrop={true}
      useNativeDriver={true}
      backdropOpacity={0.0}
      animationIn="zoomIn"
      animationOut="zoomOut">
      <View style={[staticStyle.container, dynamicStyle.container]}>
        <View style={staticStyle.left}>
          <TouchableOpacity
            style={staticStyle.photoContainer}
            onPress={openDocumentPiecker}>
            {image ? (
              <Image
                source={{uri: 'file://' + image}}
                style={staticStyle.image}
              />
            ) : (
              <View>
                <IconMc name="image-plus" color="white" size={40} />
              </View>
            )}
          </TouchableOpacity>
          {!image && (
            <Text style={staticStyle.addPhotoText}>{t('addImage')}</Text>
          )}
        </View>

        <View style={staticStyle.right}>
          <View style={{width: '100%'}}>
            <Text style={[staticStyle.inputLabel, dynamicStyle.textColor]}>
              {t('listName')}
            </Text>
            <TextInput
              autoCapitalize="none"
              autoCompleteType="off"
              placeholder={t('inputNamePlaceholder')}
              style={staticStyle.input}
              onChange={_onChange}
              value={playlistName}
            />
          </View>
        </View>

        <View style={staticStyle.buttonContainer}>
          <TouchableOpacity style={[staticStyle.button]} onPress={close}>
            <Text style={[staticStyle.buttonText, dynamicStyle.textColor]}>
              {t('cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[staticStyle.button]} onPress={_onAccept}>
            <Text style={[staticStyle.buttonText, dynamicStyle.textColor]}>
              {t('accept')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
