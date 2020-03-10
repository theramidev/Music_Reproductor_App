
export interface IProps {
    mode: 'photo' | 'add' | 'default',
    onPress: Function,
    wallpaperPath?: string,
    onDelete?: Function
}