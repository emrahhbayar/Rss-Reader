import React from 'react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import RSSFeed from '../components/RSSFeed';
import { useTranslation } from 'react-i18next';
import { Context } from '../contexts/RssContext';

function MyRSS() {

    const { rssList } = useContext(Context);
    const [disabled, setDisabled] = useState("");
    const [list, setList] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const { t, i18n } = useTranslation();
    const locale = i18n.language === "tr-TR" ? "tr" : "eng";
    const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

    async function getRSSfeed(RSSLinks) {
        setDisabled("disabled");
        const response = await axios.get(`${baseURL}locale=${locale}&urls=${RSSLinks}`);
        setList(response.data.list);
        setErrorMessages(response.data.errorMessages);
        if (response.data.errorMessages && response.data.errorMessages.length > 0) {
            setErrorMessages(response.data.errorMessages);
            setShowAlert(true);
        }
        setDisabled("");
    }
    function handleCloseModal() {
        setShowAlert(false);
    }

    const rssLinks = rssList.join(',');
    useEffect(() => {
        getRSSfeed(rssLinks)
    }, [locale]);

    useEffect(() => {
        let timer;
        if (showAlert) {
            timer = setTimeout(() => {
                setShowAlert(false);
            }, 10000);
        }
        return () => clearTimeout(timer);
    }, [showAlert]);

    return (
        <div className='container'>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 m-3">
                <div className="col"></div>
                <div className="col d-grid">
                    <button className={`btn btn-blue btn-block ${disabled}`} onClick={() => getRSSfeed(rssLinks)}>{t('Refresh')}</button>
                </div>
            </div>
            {showAlert && errorMessages.length > 0 && (
                <div className="row m-3">
                    <div className="col-12">
                        <div className="alert alert-danger shadow-sm border-0" role="alert">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <strong>{t('Some resources could not be loaded')}</strong>
                                <button type="button" className="btn btn-close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <hr className="border-danger border-opacity-75 m-0" />
                            <ul className="list-unstyled mb-0">
                                {errorMessages.map((error, index) => (
                                    <li
                                        key={index}
                                        className={`py-2 ${index !== errorMessages.length - 1 ? 'border-bottom  border-danger border-opacity-25' : ''}`}
                                    >
                                        <div className="fw-bold text-break small text-danger-emphasis">
                                            {error.url}
                                        </div>

                                        <div className="my-1 d-flex align-items-start small opacity-75">
                                            <span className="badge bg-danger me-2 mt-1">{t('Error')}</span>
                                            <em className="text-break">{error.errorMessage}</em>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            <div className="col"></div>

            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 m-3">
                {
                    list.map((feed, index) => (
                        <RSSFeed feed={feed} key={index}></RSSFeed>
                    ))
                }
            </div>
        </div>
    )
}

export default MyRSS