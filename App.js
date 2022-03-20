import React from 'react';
import tw from 'tailwind-rn';
import {
    SafeAreaView,
    View,
    Button
} from 'react-native';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';


const App = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <StackNavigator />
            </AuthProvider>
        </NavigationContainer>
    );
};



export default App;
