import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import React, { useLayoutEffect } from 'react';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-rn';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View style={tw('flex-1')}>
            <ImageBackground
                resizeMode="cover"
                style={tw('flex-1')}
                source={{ uri: 'https://tinder.com/static/tinder.png' }}>
                <TouchableOpacity
                    style={[tw("absolute bottom-40 w-52 rounded-2xl bg-white p-4"), { marginHorizontal: "25%" },]}
                    onPress={signInWithGoogle}
                >
                    <Text style={tw("font-bold text-center")}>Sign in & Get Swiping</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default LoginScreen;
