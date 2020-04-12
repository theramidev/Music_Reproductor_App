import React, {FC} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {BackgroundLayout} from '../../../../components/BackgroundLayout';
import dynamicStyles from './style';

interface IModal {
  isOpen: boolean;
  onClose: any;
  text: string;
}

export const ModalLetter: FC<IModal> = ({isOpen, onClose, text}: IModal) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {t} = useTranslation('Music');

  const closeModal = () => {
    onClose(false);
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection="right"
      backdropOpacity={0.5}
      onBackButtonPress={closeModal}
      isVisible={isOpen}
      style={styles.modalContainer}>
      <View style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconHeader} onPress={closeModal}>
              <AntDesign name="close" size={25} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.textHeader}>{t('modalTitle')}</Text>
          </View>

          <ScrollView >
            <View style={styles.container}>
              {text && text.length > 0 ? (
                <Text style={styles.text}>{text}</Text>
              ) : (
                <Text style={styles.textWarning}>{t('noLyrics')}</Text>
              )}
            </View>
          </ScrollView>
      </View>
    </Modal>
  );
};
