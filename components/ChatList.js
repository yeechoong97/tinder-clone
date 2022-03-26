import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-rn'
import firestore from '@react-native-firebase/firestore';
import useAuth from '../hooks/useAuth';
import ChatRow from '../components/ChatRow';

const ChatList = () => {

    const [matches, setMatches] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const sub = firestore().collection('matches').where('userMatched', 'array-contains', user.uid).onSnapshot(snapShot => setMatches(
            snapShot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                })
            )));

        return () => sub();
    }, [user]);


    return (
        matches.length > 0 ? (
            <FlatList
                style={tw('h-full')}
                data={matches}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ChatRow matchDetails={item} />}
            />
        ) : (
            <View style={tw("p-5")}>
                <Text style={tw("text-center text-lg")}>No Matches at the moment 😢</Text>
            </View>
        )
    )

}

export default ChatList
