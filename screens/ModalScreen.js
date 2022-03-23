import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { useNavigation } from '@react-navigation/native';
import firestore from "@react-native-firebase/firestore";

const ModalScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const incompleteForm = !image || !job || !age;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "Update your profile",
            headerStyle: {
                backgroundColor: "#FF5864",
            },
            headerTitleStyle: {
                color: "white"
            },
        })
    })

    const updateUserProfile = async () => {
        firestore().collection("users").doc(user.uid).set({
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            job: job,
            age: age,
            timestamp: firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            navigation.navigate("Home");
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <View style={tw("flex-1 items-center pt-1 ")}>
            <Image style={tw("h-20 w-full")}
                resizeMode="contain"
                source={{ uri: "https://links.papareact.com/2pf" }}
            />
            <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
                Welcome {user.displayName}
            </Text>

            <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step 1: The Profile Pic
            </Text>
            <TextInput
                value={image}
                onChangeText={setImage}
                style={tw("text-center text-xl pb-2")}
                placeholder="Enter your profile pic url" />

            <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step 2: The Job
            </Text>
            <TextInput
                value={job}
                onChangeText={setJob}
                style={tw("text-center text-xl pb-2")}
                placeholder="Enter your job" />

            <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step 1: The Age
            </Text>
            <TextInput
                value={age}
                onChangeText={setAge}
                style={tw("text-center text-xl pb-2")}
                placeholder="Enter your age"
                maxLength={2}
                keyboardType="numeric"
            />

            <TouchableOpacity
                disabled={incompleteForm}
                onPress={updateUserProfile}
                style={[tw("w-64 p-3 rounded-xl absolute bottom-10"), incompleteForm ? tw("bg-gray-400") : tw("bg-red-400")]}>
                <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalScreen

const styles = StyleSheet.create({})