/* eslint-disable no-useless-escape */
/* eslint-disable no-useless-concat */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import clsx from 'clsx';
import ReactPlayer from 'react-player';
import ModalViewer from './ModalViewer';
import { useAppMessageHook } from '../../customHooks';
import { payloads } from '../../store';
import { getFiles } from './getDataFile';
import styles from './ContentMessage.module.css';

function ContentMessageLeft({ message }) {
    const { state, dispatch } = useAppMessageHook();
    const { status, urlCurrent, files } = state.toogleViewer;
    const dataImageFiles = [...getFiles(message).dataImageFiles];
    const dataVideoFiles = [...getFiles(message).dataVideoFiles];
    const dataApplicationFiles = [...getFiles(message).dataApplicationFiles];
    const handleFileViewer = (e) => {
        const url = e.target.style.backgroundImage
            .replace('url(', '')
            .replace(')', '')
            .replace(/\"/gi, '');
        dispatch(
            payloads.setToogleModalViewer({
                status: true,
                urlCurrent: url,
                files: dataImageFiles.map((file) => file.url),
            })
        );
    };
    return (
        <div className={`${clsx(styles.content_message_item_container_user1)}`}>
            <p className={`${clsx(styles.content_message_hours_user1)}`}>
                {message.timestamp && message.timestamp}
            </p>
            <div
                className={`${clsx(
                    styles.content_message_item_content_messenger_user1
                )}`}
            >
                <div
                    className={`${clsx(
                        styles.content_message_item_avartar_user1
                    )}`}
                >
                    <img
                        onError={(e) => {
                            e.target.src = '/images/messenger-logo.svg';
                        }}
                        src={message.user.image ? message.user.image : ''}
                        alt='avatar_user'
                        className={`${clsx(styles.content_message_avatar)}`}
                        title={message.user.name && message.user.name}
                    />
                </div>
                <div
                    className={`${clsx(
                        styles.content_message_item_content_container_user1
                    )}`}
                >
                    {message.message && (
                        <div
                            className={`${clsx(
                                styles.content_message_text_container_user1
                            )}`}
                        >
                            <p
                                className={`${clsx(
                                    styles.content_message_text_user1
                                )}`}
                            >
                                {message.message &&
                                    message.message
                                        .split(' ')
                                        .map((item, index) => {
                                            if (
                                                item.includes('http') ||
                                                item.includes('https') ||
                                                item.includes('www') ||
                                                item.includes('.com.vn') ||
                                                item.includes('.gov.vn') ||
                                                item.includes('.edu.vn') ||
                                                item.includes('.net.vn') ||
                                                item.includes('.org.vn') ||
                                                item.includes('.info.vn') ||
                                                item.includes('.biz.vn') ||
                                                item.includes('.name.vn') ||
                                                item.includes('.pro.vn') ||
                                                item.includes('.ac.vn') ||
                                                item.includes('.com') ||
                                                item.includes('.net') ||
                                                item.includes('.org') ||
                                                item.includes('.info') ||
                                                item.includes('.biz') ||
                                                item.includes('.name') ||
                                                item.includes('.pro') ||
                                                item.includes('.ac') ||
                                                item.includes('.edu') ||
                                                item.includes('.gov') ||
                                                item.includes('.vn')
                                            ) {
                                                return (
                                                    <a
                                                        key={index}
                                                        href={item}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={`${clsx(
                                                            styles.link_message_user1
                                                        )}`}
                                                    >
                                                        {item + ' '}
                                                    </a>
                                                );
                                            }
                                            return item + ' ';
                                        })}
                            </p>
                        </div>
                    )}
                    <div
                        className={`${clsx(
                            styles.content_message_file_container_user1
                        )}`}
                    >
                        {/* IMAGE */}
                        {dataImageFiles &&
                            dataImageFiles.map((file, index) => {
                                return (
                                    <div
                                        className={`${clsx(
                                            styles.content_message_file_item_user1
                                        )} ${
                                            dataImageFiles.length === 1 &&
                                            dataVideoFiles.length === 0
                                                ? 'w-100'
                                                : ''
                                        }`}
                                        key={index}
                                    >
                                        <div
                                            className={`${clsx(
                                                styles.content_message_file_item_image_user1
                                            )}`}
                                            style={{
                                                backgroundImage:
                                                    'url(' +
                                                    `${file.url}` +
                                                    ')',
                                            }}
                                            onClick={handleFileViewer}
                                        ></div>
                                    </div>
                                );
                            })}
                        {/* VIDEO */}
                        {dataVideoFiles &&
                            dataVideoFiles.map((file, index) => {
                                return (
                                    <div
                                        className={`${clsx(
                                            styles.content_message_file_item_user1
                                        )} ${
                                            dataVideoFiles.length === 1 &&
                                            dataImageFiles.length === 0
                                                ? 'w-100'
                                                : ''
                                        }`}
                                        key={index}
                                    >
                                        <ReactPlayer
                                            url={`${file.url}`}
                                            className={`${clsx(
                                                styles.content_message_file_item_video_user1
                                            )}`}
                                            controls={true}
                                        />
                                    </div>
                                );
                            })}
                        {/* FILE PDF/EXCEL/WORD */}
                        {dataApplicationFiles &&
                            dataApplicationFiles.map((file, index) => {
                                return (
                                    <a
                                        href={`${file.url}`}
                                        target='_blank'
                                        className={`${clsx(
                                            styles.content_message_file_item_file_user1
                                        )}`}
                                        key={index}
                                    >
                                        <div
                                            className={`${clsx(
                                                styles.file_container_user1
                                            )}`}
                                        >
                                            <div
                                                className={`${clsx(
                                                    styles.file_top_user1
                                                )}`}
                                            >
                                                <span>{file.url}</span>
                                            </div>
                                            <div
                                                className={`${clsx(
                                                    styles.file_bottom_user1
                                                )}`}
                                            >
                                                {file.name}
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                    </div>
                </div>
            </div>
            {status && <ModalViewer files={files} urlCurrent={urlCurrent} />}
        </div>
    );
}

export default ContentMessageLeft;
