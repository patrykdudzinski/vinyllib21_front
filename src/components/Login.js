// pages/LoginPage.jsx
import { useState } from 'react';
import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { ajaxAction } from '../Mixins';

function LoginPage({ onLogin }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        ajaxAction('http://vinyl.dudzinski.com.pl/api/login', 
            {
                login: login,
                password: password
            }, 
            'POST'
        ).then(data => {
            if (data.error) {
                setLoginError(data.message)
                return;
            }
            onLogin();
            navigate('/');
        })
        .catch(ex => {
            setLoginError('Wystąpił błąd podczas logowania: ' + JSON.stringify(ex));
        })
    };

    return (
        <div className="App">
            <Header name="VinylLib22" setSearch = {false} get_list_fn = {null}></Header>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Podaj dane dostępowe żeby przejśc do biblioteki</h2>
                <div className="flex_box column">
                    <input
                        className="login-form__input"
                        type="text"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        className="login-form__input"
                        type="password"
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <p className={loginError ? 'error_label' : 'hidden'}>
                    {loginError}
                </p>

                <button type="submit" className="login-form__btn btn primary">
                    Zaloguj
                </button>
            </form>
        </div>
        
    );
}

export default LoginPage;
