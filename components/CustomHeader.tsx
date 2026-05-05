// imports hooks
import { useRouter } from "expo-router";
// imports components
import { Image, Text, TouchableOpacity, View } from "react-native";
// imports types
import { CustomHeaderProps } from "@/type";
// imports icons
import {images} from "@/constants";


// creates and exports a CustomHeader component
const CustomHeader = ({ title }: CustomHeaderProps) => {
    // uses useRouter hook to navigate back
    const router = useRouter();

    return (
        <View className="custom-header">
            <TouchableOpacity onPress={() => router.back()}>
                {/* arrow back icon */}
                <Image
                    source={images.arrowBack}
                    className="size-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* title */}
            {title && <Text className="base-semibold text-dark-100">{title}</Text>}

            {/* search icon */}
            <Image source={images.search} className="size-5" resizeMode="contain" />
        </View>
    );
};

export default CustomHeader;