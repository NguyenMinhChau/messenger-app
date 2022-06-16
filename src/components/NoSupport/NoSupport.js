import React from 'react';
import clsx from 'clsx';
import styles from './NoSupport.module.css';

function NoSupport() {
    return (
        <div className={`${clsx(styles.no_support_container)}`}>
            <div className={`${clsx(styles.no_support_logo_messenger)}`}>
                <img src='/images/messenger-logo.svg' alt='logo_messenger' />
            </div>
            <p className='text-center'>
                Rất tiếc. Ứng dụng chưa được hỗ trợ trên mobile 😥
            </p>
        </div>
    );
}

export default NoSupport;
