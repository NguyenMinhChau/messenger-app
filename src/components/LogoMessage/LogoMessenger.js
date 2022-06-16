import React from 'react';
import clsx from 'clsx';
import LogoAccount from './LogoAccount';
import ColorsOption from './ColorsOption';
import { useAppMessageHook } from '../../customHooks';
import { payloads } from '../../store';
import { auth } from '../../firebase';
import styles from './LogoMessenger.module.css';

function LogoMessenger() {
    const { state, dispatch } = useAppMessageHook();
    const { user } = state.inputMessage;
    const handleSignout = (e) => {
        e.preventDefault();
        auth.signOut()
            .then(() => {
                dispatch(payloads.setUserName(''));
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={`${clsx(styles.logo_messenger_container)}`}>
            <div className={`${clsx(styles.logo_messenger_logo)}`}>
                <div className={`${clsx(styles.logo_messenger)} mb-2`}>
                    <img
                        src='/images/messenger-logo.svg'
                        alt='logo_messenger'
                    />
                </div>
                <h5 className={`${clsx(styles.logo_messenger_text)}`}>
                    Messenger App
                </h5>
            </div>
            <div className={`${clsx(styles.logo_messenger_button_container)}`}>
                <LogoAccount user={user} handleSignout={handleSignout} />
                <ColorsOption />
            </div>
        </div>
    );
}

export default LogoMessenger;
