import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHoaxes, getNewHoaxCount, getNewHoaxes, getOldHoaxes } from '../api/ApiCalls';
import HoaxView from './HoaxView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';

const HoaxFeed = () => {
    const [newHoaxCount, setNewHoaxCount] = useState(0);
    const { username } = useParams();
    const [hoaxPage, setHoaxPage] = useState(
        {
            content: [],
            last: true
        }); // Pageable
    const { content, last } = hoaxPage;
    const { t } = useTranslation();


    let lastHoaxId = 0;
    let firstHoaxId = 0;
    if (content.length > 0) {
        firstHoaxId = content[0].id;
        const lastHoaxIndex = content.length - 1;
        lastHoaxId = content[lastHoaxIndex].id;
    }
    const path = (username) ? `/api/1.0/users/${username}/hoaxes?page=` : `/api/1.0/hoaxes?page=`;
    const InitialPendingApiCall = useApiProgress('get', path);

    const oldHoaxesPath = (username) ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` : `/api/1.0/hoaxes/${lastHoaxId}`;
    const oldHoaxesPendingApiCall = useApiProgress('get', oldHoaxesPath, true);

    const newHoaxesPath = (username) ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after` : `/api/1.0/hoaxes/${firstHoaxId}?direction=after`;
    const newHoaxesPendingApiCall = useApiProgress('get', newHoaxesPath, true);


    useEffect(() => {
        const getCount = async () => {
            const response = await getNewHoaxCount(username, firstHoaxId);
            setNewHoaxCount(response.data.count);
        }
        if (!newHoaxesPendingApiCall) {
            let looper = setInterval(getCount, 120000);
            return () => {
                clearInterval(looper);
            }
        }
    }, [firstHoaxId, username, newHoaxesPendingApiCall]);


    useEffect(() => {
        const loadHoaxes = async (page) => {
            try {
                const response = await getHoaxes(username, page);
                setHoaxPage((previousHoaxPage => {
                    return {
                        ...response.data,
                        content: [...previousHoaxPage.content, ...response.data.content]
                    }
                }));
            } catch (error) { }
        }
        loadHoaxes();
    }, [username]);

    const loadOldHoaxes = async () => {
        try {
            const response = await getOldHoaxes(username, lastHoaxId);
            setHoaxPage((previousHoaxPage => {
                return {
                    ...response.data,
                    content: [...previousHoaxPage.content, ...response.data.content]
                }
            }));
        } catch (error) { }
    }

    const loadNewHoaxes = async () => {
        try {
            const response = await getNewHoaxes(username, firstHoaxId);
            setHoaxPage((previousHoaxPage => {
                return {
                    ...previousHoaxPage,
                    content: [...response.data, ...previousHoaxPage.content]
                }
            }));
            setNewHoaxCount(0);
        } catch (error) { }
    }

    const onDeleteHoaxSuccess = id => {
        setHoaxPage( previousHoaxPage => ({
            ...previousHoaxPage,
            content: previousHoaxPage.content.filter( hoax => hoax.id !== id)
        }));
    }

    if (content.length === 0) {
        return (
            <div className='alert alert-secondary text-center'>{InitialPendingApiCall ? <Spinner /> : t('There are no hoaxes')} </div>
        );
    }


    return (
        <div>
            {newHoaxCount > 0 &&
                <div
                    className='alert alert-secondary text-center mb-2'
                    onClick={newHoaxesPendingApiCall ? () => { } : loadNewHoaxes}
                    style={{ cursor: newHoaxesPendingApiCall ? 'not-allowed' : 'pointer' }}

                >
                    {newHoaxesPendingApiCall ? <Spinner /> : t('Load new hoaxes')}
                </div>
            }



            {content.map((hoax) => {
                return (
                    <HoaxView hoax={hoax} key={hoax.id} onDeleteHoax={onDeleteHoaxSuccess}/>
                );
            })}



            {!last &&
                <div
                    className='alert alert-secondary text-center'
                    onClick={oldHoaxesPendingApiCall ? () => { } : loadOldHoaxes}
                    style={{ cursor: oldHoaxesPendingApiCall ? 'not-allowed' : 'pointer' }}

                >
                    {oldHoaxesPendingApiCall ? <Spinner /> : t('Load old hoaxes')}
                </div>}

        </div>
    );
};

export default HoaxFeed;