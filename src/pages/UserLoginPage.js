import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useTranslation } from 'react-i18next';
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { loginHandler } from '../redux/AuthActions';

const UserLoginPage = (props) => {
    const { t } = useTranslation(); // propstaki t yi artık hooksdan alıyoruz. ve HoC yapısına gerek kalmıyor.
    const pendingApiCall = useApiProgress("post", "/api/1.0/auth");
    const dispatch = useDispatch();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    // useEffect, 1. parametre çalışacak fonksiyon 2. parametre hangilerinde etki olursa çalışsın diye belirtiyoruz.
    useEffect(() => { setError(undefined) }, [username, password]);

    const buttonEnabled = (username && password);

    /*state = {
        username: null,
        password: null,
        errorMessage: null,
        errors: {}
    }*/



    /*const onChangeState = event => {
        const { name, value } = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;

        this.setState({
            [name]: value,
            errors,
            errorMessage: null
        });
    }
*/
    const onClickLogin = async event => {
        event.preventDefault();
        const { history } = props;
        const { push } = history;
        const creds = {
            username,
            password
        }
        //this.setState({ errorMessage: null });

        try {
            /* const response = await loginRequest(creds);
            const authState = {
                ...response.data,   // response un datasından gelen username display name vs. aldık passwordu almadık çünkü hashlı gelir onu bu sayfadan çekiyoruz.
                password
            }
            dispatch(loginSuccessAction(authState));*/
            await dispatch(loginHandler(creds));
            push('/');
        } catch (apiError) {

            if (apiError.response.data.validationErrors) {
                setError(apiError.response.data.validationErrors);
                //this.setState({ errors: apiError.response.data.validationErrors });
            }

            if (apiError.response.data.message) {
                setError(apiError.response.data.message);
                // this.setState({ errorMessage: apiError.response.data.message });
            }
        }
    }

    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('Login')}</h1>

                <Input name="username" label={t('User name')} onChangeState={(event) => { setUsername(event.target.value) }} />
                <Input name="password" label={t('Password')} type="password" onChangeState={(event) => { setPassword(event.target.value) }}></Input>

                <div className="text-center">
                    <ButtonWithProgress
                        onClick={onClickLogin}
                        disabled={pendingApiCall || !buttonEnabled}
                        pending={pendingApiCall}
                        text={t('Login')}
                        
                    />

                    {error && <div className="alert alert-danger mt-5">{error}</div>}

                </div>

            </form>
        </div>

    );
}

/* 
Bu şekilde HoC (High order Component) yapısı yerine i18 in bize sunduğu Hooksu kullanacağız. 
const userLoginPageWithTranslation = withTranslation()(UserLoginPage); 

Connectin 1.parametresi redux state  2. parametresi state ile oynayacağımız metod gibi düşünebiliriz. 
ve bunları props'a ekliyor.
Connecti dispatchi almak için kullanıyoruz fakat hooks ile direk alabiliriz ve connect HoC yapısına gerek kalmıyor.
export default connect()(userLoginPageWithApiProgress);
*/
export default UserLoginPage;