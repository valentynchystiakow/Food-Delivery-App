// imports components
import {View, Text, Alert} from 'react-native'
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
// imports libraries
import React from 'react'
import {Link, router} from 'expo-router'
// imports hooks
import {useState} from 'react'
// imports functions
import {signIn} from "@/lib/appwrite";
// imports Sentry
import * as Sentry from "@sentry/react-native";


// creates and exports SignIn component
const SignIn = () => {

    // hooks section

    // uses useState hook for submitting form
    const [isSubmitting, setIsSubmitting] = useState(false);

    // uses useState hook for managing form
    const [form,setForm] = useState({
        email: "",
        password: ""
    })

    // creates async form submit function
    const submit = async () => {

        // destructures form data
        const {email, password} = form;

        // if email or password is empty shows an error message
        if(!email || !password ) return Alert.alert("Error", 'Please enter valid email address and password.')

        // changes isSubmitting state to true
        setIsSubmitting(true)

        // try catch block to handle errors while submitting a form
        try {

            // uses signIn function to sign in a user using data from form
            await signIn({email,password})

            Alert.alert('Success', 'You have successfully signed in')
            // redirects to a home page after a successful signin
            router.replace('/');
        } catch(error: any) {
            Alert.alert('Error', error.message);
            // uses Sentry to capture errors
            Sentry.captureException(error);
        }
        // in any case changes isSubmitting state to false
        finally {
            setIsSubmitting(false);
        }

    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            {/* Input Email and Password Components */}
            <CustomInput
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
                label="Email"
                keyboardType="email-address"
            />
            <CustomInput
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
                label="Password"
                secureTextEntry={true}
            />

            {/* SignIn Button */}
            <CustomButton
                title="Sign In"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                {/* Link to sign up*/}
                <Text className="base-regular text-gray-100">
                    Don't have an account?
                </Text>
                <Link href="/sign-up" className="base-bold text-primary">
                    Sign Up
                </Link>
            </View>
        </View>

    )
}
export default SignIn
