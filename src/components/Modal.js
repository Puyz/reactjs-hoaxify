import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from './ButtonWithProgress';


const Modal = (props) => {
    const { visible, onClickCancel, onClickOk, message, pendingCall, title, okText } = props;
    const { t } = useTranslation();

    let className = "modal fade";
    if (visible) {
        className += " show d-block";
    }

    return (
        <div className={className} style={{ backgroundColor: '#000000b0' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <ButtonWithProgress
                            className='btn btn-danger'
                            onClick={onClickOk}
                            pending={pendingCall}
                            disabled={pendingCall}
                            text={okText}
                        />
                        <button className="btn btn-secondary" onClick={onClickCancel} disabled={pendingCall}> {t('Cancel')} </button>                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;