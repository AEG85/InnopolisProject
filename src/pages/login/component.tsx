import React, { useState } from 'react'
import { InputText } from '../../components/input-text';
import './styles.css';


export const Login: React.FC = () => {

    const [isSign, setSign] = useState<boolean>(false)
    const [userLoginAuth, setUserLoginAuth] = useState<string>('')
    const [userPassAuth, setUserPassAuth] = useState<string>('')
    const [userLogin, setUserLogin] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userPass1, setUserPass1] = useState<string>('')
    const [userPass2, setUserPass2] = useState<string>('')
    const [isDisableReg, setDisableReg] = useState<boolean>(true)
    const [isPassError, setPassError] = useState<boolean>(false)
    const [isEmailError, setEmailError] = useState<boolean>(false)

    const handleChangeLoginAuth = (event: any) => {
        let regexp = /[^a-zA-Z0-9]/gi
        let value = event.target.value;
        value = value.replace(regexp, '');
        setUserLoginAuth(value)
    }
    const handleChangePassAuth = (event: any) => {
        let regexp = /[^a-z]/gi
        let value = event.target.value;
        value = value.replace(regexp, '');
        setUserPassAuth(value);
    }

    const handleChangePass1 = (event: any) => {
        let regexp = /[^a-z]/gi
        let value = event.target.value;
        value = value.replace(regexp, '');


        if (userPass2 !== value) {
            setPassError(true)
            if (!isEmailError) {
                setDisableReg(false)
            }
        } else {
            setDisableReg(true)
            setPassError(false)
        }

        setUserPass1(value)
    }

    const handleChangePass2 = (event: any) => {
        let regexp = /[^a-z]/gi
        let value = event.target.value;
        value = value.replace(regexp, '');


        if (userPass1 !== event.target.value) {
            setPassError(true)
            if (!isEmailError) {
                setDisableReg(false)
            }
        } else {
            setDisableReg(true)
            setPassError(false)
        }

        setUserPass2(value)
    }

    const handleClickSign = () => {
        setSign(!isSign)
    }

    const handleChangeLogin = (e: any) => {
        let regexp = /[^a-zA-Z0-9]/gi
        let value = e.target.value;
        value = value.replace(regexp, '');
        setUserLogin(value)
    }

    const handleChangeEmail = (e: any) => {
        setUserEmail(e.target.value)

        if (e.target.value.includes('@', 1)) {
            setEmailError(false)
            if (!isPassError) {
                setDisableReg(true)
            }
        } else {
                setDisableReg(false)
                setEmailError(true)
        }
    }

    const handleClickLogin = () => {
        fetch("http://localhost:4040/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                login: userLogin,
                password: userPass1
            })
        })
    }

    const handleClickAuth = () => {
        fetch(`http://localhost:4040/user?login=${userLoginAuth}&password=${userPassAuth}`, {}).then(result => {
            console.log(result)
        })
    }

    const rightPanelActive = isSign ? 'container right-panel-active' : 'container'

    return (
        <>
            <div className="container-fluid bg-primary px-0 px-md-5 mb-5">
                <div className="row align-items-center px-3 py-5">
                    <div className="col-lg-12 text-center text-lg-left">
                        <h1 className="display-3 font-weight-bold text-white text-center">
                            Авторизация / Регистрация
                        </h1>
                    </div>
                </div>
            </div>


            <div className={rightPanelActive} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Создайте профиль</h1>
                        <InputText type="text"
                            onChange={(event: any) => handleChangeLogin(event)}
                            placeholder="Введите логин"
                            value={userLogin}
                        />
                        <InputText
                            type="email"
                            onChange={(event: any) => handleChangeEmail(event)}
                            placeholder="Введите Email"
                            value={userEmail}
                        />
                        {isEmailError && <div style={{ color: 'red' }}>Email должен содержать символ @</div>}
                        <InputText
                            type="password"
                            placeholder="Введите пароль"
                            onChange={(event: any) => handleChangePass1(event)}
                            value={userPass1}
                        />
                        <InputText
                            type="password"
                            placeholder="Введите пароль повторно"
                            onChange={(event: any) => handleChangePass2(event)}
                            value={userPass2}
                        />
                        {isPassError && <div style={{ color: 'red' }}>Пароли не совпадают</div>}
                        <button
                            disabled={!isDisableReg}
                            onClick={handleClickLogin}
                        >Регистрация</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Авторизация</h1>
                        <InputText
                            type="text"
                            placeholder="login"
                            onChange={(e: any) => handleChangeLoginAuth(e)}
                            value={userLoginAuth}
                        />
                        <InputText
                            type="password"
                            placeholder="Password"
                            onChange={(e: any) => handleChangePassAuth(e)}
                            value={userPassAuth}
                        />
                        <button
                            onClick={handleClickAuth}
                        >Авторизоваться</button>
                    </form>
                </div>
                <div className="overlay-container right-panel-active">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Добро пожаловать!</h1>
                            <p>Для использования нашего сервиса вам необходимо авторизоваться</p>
                            <button
                                onClick={handleClickSign}
                                className="ghost" id="signIn">
                                Авторизоваться
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Привет!</h1>
                            <p>Зарегистрируйтесь, чтобы использовать наш сервис</p>
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={handleClickSign}
                            >Регистрация</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}