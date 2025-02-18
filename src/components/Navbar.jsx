import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { useState, useEffect } from 'react';

function Navbar() {

    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || 'light';
    });
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("language") || 'en-US';
    });

    function handleChangeLanguage() {
        i18n.changeLanguage(i18n.language === 'tr-TR' ? 'en-US' : 'tr-TR')
        setLanguage(i18n.language)
    }
    function handleChangeTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark')

    }
    function closeMenuOnLinkClick() {

        setTimeout(() => {
            const navbarCollapse = document.getElementById("navbarNav");
            if (navbarCollapse) {
                navbarCollapse.classList.remove("show");
            }
        }, 300);
    };

    useEffect(() => {
        document.querySelector('body').setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
        localStorage.setItem("language", language);
    }, [theme, language]);

    return (
        <nav className="navbar navbar-expand-lg navbar-container sticky-top">
            <div className="container-fluid">

                <button className="navbar-toggler toggler-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="d-flex justify-content-center flex-grow-2">
                        <ul className="navbar-nav my-3">
                            <li className="nav-item">
                                <Link onClick={closeMenuOnLinkClick} className='link' to='/'>{t('My RSS')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={closeMenuOnLinkClick} className='link' to='/addRssLinks'>{t('Add RSS Links')}</Link>
                            </li>
                        </ul>

                    </div>

                </div>
                <div className="d-flex">
                    <button className='btn btn-outline-light fs-5' onClick={handleChangeLanguage}>
                        {
                            i18n.language === 'tr-TR' ? 'EN' : 'TR'
                        }
                    </button>
                    <button className='btn btn-outline-light ms-2' onClick={handleChangeTheme}>
                        {
                            theme === 'light' ? (<i className="fa-solid fa-moon fs-5"></i>) : (<i className="fa-solid fa-sun fs-5"></i>)
                        }

                    </button>
                </div>


            </div>
        </nav>


    )
}

export default Navbar