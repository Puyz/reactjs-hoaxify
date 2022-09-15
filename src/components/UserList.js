import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/ApiCalls';
import { useTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
import { useApiProgress } from '../shared/ApiProgress'
import Spinner from './Spinner';

const UserList = () => {
    const [page, setPage] = useState({
        content: [],
        number: 0
    });
    const [loadFailure, setLoadFailure] = useState(false);
    const { content: users, first, last } = page;
    const { t } = useTranslation();
    const pendingApiCall = useApiProgress('get', '/api/1.0/users?page');


    useEffect(() => {
        loadUsers();
    }, []); // koşul kısmına boş array verirsek 1 kere (componentDidMount) çalışır. koşullu olsaydı ek olarak update de çalışırdı.

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    }
    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    }

    const loadUsers = async (page) => {
        setLoadFailure(false);
        try {
            const response = await getUsers(page);
            setPage(response.data);
        } catch (error) {
            setLoadFailure(true);
        }

    }

    let prevNextAction = (
        <div className='m-2'>
            {first === false && <button className='btn btn-primary float-start' onClick={onClickPrevious}>{`< ${t('Previous')}`}</button>}
            {last === false && <button className='btn btn-primary float-end' onClick={onClickNext}>{`${t('Next')} >`}</button>}
        </div>
    );
    if (pendingApiCall) {
        prevNextAction = (
            <Spinner/>
        );
    }  

    return (
        <div className='card'>
            <h3 className='card-header text-center'>{t('Users')}</h3>
            <div className='list-group'>
                {users.map((user) => (
                    <UserListItem user={user} key={user.username} />
                ))}
            </div>

            {prevNextAction}
            {loadFailure && <div className='text-center text-danger'>{t('Load Failure')}</div>}
        </div>
    );
}

export default UserList;