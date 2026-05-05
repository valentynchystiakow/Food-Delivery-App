// imports components
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
// imports libraries
import React from 'react'
import cn from "clsx";
// imports types
import {CustomButtonProps} from "@/type";

// creates and exports CustomButton component
const CustomButton = ({
                          onPress,
                          title="Click Me",
                          style,
                          textStyle,
                          leftIcon,
                          isLoading = false
                      }: CustomButtonProps) => {
    return (
        <TouchableOpacity className={cn(
            'bg-primary rounded-full py-4 px-6', style)} onPress={onPress}>
            {leftIcon}

            <View className="flex-center flex-row">
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                ): (
                    <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton