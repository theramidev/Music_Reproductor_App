import React, {FC} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {IProps} from './interfaces/Props';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AutoScrolling from 'react-native-auto-scrolling';

import dynamicStyles from './style';
import {HeaderBackButton} from 'react-navigation-stack';

export const Header: FC<IProps> = ({
  navigation,
  iconName,
  title,
  onPress,
  children,
  loading,
}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {children ? (
        children
      ) : (
        <View style={styles.contentText}>
          {title.length <= 24 && <Text style={styles.text}>{title}</Text>}
          {title.length > 24 && (
            <AutoScrolling style={styles.scroll}>
              <Text style={styles.text}>{title}</Text>
            </AutoScrolling>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.back}>
        <HeaderBackButton
          tintColor={styles.back.color}
          onPress={back}
          disabled={loading}
        />
      </TouchableOpacity>

      {iconName && !loading && (
        <TouchableOpacity style={styles.icon} onPress={onPress}>
          <SimpleLineIcons
            name={iconName}
            color={styles.icon.color}
            size={15}
          />
        </TouchableOpacity>
      )}

      {loading && (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={styles.icon}>
          <ActivityIndicator size="small" color="#00F1DF" />
        </View>
      )}
    </View>
  );
};
