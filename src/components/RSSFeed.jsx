import React from 'react'
import { useTranslation } from 'react-i18next'
const defaultImage = "/images/default-image.webp";

function RSSFeed({ feed }) {

    const { t } = useTranslation();
    return (
        <div className="col mt-3">
            <div className="card h-100 text-center card-css">
                <div className="card-header card-header-css">
                    {feed.source}
                </div>
                <img className="m-1 rounded" src={feed.image || defaultImage} height="180px"></img>
                <div className="card-body card-body-css">
                    <h5 className="card-title">{feed.title}</h5>
                    <a target='_blank' href={feed.link} className="btn btn-blue">{t('Go to link')}</a>
                </div>
                <div className="card-footer card-footer-css">
                    {feed.timeDifference}
                </div>
            </div>
        </div >
    )
}

export default RSSFeed