import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import './styles.css';

export const Login: React.FC = () => {

    const [isSign, setSign] = useState<boolean>(false)

    const handleClickSign = () => {
        setSign(!isSign)
    }

    const rightPanelActive = isSign ? 'container right-panel-active' : 'container'

    type FormRegistrationValues = {
        login: string,
        email: string,
        password: string,
        confirmPassword: string
    }

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<FormRegistrationValues>();

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        fetch("http://localhost:4040/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                login: data.login,
                password: data.password
            })
        })
    })

    type FormAuthValues = {
        loginAuth: string,
        passwordAuth: string
    }

    const {
        register: registerAuth,
        handleSubmit: handleSubmitAuth,
        formState: { errors: errorsAuth }
    } = useForm<FormAuthValues>();

    const onSubmitAuth = handleSubmitAuth((data) => {
        fetch(`http://localhost:4040/user?login=${data.loginAuth}&password=${data.passwordAuth}`, {}).then(result => {
            console.log(result)
        })
    })

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

                    <form onSubmit={onSubmit}>
                        <h1>Создайте профиль</h1>
                        <input
                            type="text"
                            className="p-2 w-100 mx-0 my-2"
                            placeholder="Введите логин"
                            {...register(
                                "login",
                                {
                                    required: true,
                                    minLength: 5,
                                    maxLength: 20,
                                    pattern: /^[A-Za-z0-9]+$/i
                                })}
                        />
                        <input
                            type="text"
                            className="p-2 w-100 mx-0 my-2"
                            placeholder="Введите email"
                            {...register(
                                "email",
                                {
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                })}
                        />
                        <input
                            type="text"
                            className="p-2 w-100 mx-0 my-2"
                            placeholder="Введите пароль"
                            {...register(
                                "password",
                                {
                                    required: true,
                                    pattern: /^[a-z0-9_\-*]+$/i
                                })}
                        />
                        <input
                            type="text"
                            className="p-2 w-100 mx-0 my-2"
                            placeholder="Введите пароль"
                            {...register(
                                "confirmPassword",
                                {
                                    required: true,
                                    pattern: /^[a-z0-9_\-*]+$/i,
                                    validate: (val: string) => {
                                        if (watch('password') !== val) {
                                            return "пароли не совпадают"
                                        }
                                    }
                                })}
                        />
                        <button type="submit">Регистрация</button>

                        {errors.login && errors.login.type === 'minLength' && (
                            <p className="alert p-2 border-danger border border-4 rounded-2">
                                Минимальная длина "Логина" 5 символов.
                            </p>
                        )}
                        {errors.login && errors.login.type === 'maxLength' && (
                            <p className="alert p-2 border-danger border border-4 rounded-2">
                                Максимальная длина "Логина" 20 символов.
                            </p>
                        )}
                        {errors.login && errors.login.type === 'pattern' && (
                            <p className="alert p-2 border-danger border border-4 rounded-2">
                                Поле "Логин" может состоять только из английских символов плюс цифры.
                            </p>
                        )}
                        {errors.login && errors.login.type === 'required' && (
                            <p className="alert my-2 p-2 border-danger border border-4 rounded-2">
                                Поле "Логин" обязательное.
                            </p>
                        )}
                        {errors.email && errors.email.type === 'required' && (
                            <p className="alert my-2 p-2 border-danger border border-4 rounded-2">
                                Поле "Email" обязательное.
                            </p>
                        )}
                        {errors.email && errors.email.type === 'pattern' && (
                            <p className="alert my-2 p-2 border-danger border border-4 rounded-2">
                                Поле "Email" некорректно.
                            </p>
                        )}
                        {errors.password && errors.password.type === 'required' && (
                            <p className="alert my-2 p-2 border-danger border border-4 rounded-2">
                                Поле "Пароль" обязательное.
                            </p>
                        )}
                        {errors.password && errors.password.type === 'pattern' && (
                            <p className="alert my-2 p-2 border-danger border border-4 rounded-2">
                                Поле "Пароль" некорректно заполнено, доступы только не прописные английские буквы + <br />спец символы (_ , - , *).
                            </p>
                        )}
                        {errors.confirmPassword && errors.confirmPassword.type === 'pattern' && (
                            <p className="alert my-2 p-2 border-danger border border-4 rounded-2">
                                Поле "Пароль" некорректно заполнено, доступы только не прописные английские буквы + <br />спец символы (_ , - , *).
                            </p>
                        )}
                        {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
                            <p className="alert my-2 p-2 border-danger border border-4 rounded-2">
                                Пароли не совпадают.
                            </p>
                        )}
                    </form>

                </div>
                <div className="form-container sign-in-container">

                    <form onSubmit={onSubmitAuth}>
                        <h1>Авторизация</h1>
                        <input
                            type="text"
                            className="p-2 w-100 mx-0 my-2"
                            placeholder="Введите логин"
                            {...registerAuth(
                                "loginAuth",
                                {
                                    required: true,
                                    minLength: 5,
                                    maxLength: 20,
                                    pattern: /^[A-Za-z0-9]+$/i
                                })}
                        />
                        <input
                            type="text"
                            className="p-2 w-100 mx-0 my-2"
                            placeholder="Введите пароль"
                            {...registerAuth(
                                "passwordAuth",
                                {
                                    required: true,
                                    pattern: /^[a-z0-9_\-*]+$/i
                                })}
                        />
                        <button type="submit">Авторизоваться</button>

                        {errorsAuth.loginAuth && errorsAuth.loginAuth.type === 'minLength' && (
                            <p className="alert p-2 border-danger border border-4 rounded-2">
                                Минимальная длина "Логина" 5 символов.
                            </p>
                        )}
                        {errorsAuth.loginAuth && errorsAuth.loginAuth.type === 'maxLength' && (
                            <p className="alert p-2 border-danger border border-4 rounded-2">
                                Максимальная длина "Логина" 20 символов.
                            </p>
                        )}
                        {errorsAuth.loginAuth && errorsAuth.loginAuth.type === 'pattern' && (
                            <p className="alert p-2 border-danger border border-4 rounded-2">
                                Поле "Логин" может состоять только из английских символов плюс цифры.
                            </p>
                        )}
                        {errorsAuth.loginAuth && errorsAuth.loginAuth.type === 'required' && (
                            <p className="alert my-2 p-2 border-danger border border-4 rounded-2">
                                Поле "Логин" обязательное.
                            </p>
                        )}
                        {errorsAuth.passwordAuth && errorsAuth.passwordAuth.type === 'required' && (
                            <p className="alert my-2 p-2 border-danger border border-4 rounded-2">
                                Поле "Пароль" обязательное.
                            </p>
                        )}
                        {errorsAuth.passwordAuth && errorsAuth.passwordAuth.type === 'pattern' && (
                            <p className="alert my-2 p-2 border-danger border border-4 rounded-2">
                                Поле "Пароль" некорректно заполнено, доступы только не прописные английские буквы + <br />спец символы (_ , - , *).
                            </p>
                        )}

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