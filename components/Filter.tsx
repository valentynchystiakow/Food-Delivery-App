// imports components
import {Text, FlatList, TouchableOpacity, Platform} from 'react-native'
// imports types
import {Category} from "@/type";
// imports libraries
import {router, useLocalSearchParams} from "expo-router";
import cn from "clsx";
// imports hooks
import {useState} from "react";

// creates and exports a Filter component
const Filter = ({ categories }: { categories: Category[] }) => {

    // hooks section
    // uses useLocalSearchParams hook to manage search parameters
    const searchParams = useLocalSearchParams();
    // uses useState hook to manage active filter
    const [active, setActive] = useState(searchParams.category || '');

    // creates a function to handle filter press
    const handlePress = (id: string) => {
        setActive(id);

        // if id is 'all', remove category parameter from search parameters
        if(id === 'all') router.setParams({ category: undefined });
        // else set category parameter based on id
        else router.setParams({ category: id });
    };

    // creates filter data array
    const filterData: (Category | { $id: string; name: string })[] = categories
        ? [{ $id: 'all', name: 'All' }, ...categories]
        : [{ $id: 'all', name: 'All' }]

    return (
        // uses FlatList component to display filter options
        <FlatList
            data={filterData}
            keyExtractor={(item) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-x-2 pb-3"
            renderItem={({ item }) => (
                // uses TouchableOpacity component to create a filter option
                <TouchableOpacity
                    key={item.$id}
                    className={cn('filter', active === item.$id ? 'bg-amber-500' : 'bg-white')}
                    style={Platform.OS === 'android' ? { elevation: 5, shadowColor: '#878787'} : {}}
                    onPress={() => handlePress(item.$id)}
                >
                    {/* Filter text */}
                    <Text className={cn('body-medium', active === item.$id ? 'text-white' : 'text-gray-200')}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    )
}
export default Filter