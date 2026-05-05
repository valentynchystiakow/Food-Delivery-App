// imports libraries
import cn from 'clsx';
import * as Sentry from "@sentry/react-native";

// imports components
import {SafeAreaView} from "react-native-safe-area-context";
import {Button, FlatList, Image, Pressable, Text, TouchableOpacity, View} from "react-native";
import {Fragment} from "react";
import CartButton from "@/components/CartButton";

// imports assets
import {images, offers} from "@/constants";

// imports custom hook(store)
import useAuthStore from "@/store/auth.store";

// creates and exports an Index (HOME) screen component
export default function Index() {

    // defines user state using useAuthStore hook
    const {user} = useAuthStore();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* uses FlatList component to display a list of offers and list header*/}
            <FlatList
                data={offers}
                renderItem={({ item, index }) => {
                    const isEven = index % 2 === 0;

                    return (
                        <View>
                            {/* uses Pressable component to display an offer card*/}
                            <Pressable
                                className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                                style={{ backgroundColor: item.color }}
                                android_ripple={{ color: "#fffff22"}}
                            >

                                {({ pressed }) => (
                                    // uses a Fragment component to display an offer card
                                    <Fragment>
                                        <View className={"h-full w-1/2"}>
                                            {/* Item image*/}
                                            <Image source={item.image} className={"size-full"} resizeMode={"contain"} />
                                        </View>

                                        <View className={cn("offer-card__info", isEven ? 'pl-10': 'pr-10')}>
                                            {/* Offer title*/}
                                            <Text className="h1-bold text-white leading-tight">
                                                {item.title}
                                            </Text>
                                            {/* Offer image */}
                                            <Image
                                                source={images.arrowRight}
                                                className="size-10"
                                                resizeMode="contain"
                                                tintColor="#ffffff"
                                            />
                                        </View>
                                    </Fragment>
                                )}
                            </Pressable>
                        </View>
                    )
                }}
                contentContainerClassName="pb-28 px-5"
                ListHeaderComponent={() => (
                    <View className="flex-between flex-row w-full my-5">
                        {/* Delivery location */}
                        <View className="flex-start">
                            <Text className="small-bold text-primary">DELIVER TO</Text>
                            <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                                <Text className="paragraph-bold text-dark-100">USA</Text>
                                {/* Dropdown icon */}
                                <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                        {/* Cart button */}
                        <CartButton />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}