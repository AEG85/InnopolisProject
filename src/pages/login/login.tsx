import React from 'react'
import './styles.css'
import { InputText } from '../../components/input-text'

export const Login = () => {
    return (
        <>     
            <div className="conteiner" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Соаздайте пользователя</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span> */}
                        <InputText type="text" placeholder="Введите логин" />
                        <InputText type="email" placeholder="Введите Email" />
                        <InputText 
                            type="text" 
                            placeholder="Введите пароль"
                            // onChange={(event: any) => handleChangePass1(event)}
                        />
                        <InputText 
                            type="text" 
                            placeholder="Введите пароль повторно" 
                            // onChange={(event: any) => handleChangePass2(event)}
                        />
                        {/* {isPassError && <div style={{color: 'red'}}>Пароли не совпадают</div>} */}
                        <button>Регистрация</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}
                        {/* <span>or use your account</span> */}
                        <InputText 
                            type="email" 
                            placeholder="Email"
                            // onChange={(e: any) => handleChangeLogin(e)}
                            // value={userName}
                        />
                        <InputText type="password" placeholder="Password" />
                        <a href="#">Забыли пароль</a>
                        <button
                            // onClick={handleClickSend}
                        >Sign In</button>
                    </form>
                </div>
                <div className="overlay-container right-panel-active">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button 
                                // onClick={handleClickSign}
                                className="ghost" id="signIn">
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button 
                                className="ghost" 
                                id="signUp"
                                // onClick={handleClickSign}
                            >Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}