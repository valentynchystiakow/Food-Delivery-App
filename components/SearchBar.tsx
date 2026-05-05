// imports assets
import {images} from "@/constants";
// imports libraries
import { router, useLocalSearchParams } from "expo-router";
// imports hooks
import React, { useState } from "react";
// imports components
import { Image, TextInput, TouchableOpacity, View } from "react-native";


// creates and exports a Searchbar component
const Searchbar = () => {

    // hooks section
    // uses useLocalSearchParams hook to manage search parameters
    const params = useLocalSearchParams<{ query: string }>();
    // uses useState hook to manage a search query
    const [query, setQuery] = useState(params.query);

    // creates a function to handle search
    const handleSearch = (text: string) => {
        // sets the search query based on the text
        setQuery(text);
        // if text is empty, remove query parameter
        if(!text) router.setParams({ query: undefined });
    };

    // creates a function to handle submitting of the search
    const handleSubmit = () => {
        if(query.trim()) router.setParams({ query });
    }

    return (
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
            {/* Search icon*/}
            <Image
                source={images.search}
                className="size-5 mr-3"
                resizeMode="contain"
                tintColor="#5D5F6D"
            />
            {/* Search input*/}
            <TextInput
                className="flex-1 text-base"
                placeholder="Search for pizzas, burgers..."
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
                placeholderTextColor="#A0A0A0"
                returnKeyType="search"
            />
        </View>
    );
};

export default Searchbar;