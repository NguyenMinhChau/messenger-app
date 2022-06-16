/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-useless-concat */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useAppMessageHook } from '../../customHooks';
import ContentMessageLeft from './ContentMessageLeft';
import ContentMessageRight from './ContentMessageRight';
import styles from './ContentMessage.module.css';

function ContentMessage() {
    const { state } = useAppMessageHook();
    const { messages } = state;
    const { user } = state.inputMessage;
    const unique = (arr, comp) => {
        const unique = arr
            .map((e) => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i);
        return unique.map((e) => arr[e]);
    };
    const datas = unique(messages, 'id').filter((item) => item);
    useEffect(() => {
        const containerMessage = document.querySelector(
            '.content_message_container'
        );
        containerMessage.scrollTop = containerMessage.scrollHeight;
    }, [messages]);
    return (
        <div
            className={`${clsx(
                styles.content_message_container
            )} content_message_container`}
        >
            {datas.length > 0 ? (
                datas.map((message, index) => {
                    if (message.user.uid === user.uid) {
                        return (
                            <ContentMessageRight
                                key={index}
                                message={message}
                            />
                        );
                    } else {
                        return (
                            <ContentMessageLeft key={index} message={message} />
                        );
                    }
                })
            ) : (
                <div className={`${clsx(styles.no_message_container)}`}>
                    <h5 className={`${clsx(styles.no_message_text)}`}>
                        Bắt đầu trò chuyện nào{' '}
                        <span>
                            <i
                                className='bx bxl-messenger bx-tada'
                                style={{ color: '#046edb' }}
                            ></i>
                        </span>
                    </h5>
                </div>
            )}
        </div>
    );
}

export default ContentMessage;
