import { createStore, applyMiddleware, compose } from 'redux';
import authReducer from './AuthReducer';
import SecureLS from 'secure-ls'; // Secure Local Storage
import thunk from 'redux-thunk';
import { setAuthorizationHeader } from '../api/ApiCalls';

const secureLs = new SecureLS();

const getStateFromLocalStorage = () => {
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        password: undefined,
        image: undefined
    }

    const getStateInLocalStorage = secureLs.get('auth'); // localStorage.getItem('auth'); yerine Secure kullanacağız.

    if (getStateInLocalStorage) {
        stateInLocalStorage = getStateInLocalStorage;
    }
    return stateInLocalStorage;
}

const updateStateInStorage = newState => {
    secureLs.set('auth', newState);
    //localStorage.setItem('auth', JSON.stringify(newState));
}

const configureStore = () => {
    /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    parametresi,  chrome'daki redux eklentisini aktif etmek için. */
    /* applyMiddleware(thunk) sayesinde AuthActions login işlemi yaparken middlleware hatası veriyor gidermek için.  */

    //composeEnhancers Redux eklentisi için -> applyMiddleware ve eklenti aynanda kullanabilmek için composeEnhancers kullanıyoruz.
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const initialState = getStateFromLocalStorage();
    setAuthorizationHeader(initialState);
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

    // Redux sayesinde State (Store) değiştiği an bu callback fonksiyonu çalışır. Bu sayese Local Storage 'da güncel şekilde tutabiliriz.
    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    });

    return store;
}

export default configureStore;