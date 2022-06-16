import React from 'react';
import clsx from 'clsx';
import { provider, auth } from '../../firebase';
import { useAppMessageHook } from '../../customHooks';
import { payloads } from '../../store';
import styles from './Signin.module.css';

function Signin() {
    const { dispatch } = useAppMessageHook();
    const handleSigin = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider)
            .then((result) => {
                if (result) {
                    dispatch(payloads.setUserName(result.user));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={`${clsx(styles.signin_container)}`}>
            <div className={`${clsx(styles.signin_logo_messenger)}`}>
                <img src='/images/messenger-logo.svg' alt='logo_messenger' />
            </div>
            <h5 className={`${clsx(styles.signin_text)}`}>Messenger App</h5>
            <button
                className={`${clsx(styles.signin_button)}`}
                onClick={handleSigin}
            >
                <img
                    src='https://img.icons8.com/color/48/undefined/google-logo.png'
                    alt='google_logo'
                />
                <span>Sign in with Google</span>
            </button>
        </div>
    );
}

export default Signin;
