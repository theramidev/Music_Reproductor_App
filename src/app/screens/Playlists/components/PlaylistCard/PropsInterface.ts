import { GestureResponderEvent } from "react-native";

export interface IProps {
    mode: 'add' | 'playlist',
    title: string,
    image?: string | null,
    onCreate?: (event: GestureResponderEvent) => void
}