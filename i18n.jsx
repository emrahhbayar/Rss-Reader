import en from './language/en.jsx';
import tr from './language/tr.jsx';
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';


const resources = {
    'en-US': en,
    'tr-TR': tr
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language") || "en-US",
    keySeperator: false,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;