import React, {FC} from 'react';
import {Modal, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

import {BackgroundLayout} from '../../../../components/BackgroundLayout';
import dynamicStyles from './style';

interface IModal {
  isOpen: boolean;
  onClose: any;
  text: string;
}

export const ModalLetter: FC<IModal> = ({isOpen, onClose, text}: IModal) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { t } = useTranslation('Music');

  const closeModal = () => {
    onClose(false);
  };

  return (
    <Modal animationType="slide" visible={isOpen}>
      <BackgroundLayout>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconHeader} onPress={closeModal}>
            <AntDesign name="close" size={25} style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.textHeader}>
            {t('modalTitle')}
          </Text>
        </View>

        <ScrollView>
          <View style={styles.container}>
            {text && <Text style={styles.text}>{text}</Text>}
            {!text && (
              <Text style={styles.textWarning}>
                {t('noLyrics')}
              </Text>
            )}
          </View>
        </ScrollView>
      </BackgroundLayout>
    </Modal>
  );
};
