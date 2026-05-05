// imports custom useCartStore hook to manage global cart state
import { useCartStore } from "@/store/cart.store";
// imports types
import { CartItemType } from "@/type";
// imports components
import { Image, Text, TouchableOpacity, View } from "react-native";
// imports assets
import {images} from "@/constants";


// creates and exports a CartItem component
const CartItem = ({ item }: { item: CartItemType }) => {

    // uses custom useCartStore hook to manage cart items state
    const { increaseQty, decreaseQty, removeItem } = useCartStore();

    return (
        <View className="cart-item">
            <View className="flex flex-row items-center gap-x-3">
                <View className="cart-item__image">
                    {/* uses an Image component to display a cart item image */}
                    <Image
                        source={{ uri: item.image_url }}
                        className="size-4/5 rounded-lg"
                        resizeMode="cover"
                    />
                </View>

                <View>
                    {/* Item name */}
                    <Text className="base-bold text-dark-100">{item.name}</Text>
                    {/* Item price */}
                    <Text className="paragraph-bold text-primary mt-1">
                        ${item.price}
                    </Text>

                    <View className="flex flex-row items-center gap-x-4 mt-2">
                        {/* Decrease quantity button */}
                        <TouchableOpacity
                            onPress={() => decreaseQty(item.id, item.customizations!)}
                            className="cart-item__actions"
                        >
                            {/* Decrease quantity icon */}
                            <Image
                                source={images.minus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>

                        {/* Quantity */}
                        <Text className="base-bold text-dark-100">{item.quantity}</Text>

                        {/* Increase quantity button */}
                        <TouchableOpacity
                            onPress={() => increaseQty(item.id, item.customizations!)}
                            className="cart-item__actions"
                        >
                            {/* Increase quantity icon */}
                            <Image
                                source={images.plus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* RemoveItem button */}
            <TouchableOpacity
                onPress={() => removeItem(item.id, item.customizations!)}
                className="flex-center"
            >
                {/* Remove item icon */}
                <Image source={images.trash} className="size-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;