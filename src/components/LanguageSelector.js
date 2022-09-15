import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../api/ApiCalls';

const LanguageSelector = (props) => {

    const { i18n } = useTranslation();
    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    return (
        <div className='container'>
            <img className="m-3" src="https://countryflagsapi.com/png/tr/" alt="TR" width={24} onClick={() => onChangeLanguage('tr')}/>
            <img src="https://countryflagsapi.com/png/us" alt="EN" width={24} onClick={ () => onChangeLanguage('en')}/>
        </div>
    );
};

export default LanguageSelector;