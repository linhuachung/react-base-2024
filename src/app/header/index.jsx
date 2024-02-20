import React, { useContext, useState } from 'react'
import { IMAGES } from '../../theme/images.js';
import { useTranslation } from 'react-i18next';
import { LocalStore } from '../../utils/helpers/local.js';
import LanguageContext from '../../context/TranslateContext.jsx';
import Menu from 'src/components/menu/index.jsx';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import ButtonImage from 'src/app/header/components/buttonImage.jsx';

function Header() {
    const { i18n } = useTranslation()
    const { tHeader } = useContext(LanguageContext);
    const [language, setLanguage] = useState(LocalStore.get('language') || 'vn')

    const chooseLanguageItems = [
        {
            label: tHeader('vn'),
            image: IMAGES.VI_FLAG,
            key: 'vn'
        },
        {
            label: tHeader('en'),
            image: IMAGES.EN_FLAG,
            key: 'en'
        }
    ]

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang).then(r => r)
        LocalStore.set('language', lang)
        setLanguage(lang)
    }

    return (
        <div>
            <div>
                <Menu
                    items={chooseLanguageItems}
                    icon={faGlobe}
                    dropdownRender={(menu) => {
                        const { items } = menu.props
                        return (
                            <div>
                                {items.map((menu) => {
                                    return (
                                        <ButtonImage
                                            key={menu.key}
                                            onClick={() => handleChangeLanguage(menu.key)}
                                            type={JSON.stringify(menu.key) === JSON.stringify(language) ? 'primary' : 'link'}
                                            src={menu.image}
                                            title={menu.label}
                                        />

                                    )
                                })}
                            </div>
                        )
                    }}
                >
                    <ButtonImage
                        alt="Fluffybuns the destroyer"
                        src={language === 'vn' ? IMAGES.VI_FLAG : IMAGES.EN_FLAG}
                        title={tHeader(`${language}`)}
                    />
                </Menu>
            </div>
            <div></div>
        </div>
    )
}

export default Header
