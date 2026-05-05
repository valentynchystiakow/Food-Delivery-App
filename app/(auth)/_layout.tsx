// imports components
import {Image, KeyboardAvoidingView, Platform, ScrollView, View, Dimensions, ImageBackground} from 'react-native'

// imports libraries
import React from 'react'
import {Redirect,Slot} from "expo-router";

// imports assets
import {images} from "@/constants";

// imports custom hook(store)
import useAuthStore from "@/store/auth.store";


// creates and exports _Layout component
export default function AuthLayout() {

    // defines user authentication state using useAuthStore hook
    const { isAuthenticated } = useAuthStore();

    // redirects to a home screen if a user is authenticated
    if(isAuthenticated) return <Redirect href="/" />

    return (
        // Wraps the auth screen content to avoid keyboard overlapping
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {/* Wraps auth screen components with a scrollable container */}
            <ScrollView className="bg-white h-full " keyboardShouldPersistTaps="handled">
                <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25}}>
                    {/* Background image component*/}
                    <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode="stretch" />
                    {/* Logo component*/}
                    <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10" />
                </View>
                <Slot/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
