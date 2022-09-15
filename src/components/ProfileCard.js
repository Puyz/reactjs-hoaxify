import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { updateHandler } from '../redux/AuthActions';
import Modal from './Modal';
import { deleteUser } from '../api/ApiCalls';
import { logoutSuccessAction } from '../redux/AuthActions';

const ProfileCard = (props) => {
    const dispatch = useDispatch();
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const { loggedInUsername } = useSelector((store) => ({ loggedInUsername: store.username }));
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [user, setUser] = useState({});
    const { username, displayName, image } = user;
    const { t } = useTranslation();
    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);
    const deletePendingApiCall = useApiProgress('delete', '/api/1.0/users/' + username);
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const [errorState, setErrorState] = useState({});
    const [modalvisible, setModalVisible] = useState(false);
    const history = useHistory();
    


    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    }, [loggedInUsername, pathUsername]);

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setErrorState((previousErrorState) => {
            return {
                ...previousErrorState,
                displayName: undefined
            }
        });
    }, [updatedDisplayName]);

    useEffect(() => {
        setErrorState((previousErrorState) => {
            return {
                ...previousErrorState,
                image: undefined
            }
        });
    }, [newImage]);

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName]);

    const onClickSave = async () => {
        let image;
        if (newImage) {
            image = newImage.split(',')[1];
        }
        const body = {
            displayName: updatedDisplayName,
            image
        }
        try {
            const response = await dispatch(updateHandler(username, body));
            setInEditMode(false);
            setUser(response.data);

        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrorState(error.response.data.validationErrors);
            }
        }


    }
    const onClickCancel = () => {
        setInEditMode(false);
        setUpdatedDisplayName(displayName);
        setNewImage(undefined);
    }
    const onClickDeleteAccount = async () => {
        try {
            await deleteUser(username);
            setModalVisible(false);
            dispatch(logoutSuccessAction());
            history.push('/');
        } catch (error) {  }
    }
    const onChangeImage = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }




    return (
        <>
            <div className='card mb-2'>
                <div className='text-center '>
                    <ProfileImageWithDefault
                        width='128'
                        height='128'
                        className='rounded-circle shadow mt-3'
                        image={image}
                        tempimage={newImage}
                    />
                </div>
                <div className='card-body text-center'>
                    {!inEditMode &&
                        <>
                            <h5 className='card-title'> {displayName}@{username} </h5>
                            {editable &&
                                <>
                                    <div>
                                        <button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}>
                                            <i className="material-icons " style={{ fontSize: '18px', paddingTop: '3px' }}>create</i>
                                            {t('Edit')}
                                        </button>
                                    </div>
                                    <div className='pt-2'>
                                        <button className='btn btn-danger d-inline-flex' onClick={() => setModalVisible(true)}>
                                            <i className="material-icons " style={{ fontSize: '18px', paddingTop: '3px' }}>directions_run</i>
                                            {t('Delete My Account')}
                                        </button>
                                    </div>
                                </>
                            }
                        </>
                    }
                    {inEditMode &&
                        <div>
                            <Input
                                label={t('Display name')}
                                defaultValue={displayName}
                                onChangeState={event => setUpdatedDisplayName(event.target.value)}
                                error={errorState.displayName}
                            />
                            <Input type="file" onChangeState={onChangeImage} error={errorState.image} />
                            <div>
                                <ButtonWithProgress
                                    className='btn btn-primary d-inline-flex m-2'
                                    onClick={onClickSave}
                                    pending={pendingApiCall}
                                    disabled={pendingApiCall}
                                    text={
                                        <>
                                            <i className="material-icons" style={{ fontSize: '18px', paddingTop: '3px' }}>save</i>
                                            {t('Save')}
                                        </>
                                    }
                                />

                                <button className='btn btn-danger d-inline-flex m-2' onClick={onClickCancel} disabled={pendingApiCall}>
                                    <i className="material-icons" style={{ fontSize: '18px', paddingTop: '3px' }}>close</i>
                                    {t('Cancel')}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Modal
                visible={modalvisible}
                onClickCancel={() => setModalVisible(false)}
                onClickOk={onClickDeleteAccount}
                pendingCall={deletePendingApiCall}
                title={t('Delete My Account')}
                okText={t('Delete My Account')}
                message={
                    <div className='text-center'>
                        <span>{t('Are you sure to delete your account?')}</span>
                    </div>
                }

            />
        </>
    );
};


export default ProfileCard;




/* inEditMode JSX
<>
</>
ifadeleri inEditMode kısmında hem h5 hemde button döndürüyoruz fakat JSX 1 tane döndürme yapar onun için birleştiriyoruz.

<div>
    Arasınada böyle yazabilirdik fakat fazladan div olmuş olurdu onun için içi boş tag yapıyoruz.
</div>

*/