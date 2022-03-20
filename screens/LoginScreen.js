import { Button, View } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import tw from "tailwind-rn";
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';


const LoginScreen = () => {

    const { signInWithGoogle } = useAuth();

    return (
        <View>
            <GoogleSigninButton onPress={signInWithGoogle} />
        </View>
    )
}

export default LoginScreen
