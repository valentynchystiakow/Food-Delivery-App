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
import {createUser} from "@/lib/appwrite";


// creates and exports SignUp component
const SignUp = () => {

    // hooks section

    // uses useState hook for submitting form
    const [isSubmitting, setIsSubmitting] = useState(false);

    // uses useState hook for managing form
    const [form,setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    // creates async form submit function
    const submit = async () => {

        // destructures form data
        const {name, email, password} = form;

        // if email or password is empty shows an error message
        if(!name || !email || !password ) return Alert.alert("Error", 'Please enter valid email address and password.')

        // changes isSubmitting state to true
        setIsSubmitting(true)

        // try catch block to handle errors while submitting a form(creating user)
        try {

            // uses createUser function to create a new user using data from form
            await createUser({email,password,name})

            Alert.alert('Success', 'You have successfully signed up')
            // redirects to a home page after a successful signup
            router.replace('/');
        } catch(error: any) {
            Alert.alert('Error', error.message);
        }
            // in any case changes isSubmitting state to false
        finally {
            setIsSubmitting(false);
        }

    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            {/* Input Full Name, Email and Password Components */}
            <CustomInput
                placeholder="Enter your full name"
                value={form.name}
                onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
                label="Full Name"
            />
            <CustomInput
                placeholder="Enter your full name"
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

            {/* SignUp Button */}
            <CustomButton
                title="Sign Up"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                {/* Link to sign in if a user already has an account*/}
                <Text className="base-regular text-gray-100">
                    Already have an account?
                </Text>
                <Link href="/sign-in" className="base-bold text-primary">
                    Sign In
                </Link>
            </View>
        </View>

    )
}
export default SignUp
