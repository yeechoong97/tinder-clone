import { Button, View } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import tw from "tailwind-rn";
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {

    GoogleSignin.configure({ webClientId: '695871154935-rrhvn41cv23kms0etqpec9gbrqrdhv1b.apps.googleusercontent.com' });

    async function onGoogleButtonPress() {

        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            return auth().signInWithCredential(googleCredential);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
        </View>
    )
}

export default LoginScreen
