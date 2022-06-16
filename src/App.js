import { useEffect } from 'react';
import { useAppMessageHook } from './customHooks';
import { payloads } from './store';
import {
    FormMessage,
    ContentMessage,
    LogoMessenger,
    Signin,
    NoSupport,
} from './components';
import './App.css';
import { auth, db } from './firebase';

function App() {
    const { state, dispatch } = useAppMessageHook();
    const { user } = state.inputMessage;
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(payloads.setUserName(user));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        db.collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    dispatch(
                        payloads.addListMessage({
                            id: doc.id,
                            ...doc.data(),
                        })
                    );
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className='app'>
                {user ? (
                    <>
                        {' '}
                        <LogoMessenger />
                        <ContentMessage />
                        <FormMessage />
                    </>
                ) : (
                    <Signin />
                )}
            </div>
            <div className='app_mobile'>
                <NoSupport />
            </div>
        </>
    );
}

export default App;
