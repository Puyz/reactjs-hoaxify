import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutHandler } from '../redux/AuthActions';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const TopBar = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { username, displayName, image, isLoggedIn } = useSelector((store) => {
        return {
            isLoggedIn: store.isLoggedIn,
            username: store.username,
            displayName: store.displayName,
            image: store.image
        };
    });

    const onLogoutSuccess = () => {
        dispatch(logoutHandler());
    }

    const menuArea = useRef(null);

    const [menuVisible, setMenuVisible] = useState(false);
    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return () => {
            document.removeEventListener('click', menuClickTracker);
        }
    }, [isLoggedIn]);

    const menuClickTracker = event => {
        if (menuArea.current === null || !menuArea.current.contains(event.target)) {
            setMenuVisible(false);
        }
    }
    const onClickMenu = () => {
        if (menuVisible) {
            setMenuVisible(false);
        } else {
            setMenuVisible(true);
        }
    }

    let links = (  // if is nonLogin
        <ul className='navbar-nav'>
            <li>
                <Link className='nav-link' to='/login'> {t('Login')} </Link>
            </li>
            <li>
                <Link className='nav-link' to='/signup'> {t('Sign Up')} </Link>
            </li>
        </ul>
    );

    if (isLoggedIn) { // if is Login
        let dropdownClass = "dropdown-menu";
        if (menuVisible) {
            dropdownClass += " show";
        }
        links = (
            <ul className='navbar-nav' ref={menuArea} style={{ userSelect: 'none' }}>
                <li className="nav-item dropdown">
                    <div className='d-flex' style={{ cursor: 'pointer' }} onClick={onClickMenu}>
                        <ProfileImageWithDefault image={image} width='32' height='32' className='rounded-circle m-auto' />
                        <span className='nav-link dropdown-toggle'>{displayName}</span>
                    </div>
                    <div className={dropdownClass}>
                        <Link className='dropdown-item d-flex' to={`/user/${username}`} onClick={() => setMenuVisible(false)}>
                            <i className="material-icons me-2 text-info">person</i>
                            {t('My Profile')}
                        </Link>
                        <Link className='dropdown-item d-flex' to='/' onClick={onLogoutSuccess}>
                            <i className="material-icons me-2 text-danger">power_settings_new</i>
                            {t('Logout')}
                        </Link>

                    </div>
                </li>

            </ul>
        );
    }
    return (
        <div className='mb-4'>
            <nav className="navbar bg-light navbar-expand">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width='60' alt='hoaxify' />
                        Hoaxify Social
                    </Link>
                    {links}
                </div>
            </nav>
        </div>

    );
}

export default TopBar;
