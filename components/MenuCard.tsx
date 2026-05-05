// imports components
import {Text, TouchableOpacity, Image, Platform, View} from 'react-native'
// imports types
import {MenuItem} from "@/type";
// imports appwrite configuration
import {appwriteConfig} from "@/lib/appwrite";
// imports custom hook
import {useCartStore} from "@/store/cart.store";


// creates and exports MenuCard component
const MenuCard = ({ item: { $id, image_url, name, price }}: { item: MenuItem}) => {

    // uses appwrite configuration to get item image URL
    const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;

    // uses useCartStore custom hook to add item to the cart
    const { addItem } = useCartStore()

    return (
        // uses TouchableOpacity component to create a menu card
        <TouchableOpacity className="menu-card bg-white rounded-2xl p-3" style={Platform.OS === 'android' ? { elevation: 10, shadowColor: '#878787'}: {}}>
            {/* Item image */}
            <View className="items-center mb-3">
                <Image source={{ uri: imageUrl }} className="size-32" resizeMode="contain" />
            </View>
            {/* Item name */}
            <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
            {/* Item price */}
            <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
            {/* Add to cart button */}
            <TouchableOpacity onPress={() => addItem({id: $id, name, price, image_url: imageUrl, customizations: []})} className="bg-primary rounded-lg py-2 px-3">
                <Text className="paragraph-bold text-white text-center">Add to Cart +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default MenuCard