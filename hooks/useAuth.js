import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{ user: null }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
