import { Image, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-rn';
import Icon from 'react-native-ionicons'

const HomeScreen = () => {
    const navigation = useNavigation();
    const { signOut, user } = useAuth();
    return (
        <SafeAreaView>
            {/* Header */}
            <View style={tw("flex-row items-center justify-between px-5")}>
                <TouchableOpacity onPress={signOut}>
                    <Image style={tw("h-10 w-10 rounded-full")} source={{ uri: user.photoURL }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require("../logo.png")} style={tw("h-14 w-14")} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="chatbubbles" size={35} color="#FF5864" />
                </TouchableOpacity>
            </View>


            {/* End of Header */}

            {/* <Text>HomeScreen</Text>
            <Button
                title="Go to Chat Screen"
                onPress={() => navigation.navigate('Chat')}
            />
            <Button title="Sign out" onPress={signOut} /> */}
        </SafeAreaView>
    );
};

export default HomeScreen;
