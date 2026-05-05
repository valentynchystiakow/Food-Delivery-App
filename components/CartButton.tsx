// imports components
import {View, Text, TouchableOpacity, Image} from 'react-native'
// imports libraries
import React from 'react'
import {router} from "expo-router";
// imports icons
import {images} from "@/constants";
// imports custom hook useCartStore
import {useCartStore} from "@/store/cart.store";

// creates and exports a CartButton component
const CartButton = () => {

    // uses useCartStore hook to get cart items and calculate total
    const { items } = useCartStore();
    // calculates total items from the items array
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)

    return (
        <TouchableOpacity 
            className="bg-primary px-3 py-2 rounded-lg flex-row items-center"
            onPress={()=> router.push('/cart')}
        >
            <Image 
                source={images.bag} 
                className="w-5 h-5 mr-2"
                resizeMode="contain"
            />
            <Text className="text-white font-bold">CART ({totalItems})</Text>
        </TouchableOpacity>
    )
}
export default CartButton