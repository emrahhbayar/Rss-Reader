import React, { useState } from 'react'
import { useContext } from 'react';
import { useTranslation } from 'react-i18next'
import { Context } from '../contexts/RssContext';

function AddRSSLinks() {

    const { rssList, setRssList } = useContext(Context);
    const [enteredValue, setEnteredValue] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const { t } = useTranslation();

    function handleShowModal(rss) {
        setItemToDelete(rss);
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setItemToDelete(null);
    }

    function handleDelete() {
        setRssList(rssList.filter(rss => rss !== itemToDelete));
        handleCloseModal();
    }

    function addRssLinkFunc() {
        if (enteredValue.trim() == '') {
            //alert("Input cannot be empty")
            setAlertMessage(t('Input cannot be empty'));
            setShowAlert(true);
            setEnteredValue('');
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
        else if (rssList.includes(enteredValue)) {
            //alert("The Rss you want to add is available in your list.")
            setAlertMessage(t('The Rss you want to add is available in your list'));
            setShowAlert(true);
            setEnteredValue('');
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        } else {
            setRssList([...rssList, enteredValue]);
            setEnteredValue('');
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center m-3">
                <div className="col-12 col-md-4 mt-3">
                    {showAlert && (
                        <div className="alert alert-danger" role="alert">
                            {alertMessage}
                        </div>
                    )}
                    <h3 className='h3-css'>{t('Add Rss Link')}</h3>
                    <div className='d-flex flex-column align-items-start'>
                        <input value={enteredValue} onChange={(e) => setEnteredValue(e.target.value)} type="text" className="form-control input p-2" id="rssLinks" placeholder="example.com/rss" />
                        <button onClick={addRssLinkFunc} className='btn btn-blue mt-3'>{t('Add')}</button>
                    </div>
                    <div className='mt-5'>
                        <h3 className='h3-css'>{t('Added Rss Lists')}</h3>
                        {
                            rssList.length === 0 ? (<div className='alert alert-dark'>{t('No Rss added yet')}</div>) :
                                (
                                    <ul className='list-group'>
                                        {
                                            rssList.map((rss, index) => (

                                                <div className="d-flex justify-content-between align-items-center rounded-2 list-item p-2 mt-2" key={index}>
                                                    <span className='d-inline-block text-truncate'>{rss}</span>
                                                    <button onClick={() => handleShowModal(rss)} className='btn btn-danger ms-2'>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                </div>

                                            ))
                                        }
                                    </ul>
                                )

                        }

                    </div>
                </div>
                {showModal && (
                    <div className="modal show d-block" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header justify-content-between">
                                    <h5 className="modal-title" id="exampleModalLabel">{t('Deletion Confirmation')}</h5>
                                    <button type="button" className="btn btn-close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>

                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>{itemToDelete} {t('Are you sure you want to delete?')}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>{t('No')}</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDelete}>{t('Yes')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default AddRSSLinks