import { db } from '../firebase/config';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancellled(){
        if(cancelled)
            return
    }
    
    const createUser = async(data) => {
        checkIfIsCancellled();
        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false);
            return user;

        } catch (error) {         
            console.log(error.message);
            let systemErrorMessage;

            if(error.message.includes('Password'))
                systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.';

            setError(systemErrorMessage);
            
        }

        setLoading(false);
    }

    const logOut = () => {
        checkIfIsCancellled();
        signOut(auth);
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { auth, createUser, error, loading, logOut };
}