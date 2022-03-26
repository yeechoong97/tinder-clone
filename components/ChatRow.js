import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-rn'
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import firestore from '@react-native-firebase/firestore'

const ChatRow = ({ matchDetails }) => {

    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user])

    useEffect(() => {
        const sub = firestore().collection('matches').doc(matchDetails.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapShot => setLastMessage(snapShot.docs[0]?.data()?.message));
    }, [matchDetails])

    return (
        <TouchableOpacity
            style={tw("flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg")}
            onPress={() =>
                navigation.navigate("Message", { matchDetails })
            }
        >
            <Image style={[tw("rounded-full h-16 w-16 mr-4"), styles.cardShadow]}
                source={{ uri: matchedUserInfo?.photoURL }}
            />
            <View>
                <Text style={tw("text-lg font-bold")}>
                    {matchedUserInfo?.displayName}
                </Text>
                <Text>{lastMessage || "Say Hi!"}</Text>
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

