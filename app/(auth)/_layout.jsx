import React from 'react'
import { Stack } from 'expo-router'
import { Image,Text, View ,ScrollView} from "react-native";
import { StatusBar } from "expo-status-bar";
const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{headerShown:false,}}>
        <Stack.Screen 
          name="sign-in"
          option={{
            headerShown:false,
          }}
        />
        <Stack.Screen 
          name="sign-up"
          option={{
            headerShown:false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622"  style="light"/>
    </>
  )
}

export default AuthLayout