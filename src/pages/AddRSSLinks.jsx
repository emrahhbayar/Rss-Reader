import React, { useState } from 'react'
import { useContext } from 'react';
import { useTranslation } from 'react-i18next'
import { Context } from '../contexts/RssContext';

function AddRSSLinks() {

    const { rssList, setRssList } = useContext(Context);

    const [enteredValue, setEnteredValue] = useState("");
    const { t } = useTranslation();

    function addRssLinkFunc() {
        if (enteredValue.trim() == '') {
            alert("Input cannot be empty")
            setEnteredValue('');
        }
        else if (rssList.includes(enteredValue)) {
            alert("The Rss you want to add is available in your list.")
            setEnteredValue('');
        } else {
            setRssList([...rssList, enteredValue]);
            setEnteredValue('');
        }
    }

    function handleDeleteFromList(deletedRss) {
        setRssList(rssList => rssList.filter(rss => rss !== deletedRss))
    }

    return (
        <div className="container">
            <div className="row row-cols-sm-1 row-cols-md-3  m-3">
                <div className="col"></div>
                <div className="col mt-3">

                    <h3 className='h3-css'>{t('Add Rss Link')}</h3>
                    <div>
                        <input value={enteredValue} onChange={(e) => setEnteredValue(e.target.value)} type="text" className="form-control input" id="rssLinks" placeholder="example.com/rss" />
                        <button onClick={addRssLinkFunc} className='btn btn-blue mt-3'>{t('Add')}</button>
                    </div>
                    <div className='mt-5'>
                        <h3 className='h3-css'>{t('Added Rss Lists')}</h3>
                        <ul className='list-group'>
                            {
                                rssList?.map((rss, index) => (

                                    <div className="d-flex justify-content-between align-items-center rounded-2 list-item p-2 mt-2" key={index}>
                                        <span>{rss}</span>
                                        <button onClick={() => handleDeleteFromList(rss)} className='btn btn-danger ms-2'>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>

                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="col"></div>

            </div>
        </div >
    )
}

export default AddRSSLinks