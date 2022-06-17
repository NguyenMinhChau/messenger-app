/* eslint-disable no-useless-escape */
/* eslint-disable no-useless-concat */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import clsx from 'clsx';
import ReactPlayer from 'react-player';
import MenuList from './MenuList';
import ModalViewer from './ModalViewer';
import { useAppMessageHook } from '../../customHooks';
import { payloads } from '../../store';
import { getFiles } from './getDataFile';
import styles from './ContentMessage.module.css';

function ContentMessageRight({ message }) {
    const { state, dispatch } = useAppMessageHook();
    const { status, urlCurrent, files } = state.toogleViewer;
    const { toogleMenuList, idMessageMenuList, toogleEditCancel } = state;
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
    const handleSetMeunList = (id) => {
        dispatch(payloads.setIdMessageMenuList(id));
        dispatch(payloads.setToogleMenuList());
    };
    return (
        <div className={`${clsx(styles.content_message_item_container_user2)}`}>
            <p className={`${clsx(styles.content_message_hours_user2)}`}>
                {message.timestamp && message.timestamp}
            </p>
            <div
                className={`${clsx(
                    styles.content_message_item_content_messenger_user2
                )}`}
            >
                <div
                    className={`${clsx(
                        styles.content_message_item_left_container_user2
                    )}`}
                >
                    {message.message && (
                        <div
                            className={`${clsx(
                                styles.content_message_item_content_container_user2
                            )}`}
                        >
                            <p
                                className={`${clsx(
                                    styles.content_message_text_container_user2
                                )}`}
                            >
                                {message.message &&
                                    message.message
                                        .split(' ')
                                        .map((item, index) => {
                                            if (
                                                item.startsWith('http://') ||
                                                item.startsWith('https://') ||
                                                item.endsWith('.com') ||
                                                item.endsWith('.net') ||
                                                item.endsWith('.org') ||
                                                item.endsWith('.edu') ||
                                                item.endsWith('.gov') ||
                                                item.endsWith('.vn')
                                            ) {
                                                return (
                                                    <a
                                                        key={index}
                                                        href={item}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={`${clsx(
                                                            styles.link_message_user2
                                                        )} mr-1 ml-1`}
                                                    >
                                                        {item}
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
                            styles.content_message_file_container_user2
                        )}`}
                    >
                        {/* IMAGE */}
                        {dataImageFiles &&
                            dataImageFiles.map((file, index) => {
                                return (
                                    <div
                                        className={`${clsx(
                                            styles.content_message_file_item_user2
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
                                                styles.content_message_file_item_image_user2
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
                                            styles.content_message_file_item_user2
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
                                                styles.content_message_file_item_video_user2
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
                                            styles.content_message_file_item_file_user2
                                        )}`}
                                        key={index}
                                    >
                                        <div
                                            className={`${clsx(
                                                styles.file_container_user2
                                            )}`}
                                        >
                                            <div
                                                className={`${clsx(
                                                    styles.file_top_user2
                                                )}`}
                                            >
                                                <span>{file.url}</span>
                                            </div>
                                            <div
                                                className={`${clsx(
                                                    styles.file_bottom_user2
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
                <div
                    className={`${clsx(
                        styles.content_message_item_avartar_user2
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
                {!toogleEditCancel && (
                    <div className={`${clsx(styles.user2_more_button)}`}>
                        <i
                            className='fa-solid fa-ellipsis-vertical'
                            onClick={() => handleSetMeunList(message.id)}
                        ></i>
                        {toogleMenuList && idMessageMenuList === message.id && (
                            <div className={`${clsx(styles.user2_menu_list)}`}>
                                <MenuList idMessage={idMessageMenuList} />
                            </div>
                        )}
                    </div>
                )}
            </div>
            {status && <ModalViewer files={files} urlCurrent={urlCurrent} />}
        </div>
    );
}

export default ContentMessageRight;
