import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

export interface IProps {
  title: string;
  placeholder?: string;
  value?: string;
  onChange(e: NativeSyntheticEvent<TextInputChangeEventData>): void;
}
