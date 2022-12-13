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

            if(error.message.includes('email-already-in-use'))
                systemErrorMessage = 'O e-mail utilizado já está cadastrado. Faça login ou utilize outro e-mail.';

            if(error.message.includes('invalid-email'))
                systemErrorMessage = 'Por favor, digite um e-mail válido';

            if(!systemErrorMessage)
                systemErrorMessage = 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!'

            setError(systemErrorMessage);
            setLoading(false);
        }
    }

    const login = async(data) => {
        checkIfIsCancellled();
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            setLoading(false);
        } catch (error) {
            console.log(error.message);
            let systemErrorMessage;

            if(error.message.includes('user-not-found') || error.message.includes('wrong-password'))
                systemErrorMessage = 'Usuário ou senha incorreta.';

            if(!systemErrorMessage)
                systemErrorMessage = 'Ocorreu um erro inesperado, por favor tente novamente mais tarde!'
            
            setError(systemErrorMessage);
            setLoading(false);
        }
    }

    const logOut = () => {
        checkIfIsCancellled();
        signOut(auth);
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { auth, createUser, error, loading, logOut, login };
}