import React, { useState } from 'react';
import ProfileImageWithDefault from '../components/ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/ApiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import Modal from './Modal';

const HoaxView = (props) => {
    const currentUsername = useSelector(store => store.username);
    const { hoax, onDeleteHoax } = props;
    const { id, user, fileAttachment, content, timestamp } = hoax;
    const { username, displayName, image } = user;
    const { i18n, t } = useTranslation();
    const deletePendingCall = useApiProgress('delete', '/api/1.0/hoaxes/' + id, true);
    const [modalvisible, setModalVisible] = useState(false);

    const formatted = format(timestamp, i18n.language);

    const onClickDelete = async () => {
        await deleteHoax(id);
        onDeleteHoax(id);
    }
    const onClickCancel = () => {
        setModalVisible(false);
    }
    

    return (
        <>
            <div className='card p-1 mb-2'>
                <div className='d-flex'>
                    <ProfileImageWithDefault image={image} width='32' height='32' className='rounded-circle m-1' />
                    <div className='flex-fill m-auto ps-2'>
                        <Link to={`/user/${username}`} className='text-muted' style={{ textDecoration: 'none' }}>
                            <h6 className='d-inline'>{displayName}@{username}</h6>
                            <span> - </span>
                            <span>{formatted}</span>
                        </Link>
                    </div>
                    {(currentUsername === username) &&
                        <button className='btn btn-delete-link' onClick={() => setModalVisible(true)}>
                            <i className="material-icons">delete_outline</i>
                        </button>
                    }
                </div>
                <div className='px-5'> {content} </div>
                {fileAttachment && (
                    <div className='px-5'>
                        {fileAttachment.fileType.startsWith("image") && <img className='img-fluid' src={`images/attachments/${fileAttachment.name}`} alt={content} />}
                        {!fileAttachment.fileType.startsWith("image") &&
                            <strong>Bilinmeyen dosya tipi</strong>
                        }
                    </div>
                )}
            </div>
            <Modal
                visible={modalvisible}
                onClickCancel={onClickCancel}
                onClickOk={onClickDelete}
                pendingCall={deletePendingCall}
                title={t('Delete Hoax')}
                okText={t('Delete Hoax')}
                message={
                    <div>
                        <div>
                            <strong>{t('Are you sure to delete hoax?')}</strong>
                        </div>
                        <span>{content}</span>
                    </div>
                }

            />
        </>
    );
};

export default HoaxView;