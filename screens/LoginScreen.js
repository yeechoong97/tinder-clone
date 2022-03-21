import { Button, View, Text } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import tw from "tailwind-rn";
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';


const LoginScreen = () => {

    const { signInWithGoogle, loading } = useAuth();

    return (
        <View>
            <Text>{loading ? "Loading..." : "Login to the app"}</Text>
            <GoogleSigninButton onPress={signInWithGoogle} />
        </View>
    )
}

export default LoginScreen
