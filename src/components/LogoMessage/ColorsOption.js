/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { db } from '../../firebase';
import { payloads } from '../../store';
import { useAppMessageHook } from '../../customHooks';
import styles from './LogoMessenger.module.css';

function ColorsOption() {
    const { state, dispatch } = useAppMessageHook();
    const { id, color } = state.colorTheme;
    const options = [
        {
            id: 1,
            name: 'Color 1',
            color: 'radial-gradient(circle at center 75%, rgb(255, 0, 24) 0%, rgb(255, 4, 23) 6%, rgb(255, 49, 14) 12%, rgb(255, 93, 6) 18%, rgb(255, 122, 1) 24%, rgb(255, 135, 1) 30%, rgb(255, 176, 1) 36%, rgb(217, 197, 7) 42%, rgb(121, 199, 24) 48%, rgb(1, 201, 45) 54%, rgb(1, 190, 105) 60%, rgb(1, 179, 170) 66%, rgb(11, 161, 223) 72%, rgb(63, 119, 230) 78%, rgb(114, 76, 236) 84%, rgb(138, 57, 239) 90%, rgb(138, 57, 239) 96%)',
        },
        {
            id: 2,
            name: 'Color 2',
            color: 'radial-gradient(circle at center 75%, rgb(130, 2, 2) 0%, rgb(152, 12, 12) 50%, rgb(163, 17, 17) 100%)',
        },
        {
            id: 3,
            name: 'Color 3',
            color: 'radial-gradient(circle at center 75%, rgb(147, 20, 16) 0%, rgb(147, 20, 16) 50%, rgb(147, 20, 16) 100%)',
        },
        {
            id: 4,
            name: 'Color 4',
            color: 'radial-gradient(circle at center 75%, rgb(170, 0, 255) 0%, rgb(0, 128, 255) 100%)',
        },
        {
            id: 5,
            name: 'Color 5',
            color: 'radial-gradient(circle at center 75%, rgb(202, 52, 255) 0%, rgb(48, 44, 255) 50%, rgb(186, 0, 156) 100%)',
        },
        {
            id: 6,
            name: 'Color 6',
            color: 'radial-gradient(circle at center 75%, rgb(0, 128, 255) 0%, rgb(159, 26, 255) 100%)',
        },
        {
            id: 7,
            name: 'Color 7',
            color: 'radial-gradient(circle at center 75%, rgb(246, 149, 0) 0%, rgb(218, 0, 80) 100%)',
        },
        {
            id: 8,
            name: 'Color 8',
            color: 'radial-gradient(circle at center 75%, rgb(241, 97, 78) 0%, rgb(102, 15, 132) 100%)',
        },
        {
            id: 9,
            name: 'Color 9',
            color: 'radial-gradient(circle at center 75%, rgb(219, 64, 64) 0%, rgb(163, 36, 36) 100%)',
        },
        {
            id: 10,
            name: 'Color 10',
            color: 'radial-gradient(circle at center 75%, rgb(37, 192, 225) 0%, rgb(206, 131, 42) 100%)',
        },
        {
            id: 11,
            name: 'Color 11',
            color: 'radial-gradient(circle at center 75%, rgb(74, 201, 228) 0%, rgb(88, 144, 255) 50%, rgb(140, 145, 255) 100%)',
        },
        {
            id: 12,
            name: 'Color 12',
            color: 'radial-gradient(circle at center 75%, rgb(255, 35, 154) 0%, rgb(255, 140, 33) 100%)',
        },
        {
            id: 13,
            name: 'Color 13',
            color: 'radial-gradient(circle at center 75%, rgb(0, 38, 238) 0%, rgb(0, 178, 255) 100%)',
        },
        {
            id: 14,
            name: 'Color 14',
            color: 'radial-gradient(circle at center 75%, rgb(255, 112, 97) 0%, rgb(255, 82, 128) 33%, rgb(160, 51, 255) 66%, rgb(0, 153, 255) 99%)',
        },
        {
            id: 15,
            name: 'Color 15',
            color: 'radial-gradient(circle at center 75%, rgb(0, 213, 47) 0%, rgb(0, 101, 40) 100%)',
        },
        {
            id: 16,
            name: 'Color 16',
            color: 'radial-gradient(circle at center 75%, rgb(0, 199, 211) 0%, rgb(54, 83, 232) 100%)',
        },
        {
            id: 17,
            name: 'Color 17',
            color: 'radial-gradient(circle at center 75%, rgb(140, 179, 255) 0%, rgb(64, 159, 255) 100%)',
        },
        {
            id: 18,
            name: 'Color 18',
            color: 'radial-gradient(circle at center 75%, rgb(255, 13, 158) 0%, rgb(249, 0, 90) 100%)',
        },
        {
            id: 19,
            name: 'Color 19',
            color: 'radial-gradient(circle at center 75%, rgb(0, 82, 205) 0%, rgb(0, 161, 230) 50%, rgb(0, 82, 205) 100%)',
        },
        {
            id: 20,
            name: 'Color 20',
            color: 'rgb(96, 96, 96)',
        },
        {
            id: 21,
            name: 'Color 21',
            color: 'radial-gradient(circle at center 75%, rgb(170, 0, 255) 0%, rgb(0, 128, 255) 100%)',
        },
        {
            id: 22,
            name: 'Color 22',
            color: 'radial-gradient(circle at center 75%, rgb(0, 95, 255) 0%, rgb(146, 0, 255) 50%, rgb(255, 46, 25) 100%)',
        },
        {
            id: 23,
            name: 'Color 23',
            color: 'radial-gradient(circle at center 75%, rgb(255, 143, 178) 0%, rgb(167, 151, 255) 50%, rgb(0, 229, 255) 100%)',
        },
        {
            id: 24,
            name: 'Color 24',
            color: 'radial-gradient(circle at center 75%, rgb(251, 69, 222) 0%, rgb(132, 29, 213) 50%, rgb(58, 29, 138) 100%)',
        },
        {
            id: 25,
            name: 'Color 25',
            color: 'radial-gradient(circle at center 75%, rgb(42, 127, 227) 0%, rgb(0, 191, 145) 50%, rgb(159, 213, 45) 100%)',
        },
        {
            id: 26,
            name: 'Color 26',
            color: 'radial-gradient(circle at center 75%, rgb(85, 0, 41) 0%, rgb(170, 50, 50) 50%, rgb(217, 169, 0) 100%)',
        },
        {
            id: 27,
            name: 'Color 27',
            color: 'radial-gradient(circle at center 75%, rgb(242, 92, 84) 0%, rgb(244, 132, 95) 50%, rgb(247, 178, 103) 100%)',
        },
        {
            id: 28,
            name: 'Color 28',
            color: 'radial-gradient(circle at center 75%, rgb(250, 175, 0) 0%, rgb(255, 46, 46) 50%, rgb(58, 18, 255) 100%)',
        },
        {
            id: 29,
            name: 'Color 29',
            color: 'radial-gradient(circle at center 75%, rgb(255, 210, 0) 0%, rgb(110, 223, 0) 50%, rgb(0, 223, 187) 100%)',
        },
        {
            id: 30,
            name: 'Color 30',
            color: 'radial-gradient(circle at center 75%, rgb(255, 98, 91) 0%, rgb(197, 50, 173) 50%, rgb(77, 62, 194) 100%)',
        },
        {
            id: 31,
            name: 'Color 31',
            color: 'radial-gradient(circle at center 75%, rgb(94, 0, 126) 0%, rgb(51, 18, 144) 50%, rgb(40, 37, 181) 100%)',
        },
        {
            id: 32,
            name: 'Color 32',
            color: 'rgb(255, 49, 30)',
        },
        {
            id: 33,
            name: 'Color 33',
            color: 'rgb(167, 151, 255)',
        },
        {
            id: 34,
            name: 'Color 34',
            color: 'rgb(251, 69, 222)',
        },
        {
            id: 35,
            name: 'Color 35',
            color: 'rgb(0, 153, 255)',
        },
        {
            id: 36,
            name: 'Color 36',
            color: 'rgb(170, 50, 50)',
        },
        {
            id: 37,
            name: 'Color 37',
            color: 'rgb(242, 92, 84)',
        },
        {
            id: 38,
            name: 'Color 38',
            color: 'rgb(250, 175, 0)',
        },
        {
            id: 39,
            name: 'Color 39',
            color: 'rgb(110, 223, 0)',
        },
        {
            id: 40,
            name: 'Color 40',
            color: 'rgb(77, 62, 194)',
        },
        {
            id: 41,
            name: 'Color 41',
            color: 'rgb(94, 0, 126)',
        },
    ];
    const ITEM_HEIGHT = 48;
    const [anchorElColor, setAnchorElColor] = React.useState(null);
    const openColor = Boolean(anchorElColor);
    const handleClickColor = (event) => {
        setAnchorElColor(event.currentTarget);
    };
    const handleSetThemeColor = (color, id) => {
        setAnchorElColor(null);
        dispatch(
            payloads.setColorTheme({
                id,
                color,
            })
        );
        db.collection('theme').doc('4TSwRpHRTmzzE0zwVQcC').set(
            {
                id,
                color,
            },
            { merge: true }
        );
    };
    useEffect(() => {
        var rootStyle = document.documentElement.style;
        db.collection('theme')
            .doc('4TSwRpHRTmzzE0zwVQcC')
            .onSnapshot((doc) => {
                if (doc.exists) {
                    rootStyle.setProperty(
                        '--color-primary',
                        `${doc.data().color}`
                    );
                    dispatch(
                        payloads.setColorTheme({
                            id: doc.data().id,
                            color: doc.data().color,
                        })
                    );
                }
            });
    }, [color]);
    return (
        <div>
            <IconButton
                aria-label='more'
                id='long-button'
                aria-controls={openColor ? 'long-menu' : undefined}
                aria-expanded={openColor ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleClickColor}
                className={`${clsx(styles.color_fill_icon)}`}
            >
                <i className='fa-solid fa-palette'></i>
            </IconButton>
            <Menu
                id='long-menu'
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorElColor}
                open={openColor}
                onClose={() => setAnchorElColor(null)}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <div className={`${clsx(styles.options_container)}`}>
                    {options.map((option, index) => (
                        <MenuItem
                            key={index}
                            className={`${clsx(
                                styles.logo_messenger_color_item,
                                `${
                                    id === option.id
                                        ? styles.logo_messenger_color_item_active
                                        : ''
                                }`
                            )}`}
                            onClick={() =>
                                handleSetThemeColor(option.color, option.id)
                            }
                        >
                            <div
                                className={`${clsx(
                                    styles.logo_messenger_color
                                )}`}
                                style={{
                                    backgroundImage: `${option.color}`,
                                    backgroundColor: `${option.color}`,
                                }}
                            ></div>
                        </MenuItem>
                    ))}
                </div>
            </Menu>
        </div>
    );
}

export default ColorsOption;
