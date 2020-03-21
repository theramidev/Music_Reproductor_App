import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import es from '../assets/i18n/es.json';
import en from '../assets/i18n/en.json';

i18n
.use(initReactI18next)
.init({
    resources: {
        es,
        en
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: __DEV__,
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: '.'
    },
    react: {
        wait: true
    },
    defaultNS: 'messages'
});

export default i18n;
