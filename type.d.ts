// imports models
import { Models } from "react-native-appwrite";


// defines MenuItem interface
export interface MenuItem extends Models.Document {
    name: string;
    price: number;
    image_url: string;
    description: string;
    calories: number;
    protein: number;
    rating: number;
    type: string;
}

// defines category interface
export interface Category extends Models.Document {
    name: string;
    description: string;
}


// defines user interface
export interface User extends Models.Document {
    name: string;
    email: string;
    avatar: string;
}

// defines cart customization interface
export interface CartCustomization {
    id: string;
    name: string;
    price: number;
    type: string;
}

// defines cart item type interface
export interface CartItemType {
    id: string; // menu item id
    name: string;
    price: number;
    image_url: string;
    quantity: number;
    customizations?: CartCustomization[];
}

// defines cart store interface
export interface CartStore {
    items: CartItemType[];
    addItem: (item: Omit<CartItemType, "quantity">) => void;
    removeItem: (id: string, customizations: CartCustomization[]) => void;
    increaseQty: (id: string, customizations: CartCustomization[]) => void;
    decreaseQty: (id: string, customizations: CartCustomization[]) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

// defines tabBar icon props interface
interface TabBarIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}

// defines payment info stripe props interface
interface PaymentInfoStripeProps {
    label: string;
    value: string;
    labelStyle?: string;
    valueStyle?: string;
}

// defines custom button props interface
interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
}


// defines custom header props interface
interface CustomHeaderProps {
    title?: string;
}

// defines custom input props interface
interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

// defines profile field props interface
interface ProfileFieldProps {
    label: string;
    value: string;
    icon: ImageSourcePropType;
}

// defines create user params interface
interface CreateUserParams {
    email: string;
    password: string;
    name: string;
}

// defines SignInParams interface
interface SignInParams {
    email: string;
    password: string;
}

// defines get menu params interface
interface GetMenuParams {
    category: string;
    query: string;
}