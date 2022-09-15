import React, { useState } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useTranslation } from 'react-i18next';
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from 'react-redux';
import { signupHandler } from "../redux/AuthActions";

const UserSignupPage = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    const pendingApiCallSignup = useApiProgress("post", "/api/1.0/users");
    const pendingApiCallLogin = useApiProgress("post", "/api/1.0/auth");
    const pendingApiCall = pendingApiCallLogin || pendingApiCallSignup;

    const [formState, setFormState] = useState({
        username: undefined,
        displayName: undefined,
        password: undefined,
        passwordRepeat: undefined
    });

    const [errorState, setErrorState] = useState({});

    const onChangeState = event => {

        const { name, value } = event.target;
        const errors = { ...errorState };
        errors[name] = undefined;


        if (name === "password" || name === "passwordRepeat") {
            if (name === "password" && value !== formState.passwordRepeat) {
                errors.passwordRepeat = t('Password Mismatch');
            } else if (name === "passwordRepeat" && value !== formState.password) {
                errors.passwordRepeat = t('Password Mismatch');
            } else {
                errors.passwordRepeat = undefined;
            }
        }
        /* Kopyasını alıp değiştirip sonra Orjinalini setlemek (Yukardaki errors örneği gibi) yerine tek satırda yapabiliriz. 
        const formCopy = { ...formState };
        formCopy[name] = value;
        setFormState(formCopy);*/

        setFormState((previousFormState) => ({ ...previousFormState, [name]: value }));
        setErrorState(errors);
    };



    const onClickSignUp = async event => {

        event.preventDefault();// html'deki form uygulamasının kendi post isteği vardır onu devre dışı bıraktık. Axios ile kendimiz atacağız.
        const { history } = props;
        const { push } = history;
        const { username, displayName, password } = formState;
        const body = {
            username,
            displayName,
            password
        }

        //Bu try catch li yapının alternatifi aşağıda yorum satırı olarak bıraktım.
        try {
            await dispatch(signupHandler(body)); // Signup request
            push('/');
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrorState(error.response.data.validationErrors);
            }
        }

    }




    

    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('Sign Up')}</h1>

                <Input name="username" label={t('User name')} onChangeState={onChangeState} error={errorState.username}></Input>
                <Input name="displayName" label={t('Display name')} onChangeState={onChangeState} error={errorState.displayName}></Input>
                <Input name="password" label={t('Password')} onChangeState={onChangeState} error={errorState.password} type="password"></Input>
                <Input name="passwordRepeat" label={t('Password Repeat')} onChangeState={onChangeState} error={errorState.passwordRepeat} type="password"></Input>

                <div className="text-center">
                    <ButtonWithProgress
                        onClick={onClickSignUp}
                        disabled={pendingApiCall || errorState.passwordRepeat !== undefined}
                        pending={pendingApiCall}
                        text={t('Sign Up')}
                    />
                </div>

            </form>
        </div>
    );

}
// onClick={ () => this.onChangeLanguage('en')}  Parametreli şekilde yazmak için fonklu yazmamız lazım onun için () => yaptık.

export default UserSignupPage;

// this.state.pendingApiCall && <span className="spinner-border spinner-border-sm" />
// Yani sol doğruysa sağ çalışsın. Bunun alternatifi =>
// this.state.pendingApiCall ? <span className="spinner-border spinner-border-sm" /> : ''
// Budur. (Kısa if gibi)