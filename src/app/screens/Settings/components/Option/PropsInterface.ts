import { TFunction } from "i18next";

  
export interface IProps {
    onNavigation?: () => void
    title: string,
    iconName?: string,
    iconLibrary?: 'FontAwesome' | 'Feather' | 'Ionicons' | 'MaterialIcons',
    mode?: 'navigation' | 'select',
    selectData?: ({label: string, value: string})[],
    onLanguageChange?: (language: 'es' | 'en') => void
}