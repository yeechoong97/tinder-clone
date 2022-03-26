import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-rn'
import Icon from 'react-native-ionicons'
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, callEnabled }) => {

    const navigation = useNavigation();

    return (
        <View style={tw('p-2 flex-row items-center justify-between')}>
            <View style={tw("flex flex-row items-center justify-between")}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw("p-3")}>
                    <Icon name="arrow-back" size={32} color="#FF5864" />
                </TouchableOpacity>
                <Text style={tw("text-2xl font-bold pl-2")}>{title}</Text>
            </View>

            {callEnabled && (
                <TouchableOpacity style={tw("rounded-full mr-4 p-3 bg-red-200")}>
                    <Icon name="call" size={20} color="red" />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Header
