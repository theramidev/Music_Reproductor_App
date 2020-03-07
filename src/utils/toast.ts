import { ToastAndroid } from 'react-native';

export const ShowToast = (message: string, duration: number = 2.5) => {
    ToastAndroid.show(message, duration);
}