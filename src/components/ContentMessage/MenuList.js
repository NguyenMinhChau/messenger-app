import React from 'react';
import clsx from 'clsx';
import { db } from '../../firebase';
import { payloads } from '../../store';
import { useAppMessageHook } from '../../customHooks';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './MenuList.module.css';

function MenuList({ idMessage }) {
    const { dispatch } = useAppMessageHook();
    const handleDeleteItem = async () => {
        const isConfirmation = window.confirm(
            'Are you sure you want to delete this message?'
        );
        if (isConfirmation) {
            await db.collection('messages').doc(idMessage).delete();
            dispatch(payloads.deleteMessage(idMessage));
        }
    };
    const handleEditItem = () => {
        //lấy bài viết có idMessage
        dispatch(payloads.setToogleEditCancel(true));
        db.collection('messages')
            .doc(idMessage)
            .get()
            .then((doc) => {
                const data = doc.data();
                dispatch(
                    payloads.setMessage({
                        id: idMessage,
                        ...data,
                    })
                );
            });
    };
    return (
        <div
            className={`${clsx(styles.menu_list_container)}`}
            onClick={() => dispatch(payloads.setToogleMenuList())}
        >
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                component='nav'
            >
                <ListItemButton onClick={handleDeleteItem}>
                    <ListItemIcon className='text-danger'>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary='Delete' className='text-danger' />
                </ListItemButton>
                <ListItemButton onClick={handleEditItem}>
                    <ListItemIcon className='text-primary'>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary='Edit' className='text-primary' />
                </ListItemButton>
            </List>
        </div>
    );
}

export default MenuList;
