import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { signOut } = useAuth();

    return (
        <View>
            <Text>HomeScreen</Text>
            <Button
                title="Go to Chat Screen"
                onPress={() => navigation.navigate('Chat')}
            />
            <Button title="Sign out" onPress={signOut} />
        </View>
    );
};

export default HomeScreen;
