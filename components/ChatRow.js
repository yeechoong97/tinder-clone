import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-rn'
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';

const ChatRow = ({ matchDetails }) => {

    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user])

    return (
        <TouchableOpacity style={tw("flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg")}>
            <Image style={[tw("rounded-full h-16 w-16 mr-4"), styles.cardShadow]}
                source={{ uri: matchedUserInfo?.photoURL }}
            />
            <View>
                <Text style={tw("text-lg font-bold")}>
                    {matchedUserInfo?.displayName}
                </Text>
                <Text>Say Hi!</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatRow

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    }
})

