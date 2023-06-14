import { useState, useEffect, useRef } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import useAuthContext from './useAuthContext';

export default function useLogin() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const [isCancelled, setIsCancelled] = useState(false);

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            const documentRef = projectFirestore.collection('users').doc(res.user.uid);
            await documentRef.update({ online: true });

            if (!isCancelled) {
                dispatch({ type: 'LOGIN', payload: res.user });
                setIsPending(false);
                setError(null);
            }
        } 
        catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        setIsCancelled(false)
        return () => {
            setIsCancelled(true)
        };
    }, []);

    return { login, isPending, error };
    }
