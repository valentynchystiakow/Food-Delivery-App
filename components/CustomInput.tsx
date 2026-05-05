// imports components
import {View, Text, TextInput} from 'react-native'
// imports libraries
import React from 'react'
import cn from "clsx";
// imports types
import {CustomInputProps} from "@/type";
// imports Hooks
import {useState} from 'react'

// creates and exports reusableCustomInput component
const CustomInput = ({placeholder, value, onChangeText, label, secureTextEntry = false, keyboardType = 'default'} : CustomInputProps) => {

    // uses useState hook to manage focus state
    const [isFocused, setIsFocused] = useState(false)

    return (
        <View className="w-full">
            <Text className="label">{label}</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                placeholderTextColor="#888"
                className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')}


            />
        </View>
    )
}
export default CustomInput
