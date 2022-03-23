import { Image, Text, View, Button, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-rn';
import Icon from 'react-native-ionicons'
import Swiper from 'react-native-deck-swiper';

const DUMMY_DATA = [
    {
        firstName: 'John',
        lastName: 'Cena',
        occupation: 'Wrestler',
        photoURL: 'https://static01.nyt.com/images/2021/05/25/multimedia/25xp-johncena/25xp-johncena-mobileMasterAt3x.jpg',
        age: 26,
        id: 123
    },
    {
        firstName: 'Tony',
        lastName: 'Stark',
        occupation: 'Ironman',
        photoURL: 'https://www.cheatsheet.com/wp-content/uploads/2019/06/RDJ-Tony-Stark.jpg',
        age: 27,
        id: 456,
    },
    {
        firstName: 'James',
        lastName: 'Bond',
        occupation: 'Assassin',
        photoURL: 'https://static.wikia.nocookie.net/p__/images/d/dc/James_Bond_%28Pierce_Brosnan%29_-_Profile.jpg/revision/latest?cb=20140815021440&path-prefix=protagonist',
        age: 28,
        id: 789
    },

]

const HomeScreen = () => {
    const navigation = useNavigation();
    const { signOut, user } = useAuth();
    const swipeRef = useRef(null);

    return (
        <SafeAreaView style={tw("flex-1")}>
            {/* Header */}
            <View style={tw("flex-row items-center justify-between px-5")}>
                <TouchableOpacity onPress={signOut}>
                    <Image style={tw("h-10 w-10 rounded-full")} source={{ uri: user.photoURL }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
                    <Image source={require("../logo.png")} style={tw("h-14 w-14")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Icon name="chatbubbles" size={35} color="#FF5864" />
                </TouchableOpacity>
            </View>
            {/* End of Header */}

            {/* Cards */}
            <View style={tw("flex-1 -mt-6")}>
                <Swiper
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: "transparent" }}
                    cards={DUMMY_DATA}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={() => { console.log("SWIPE PASS") }}
                    onSwipedRight={() => { console.log("SWIPE MATCh") }}
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },
                        right: {
                            title: "MATCH",
                            style: {
                                label: {
                                    color: "#4DED30"
                                },
                            },
                        },
                    }}
                    renderCard={card =>
                        <View key={card.id}
                            style={tw("bg-white h-3/4 rounded-xl relative")}
                        >
                            <Image style={tw("h-full w-full top-0 rounded-xl absolute")} source={{ uri: card.photoURL }} />

                            <View style={[tw("flex-row justify-between items-center bg-white absolute bottom-0 w-full h-20 px-6 py-2 rounded-b-xl"), styles.cardShadow]}>
                                <View>
                                    <Text style={tw("text-xl font-bold")}>{card.firstName} {card.lastName}</Text>
                                    <Text>{card.occupation}</Text>
                                </View>
                                <View>
                                    <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                                </View>
                            </View>
                        </View>
                    } />
            </View>
            <View style={tw("flex flex-row justify-evenly py-5")}>
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={tw("items-center justify-center rounded-full w-16 h-16 bg-red-200")}>
                    <Icon name="close" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                    style={tw("items-center justify-center rounded-full w-16 h-16 bg-green-200")}>
                    <Icon name="heart" size={24} color="green" />
                </TouchableOpacity>
            </View>
            {/* End of Cards */}
        </SafeAreaView >
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    }
})