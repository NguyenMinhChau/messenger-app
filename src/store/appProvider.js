import { useReducer } from 'react';
import reducer, { initialState } from './reducer';
import AppContext from './createContext';

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
