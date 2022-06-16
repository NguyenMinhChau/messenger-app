import { useContext } from 'react';
import { AppContext } from '../store';

export const useAppMessageHook = () => {
    const { state, dispatch } = useContext(AppContext);
    return { state, dispatch };
};
