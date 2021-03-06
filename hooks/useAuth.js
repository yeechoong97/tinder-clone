import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() =>
        auth().onAuthStateChanged((user) => {
            user ? setUser(user) : setUser(null);
            setLoadingInitial(false);
        }), []);

    GoogleSignin.configure({ webClientId: '695871154935-rrhvn41cv23kms0etqpec9gbrqrdhv1b.apps.googleusercontent.com', scopes: ['https://www.googleapis.com/auth/user.gender.read', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/user.addresses.read'] });

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const currentUser = await GoogleSignin.getCurrentUser();
            return auth().signInWithCredential(googleCredential);
        }
        catch (error) {
            console.error(error);
        }
        finally { () => setLoading(false) }
    }

    const signOut = async () => {
        try {
            setLoading(true);
            await GoogleSignin.signOut();
            await auth().signOut()
        }
        catch (error) {
            console.error(error);
        }
        finally { () => setLoading(false) }
    }

    const memoedValue = useMemo(() => ({
        user, loading, signInWithGoogle, signOut
    }), [user, loading])

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
