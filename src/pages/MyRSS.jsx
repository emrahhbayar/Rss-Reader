import React from 'react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import RSSFeed from '../components/RSSFeed';
import { useTranslation } from 'react-i18next';
import { Context } from '../contexts/RssContext';

function MyRSS() {

    const { rssList } = useContext(Context);
    const [disabled, setDisabled] = useState("");

    const [data, setData] = useState([]);
    const { t, i18n } = useTranslation();
    const locale = i18n.language === "tr-TR" ? "tr" : "eng";
    const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

    async function getRSSfeed(RSSLinks) {
        setDisabled("disabled");
        const response = await axios.get(`${baseURL}locale=${locale}&urls=${RSSLinks}`);
        setData(response.data);
        setDisabled("");

    }

    const rssLinks = rssList.join(',');
    useEffect(() => {
        getRSSfeed(rssLinks)
    }, [locale])

    return (
        <div className='container'>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 m-3">
                <div className="col"></div>
                <div className="col d-grid">
                    <button className={`btn btn-blue btn-block ${disabled}`} onClick={() => getRSSfeed(rssLinks)}>{t('Refresh')}</button>
                </div>
                <div className="col"></div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 m-3">
                {
                    data.map((feed, index) => (
                        <RSSFeed feed={feed} key={index}></RSSFeed>
                    ))
                }
            </div>
        </div>
    )
}

export default MyRSS