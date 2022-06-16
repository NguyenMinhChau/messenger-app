/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable array-callback-return */
import React, { useRef } from 'react';
import clsx from 'clsx';
import { Input, IconButton, TextareaAutosize } from '@mui/material';
import moment from 'moment';
import ReactPlayer from 'react-player';
import Picker from 'emoji-picker-react';
import { db, storage } from '../../firebase';
import { useAppMessageHook } from '../../customHooks';
import { payloads } from '../../store';
import styles from './FormMessage.module.css';

function FormMessage() {
    const { state, dispatch } = useAppMessageHook();
    const { message, file, user, timestamp } = state.inputMessage;
    const { progress, toogleEditCancel, infoUpdate } = state;
    const refTextArea = useRef();
    const idRamdom = () => {
        const id1 = Math.random().toString(36).substr(2, 6);
        const id2 = Math.random().toString(36).substr(2, 6);
        const id3 = Math.random().toString(36).substr(2, 6);
        const id4 = new Date().toISOString();
        const id5 = new Date().getTime();
        return `${id1}_${id2}_${id3}_${id4}_${id5}`;
    };
    const handleChange = (e) => {
        const filesType = [...state.inputMessage.file];
        const files = e.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                filesType.push(files[i]);
            }
        }
        dispatch(
            payloads.setMessage({
                ...state.inputMessage,
                [e.target.name]: e.target.value,
                file: filesType,
            })
        );
    };
    const handleSend = async (e) => {
        e.preventDefault();
        if (message || file.length > 0) {
            const id = idRamdom();
            const promisesFiles = [];
            await file.map((item) => {
                const uploadTask = storage
                    .ref(`files/${item.type}/${id}/${item.name}`)
                    .put(item);
                promisesFiles.push(uploadTask);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progressLoad =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        dispatch(payloads.setProgress(progressLoad));
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            });
            await Promise.all(promisesFiles).then((urls) => {
                const promisesData = [];
                promisesFiles.map((item) => {
                    const objectData = {
                        url: item.snapshot.ref.getDownloadURL(),
                        type: item.snapshot.metadata.contentType,
                        name: item.snapshot.metadata.name,
                    };
                    promisesData.push(objectData);
                });
                Promise.all(promisesData).then((data) => {
                    const promiseURL = [];
                    const promiseFileTypeName = [];
                    promisesData.map((item, index) => {
                        promiseURL.push(item.url);
                        promiseFileTypeName.push({
                            type: item.type,
                            name: item.name,
                        });
                    });
                    Promise.all(promiseURL).then((urls) => {
                        const dataFiles = [];
                        urls.map((item, index) => {
                            dataFiles.push({
                                url: item,
                                type: promiseFileTypeName[index].type,
                                name: promiseFileTypeName[index].name,
                            });
                        });
                        db.collection('messages').add({
                            user: {
                                uid: user.uid,
                                name: user.displayName,
                                image: user.photoURL,
                                email: user.email,
                            },
                            message: message,
                            file: dataFiles,
                            timestamp: timestamp,
                        });
                    });
                });
            });
            // END
            dispatch(
                payloads.setMessage({
                    message: '',
                    chosenEmoji: null,
                    file: [],
                    timestamp: moment(new Date().toISOString()).format(
                        'DD/MM/YYYY HH:mm A'
                    ),
                })
            );
            dispatch(payloads.setProgress(0));
        } else {
            refTextArea.current.focus();
        }
    };
    const handleDeleteFile = (e, index) => {
        e.stopPropagation();
        const filesType = [...state.inputMessage.file];
        filesType.splice(index, 1);
        dispatch(
            payloads.setMessage({ ...state.inputMessage, file: filesType })
        );
    };
    const handleCancelEdit = (e) => {
        e.preventDefault();
        dispatch(
            payloads.setMessage({
                message: '',
                chosenEmoji: null,
                file: [],
                timestamp: moment(new Date().toISOString()).format(
                    'DD/MM/YYYY HH:mm A'
                ),
            })
        );
        dispatch(payloads.setToogleEditCancel(false));
    };
    const handleUpdateMessage = async (e) => {
        e.preventDefault();
        dispatch(payloads.setInfoUpdate(true));
        dispatch(payloads.addListMessage(state.inputMessage));
        const id = idRamdom();
        const promisesFiles = [];
        const promisesFilesHTTPS = [];
        await file.map((item) => {
            if (!item.url) {
                const uploadTask = storage
                    .ref(`files/${item.type}/${id}/${item.name}`)
                    .put(item);
                promisesFiles.push(uploadTask);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progressLoad =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        dispatch(payloads.setProgress(progressLoad));
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            } else {
                promisesFilesHTTPS.push(item);
            }
        });
        await Promise.all(promisesFiles).then((urls) => {
            const promisesData = [...promisesFilesHTTPS];
            promisesFiles.map((item) => {
                const objectData = {
                    url: item.snapshot.ref.getDownloadURL(),
                    type: item.snapshot.metadata.contentType,
                    name: item.snapshot.metadata.name,
                };
                promisesData.push(objectData);
            });
            Promise.all(promisesData).then((data) => {
                const promiseURL = [];
                const promiseFileTypeName = [];
                promisesData.map((item, index) => {
                    promiseURL.push(item.url);
                    promiseFileTypeName.push({
                        type: item.type,
                        name: item.name,
                    });
                });
                Promise.all(promiseURL).then((urls) => {
                    const dataFiles = [];
                    urls.map((item, index) => {
                        dataFiles.push({
                            url: item,
                            type: promiseFileTypeName[index].type,
                            name: promiseFileTypeName[index].name,
                        });
                    });
                    db.collection('messages')
                        .doc(state.inputMessage.id)
                        .set(
                            {
                                user: {
                                    email: state.inputMessage.user.email,
                                    name: state.inputMessage.user.name,
                                    image: state.inputMessage.user.image,
                                    uid: state.inputMessage.user.uid,
                                },
                                message: message,
                                file: dataFiles,
                                timestamp: timestamp,
                            },
                            { merge: true }
                        );
                });
            });
        });
        dispatch(payloads.updateMessage(state.inputMessage));
        dispatch(payloads.setProgress(0));
        dispatch(payloads.setInfoUpdate(false));
        handleCancelEdit(e);
    };
    return (
        <div className={`${clsx(styles.form_message_container)}`}>
            {progress === 0 ? (
                <>
                    <div className={`${clsx(styles.form_message)}`}>
                        <div className={`${clsx(styles.form_message_input)}`}>
                            <div
                                className={`${clsx(
                                    styles.text_area_container
                                )}`}
                            >
                                <TextareaAutosize
                                    minRows={1}
                                    maxRows={3}
                                    placeholder='Aa'
                                    value={message}
                                    onChange={handleChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSend(e);
                                        }
                                    }}
                                    name='message'
                                    ref={refTextArea}
                                />
                            </div>
                            <div className={`${clsx(styles.input_actions)}`}>
                                <label
                                    className={`${clsx(
                                        styles.input_button_icons
                                    )}`}
                                    onClick={() =>
                                        dispatch(payloads.toggleEmoji())
                                    }
                                >
                                    <IconButton
                                        component='span'
                                        style={{
                                            fontSize: '16px',
                                        }}
                                        className={`${clsx(styles.icon_color)}`}
                                    >
                                        <i className='fa-solid fa-face-smile'></i>
                                    </IconButton>
                                </label>
                                <label
                                    htmlFor='message-file'
                                    className={`${clsx(
                                        styles.input_button_file
                                    )}`}
                                >
                                    <Input
                                        accept='image/*,video/*,media/*, application/pdf, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,application/msword, application/vnd.ms-powerpoint, text/plain'
                                        id='message-file'
                                        type='file'
                                        style={{ display: 'none' }}
                                        inputProps={{ multiple: true }}
                                        name='file'
                                        onChange={handleChange}
                                    />
                                    <IconButton
                                        aria-label='upload picture'
                                        component='span'
                                        style={{
                                            fontSize: '16px',
                                        }}
                                        className={`${clsx(styles.icon_color)}`}
                                    >
                                        <i className='fa-solid fa-image'></i>
                                    </IconButton>
                                </label>
                            </div>
                            {state.toggleEmoji && (
                                <>
                                    <div
                                        className={`${clsx(
                                            styles.input_emoji_container
                                        )}`}
                                    >
                                        <Picker
                                            onEmojiClick={(e, emojiObject) => {
                                                dispatch(
                                                    payloads.onClickEmoji({
                                                        e,
                                                        emojiObject,
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                    s
                                    <div
                                        className={`${clsx(styles.flag)}`}
                                    ></div>
                                </>
                            )}
                        </div>
                        <button
                            className={`${clsx(styles.form_message_button)}`}
                            onClick={handleSend}
                        >
                            <i className='bx bxs-send'></i>
                        </button>
                        {toogleEditCancel && (
                            <>
                                <button
                                    className={`${clsx(
                                        styles.form_message_button_cancel
                                    )}`}
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`${clsx(
                                        styles.form_message_button_update
                                    )}`}
                                    onClick={handleUpdateMessage}
                                >
                                    Update
                                </button>
                            </>
                        )}
                    </div>
                    <div className={`${clsx(styles.preview_file_container)}`}>
                        {file.map((file, index) => {
                            if (file.type.includes('image')) {
                                return (
                                    <div
                                        className={`${clsx(
                                            styles.prview_file_image_container
                                        )}`}
                                        key={index}
                                    >
                                        <div
                                            className={`${clsx(
                                                styles.preivew_file_image
                                            )}`}
                                            style={{
                                                backgroundImage:
                                                    !toogleEditCancel
                                                        ? 'url(' +
                                                          `${
                                                              URL.createObjectURL(
                                                                  file
                                                              ) || file.url
                                                          }` +
                                                          ')'
                                                        : `url(${
                                                              file.url ||
                                                              `${URL.createObjectURL(
                                                                  file
                                                              )}`
                                                          })`,
                                            }}
                                        ></div>
                                        <span
                                            className={`${clsx(
                                                styles.preivew_close
                                            )}`}
                                            onClick={(e) =>
                                                handleDeleteFile(e, index)
                                            }
                                        >
                                            <i className='fa-solid fa-xmark'></i>
                                        </span>
                                    </div>
                                );
                            }
                            if (file.type.includes('video')) {
                                return (
                                    <div
                                        className={`${clsx(
                                            styles.prview_file_image_container
                                        )}`}
                                        key={index}
                                    >
                                        <ReactPlayer
                                            url={`${
                                                file.url ||
                                                `${URL.createObjectURL(file)}`
                                            }`}
                                            className={`${clsx(
                                                styles.preview_file_video
                                            )}`}
                                            controls={true}
                                        />
                                        <span
                                            className={`${clsx(
                                                styles.preivew_close
                                            )}`}
                                            onClick={(e) =>
                                                handleDeleteFile(e, index)
                                            }
                                        >
                                            <i className='fa-solid fa-xmark'></i>
                                        </span>
                                    </div>
                                );
                            }
                            if (file.type.includes('application')) {
                                return (
                                    <div
                                        className={`${clsx(
                                            styles.prview_file_image_container
                                        )}`}
                                        key={index}
                                    >
                                        <div
                                            className={`${clsx(
                                                styles.file_container
                                            )}`}
                                        >
                                            <div
                                                className={`${clsx(
                                                    styles.file_top
                                                )}`}
                                            >
                                                <span>{`${
                                                    !toogleEditCancel
                                                        ? URL.createObjectURL(
                                                              file
                                                          )
                                                        : file.url
                                                }`}</span>
                                            </div>
                                            <a
                                                href={`${
                                                    file.url ||
                                                    `${URL.createObjectURL(
                                                        file
                                                    )}`
                                                }`}
                                                style={{
                                                    display: 'inline-block',
                                                }}
                                                target='_blank'
                                                className={`${clsx(
                                                    styles.file_bottom
                                                )}`}
                                            >
                                                <span>
                                                    {file.name && file.name}
                                                </span>
                                            </a>
                                        </div>
                                        <span
                                            className={`${clsx(
                                                styles.preivew_close
                                            )}`}
                                            onClick={(e) =>
                                                handleDeleteFile(e, index)
                                            }
                                        >
                                            <i className='fa-solid fa-xmark'></i>
                                        </span>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </>
            ) : (
                <div className={`${clsx(styles.loading_container)}`}>
                    {progress <= 95 ? (
                        <>
                            <span className='mr-2 text_bold'>
                                Đang xử lý files...
                            </span>
                            <span className='loader'></span>
                        </>
                    ) : (
                        <>
                            <span className='mr-2 text_bold'>
                                {!infoUpdate
                                    ? 'Đang gửi...'
                                    : 'Đang cập nhật...'}
                            </span>
                            <span className='loader'></span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default FormMessage;
