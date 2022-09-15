import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { postHoax, postHoaxAttachment } from '../api/ApiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import Input from '../components/Input';
import AutoUploadImage from './AutoUploadImage';

const HoaxSubmit = () => {
    const { image } = useSelector((store) => ({ image: store.image }));
    const { t } = useTranslation();
    const [attachmentId, setAttachmentId] = useState();
    const [focused, setFocused] = useState(false);
    const [newImage, setNewImage] = useState();
    const [hoax, setHoax] = useState('');
    const [errors, setErrors] = useState({});
    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes', true);
    const pendingUploadFile = useApiProgress('post', '/api/1.0/hoax-attachments', true);
    

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
            setNewImage();
            setAttachmentId(undefined);
        }
    }, [focused]);
    useEffect(() => {
        setErrors({});
    }, [hoax]);

    const onClickHoaxify = async () => {
        const body = {
            content: hoax,
            attachmentId
        }
        try {
            await postHoax(body);
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    };
    const onChangeImage = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
        }
        fileReader.readAsDataURL(file);
    }
    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append("file", file);
        const response = await postHoaxAttachment(attachment);
        setAttachmentId(response.data.id);
    }

    let textAreaClass = "form-control";
    if (errors.content) {
        textAreaClass += " is-invalid";
    }

    return (
        <div className='card p-1 flex-row'>
            <ProfileImageWithDefault className='rounded-circle me-1' image={image} width='38' height='38' />
            <div className='flex-fill'>
                <textarea
                    className={textAreaClass}
                    rows={focused ? '3' : '1'}
                    onFocus={() => setFocused(true)}
                    onChange={(event) => setHoax(event.target.value)}
                    value={hoax}
                    style={{ resize: 'none' }}
                />
                <div className='invalid-feedback'>{errors.content}</div>
                {focused &&
                    <>
                        <Input type='file' onChangeState={onChangeImage}/>
                        {newImage && <AutoUploadImage image={newImage} uploading={pendingUploadFile}/>}
                        <div className='text-end mt-1'>
                            <ButtonWithProgress
                                className='btn btn-primary'
                                onClick={onClickHoaxify}
                                text='Hoaxify'
                                pending={pendingApiCall}
                                disabled={pendingApiCall || pendingUploadFile}
                            />
                            <button
                                className='btn btn-outline-danger d-inline-flex m-2'
                                onClick={() => setFocused(false)}
                                disabled={pendingApiCall || pendingUploadFile}
                            >
                                <i className="material-icons" style={{ fontSize: '18px', paddingTop: '3px' }}>close</i>
                                {t('Cancel')}
                            </button>
                        </div>
                    </>
                }

            </div>
        </div>
    );
};

export default HoaxSubmit;