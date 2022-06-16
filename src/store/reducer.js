import moment from 'moment';
import {
    SET_MESSAGE,
    ADD_LIST_MESSAGE,
    TOOGLE_EMOJI,
    ON_CLICK_EMOJI,
    SET_USER_NAME,
    SET_PROGRESS,
    SET_TOOGLE_MODAL_VIEWER,
    SET_TOOGLE_MENU_LIST,
    SET_ID_MESSAGE_MENU_LIST,
    SET_TOOGLE_CANCEL_EDIT,
    SET_INFO_UPDATE,
    SET_COLOR_THEME,
    DELETE_MESSAGE,
    UPDATE_MESSAGE,
} from './actions';

const initialState = {
    inputMessage: {
        message: '',
        file: [],
        chosenEmoji: null,
        user: null,
        timestamp: moment(new Date().toISOString()).format('DD/MM/YYYY HH:mm'),
    },
    messages: [],
    messagesUser: [],
    messagesGuest: [],
    toggleEmoji: false,
    progress: 0,
    toogleViewer: {
        status: false,
        urlCurrent: '',
        files: [],
    },
    toogleMenuList: false,
    idMessageMenuList: '',
    toogleEditCancel: false,
    infoUpdate: false,
    colorTheme: {
        id: 35,
        color: 'rgb(0, 153, 255)',
    },
};
const setMessage = (payload) => {
    return {
        type: SET_MESSAGE,
        payload,
    };
};
const addListMessage = (payload) => {
    return {
        type: ADD_LIST_MESSAGE,
        payload,
    };
};
const toggleEmoji = (payload) => {
    return {
        type: TOOGLE_EMOJI,
        payload,
    };
};
const onClickEmoji = (payload) => {
    return {
        type: ON_CLICK_EMOJI,
        payload,
    };
};
const setUserName = (payload) => {
    return {
        type: SET_USER_NAME,
        payload,
    };
};
const setProgress = (payload) => {
    return {
        type: SET_PROGRESS,
        payload,
    };
};
const setToogleModalViewer = (payload) => {
    return {
        type: SET_TOOGLE_MODAL_VIEWER,
        payload,
    };
};
const setToogleMenuList = (payload) => {
    return {
        type: SET_TOOGLE_MENU_LIST,
        payload,
    };
};
const setIdMessageMenuList = (payload) => {
    return {
        type: SET_ID_MESSAGE_MENU_LIST,
        payload,
    };
};
const setToogleEditCancel = (payload) => {
    return {
        type: SET_TOOGLE_CANCEL_EDIT,
        payload,
    };
};
const setInfoUpdate = (payload) => {
    return {
        type: SET_INFO_UPDATE,
        payload,
    };
};
const setColorTheme = (payload) => {
    return {
        type: SET_COLOR_THEME,
        payload,
    };
};
const deleteMessage = (payload) => {
    return {
        type: DELETE_MESSAGE,
        payload,
    };
};
const updateMessage = (payload) => {
    return {
        type: UPDATE_MESSAGE,
        payload,
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                inputMessage: {
                    ...state.inputMessage,
                    ...action.payload,
                },
            };
        case ADD_LIST_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case TOOGLE_EMOJI:
            return {
                ...state,
                toggleEmoji: !state.toggleEmoji,
            };
        case ON_CLICK_EMOJI:
            return {
                ...state,
                inputMessage: {
                    ...state.inputMessage,
                    chosenEmoji: action.payload.emojiObject,
                    message:
                        state.inputMessage.message +
                        action.payload.emojiObject.emoji,
                },
            };
        case SET_USER_NAME:
            return {
                ...state,
                inputMessage: {
                    ...state.inputMessage,
                    user: action.payload,
                },
            };
        case SET_PROGRESS:
            return {
                ...state,
                progress: action.payload,
            };
        case SET_TOOGLE_MODAL_VIEWER:
            return {
                ...state,
                toogleViewer: {
                    ...state.toogleViewer,
                    ...action.payload,
                },
            };
        case SET_TOOGLE_MENU_LIST:
            return {
                ...state,
                toogleMenuList: !state.toogleMenuList,
            };
        case SET_ID_MESSAGE_MENU_LIST:
            return {
                ...state,
                idMessageMenuList: action.payload,
            };
        case SET_TOOGLE_CANCEL_EDIT:
            return {
                ...state,
                toogleEditCancel: action.payload,
            };
        case SET_INFO_UPDATE:
            return {
                ...state,
                infoUpdate: action.payload,
            };
        case SET_COLOR_THEME:
            return {
                ...state,
                colorTheme: {
                    ...state.colorTheme,
                    ...action.payload,
                },
            };
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(
                    (message) => message.id !== action.payload
                ),
            };
        case UPDATE_MESSAGE:
            return {
                ...state,
                messages: state.messages.map((message) => {
                    if (message.id === action.payload.id) {
                        return {
                            ...message,
                            ...action.payload,
                        };
                    }
                    return message;
                }),
            };
        default:
            return state;
    }
};
export {
    setMessage,
    addListMessage,
    toggleEmoji,
    onClickEmoji,
    setUserName,
    setProgress,
    initialState,
    setToogleModalViewer,
    setToogleMenuList,
    setIdMessageMenuList,
    setToogleEditCancel,
    setInfoUpdate,
    setColorTheme,
    deleteMessage,
    updateMessage,
};
export default reducer;
