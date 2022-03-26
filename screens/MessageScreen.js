import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import useAuth from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native';
import tw from "tailwind-rn"
import ReceiverMessage from '../components/ReceiverMessage'
import SenderMessage from '../components/SenderMessage'
import firestore from "@react-native-firebase/firestore"

const MessageScreen = () => {

    const { user } = useAuth();
    const { params } = useRoute();
    const { matchDetails } = params;

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        firestore().collection("matches").doc(matchDetails.id).collection("messages").add({
            timestamp: firestore.FieldValue.serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            photoURL: matchDetails.users[user.uid].photoURL,
            message: input
        });
        setInput("");
    };

    useEffect(() => {
        const sub = firestore().collection("matches").doc(matchDetails.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapShot => {
            setMessages(snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        });

        return () => sub();
    }, [matchDetails])

    return (
        <SafeAreaView style={tw('flex-1')}>
            <Header
                title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
                callEnabled
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={tw("flex-1")}
                keyboardVerticalOffset={10}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={messages}
                        style={tw("pl-4")}
                        inverted={-1}
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) =>
                            message.userId == user.uid ? (
                                <SenderMessage key={message.id} message={message} />
                            ) : (
                                <ReceiverMessage key={message.id} message={message} />
                            )
                        }
                    />
                </TouchableWithoutFeedback>
                <View style={tw("flex-row justify-between items-center border-t border-gray-200 px-5 py-2 bg-white")}>
                    <TextInput
                        style={tw("h-10 text-lg")}
                        placeholder="Send Message..."
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                    />
                    <Button title="Send" color="#FF5864" onPress={sendMessage} />
                </View>
            </KeyboardAvoidingView>


        </SafeAreaView >
    )
}

export default MessageScreen

const styles = StyleSheet.create({})