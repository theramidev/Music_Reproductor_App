import React, {FC} from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './styles';
import {TextInput, View, Text} from 'react-native';
import {IProps} from './interfaces/Props';

export const Input: FC<IProps> = ({title, value, onChange}: IProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.input}>
      <Text style={styles.label}>{title}</Text>

      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 20,
          backgroundColor: 'gray',
          width: 1,
          marginHorizontal: 10,
        }}
      />

      <TextInput
        style={styles.search}
        placeholder={title}
        underlineColorAndroid="transparent"
        placeholderTextColor={styles.label.color}
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

export const InputArea: FC<IProps> = ({
  title,
  placeholder,
  value,
  onChange,
}: IProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={[styles.input, {flexDirection: 'column', height: 200}]}>
      <Text style={[styles.label, {marginTop: 10}]}>{title}</Text>
      <TextInput
        style={[styles.search, {height: 200, marginBottom: 10}]}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        placeholderTextColor={styles.label.color}
        editable
        multiline
        numberOfLines={10}
        value={value}
        onChange={onChange}
      />
    </View>
  );
};
