import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/ApiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress'
import Spinner from '../components/Spinner';
import HoaxFeed from '../components/HoaxFeed';

const UserPage = (props) => {
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);
    const { username } = useParams(); //props.match.params;
    const { t } = useTranslation();
    const pendingApiCall = useApiProgress("get", '/api/1.0/users/' + username, true);


    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) {
                setNotFound(true);
            }

        }
        loadUser();
    }, [username]);



    if (notFound) {
        return (
            <div className='container text-center'>
                <div className="alert alert-danger">
                    <div><i className="material-icons" style={{ fontSize: '48px' }}>error_outline</i></div>
                    {t('User not found')}
                </div>
            </div>

        );
    }
    
    if (pendingApiCall || username !== user.username) {
        return (
            <Spinner />
        );
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md'>
                    <ProfileCard user={user} />
                </div>
                <div className='col-md'>
                    <HoaxFeed />
                </div>
            </div>
        </div>
    );
};

export default UserPage;