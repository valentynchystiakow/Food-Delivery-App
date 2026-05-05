// imports libraries
import {Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
// imports types
import {CreateUserParams} from "@/type";
import {SignInParams} from "@/type";
import {GetMenuParams} from "@/type";
import {Category} from "@/type";
import {MenuItem} from "@/type";


// creates and exports appwrite api configuration
// !! USE YOUR OWN appwriteConfig here 
export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: 
    databaseId:
    bucketId: 
    userCollectionId: 
    categoriesCollectionId: 
    menuCollectionId: 
    customizationsCollectionId: 
    menuCustomizationsCollectionId: 

}


// creates and exports appwrite client
export const client = new Client();

// sets appwrite client configuration
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)


// creates and exports an appwrite client account
export const account = new Account(client);
// creates and exports an appwrite database
export const databases = new Databases(client);
// creates and exports an appwrite storage
export const storage = new Storage(client);
// defines client avatar
const avatars = new Avatars(client);


// creates and exports async function that creates a new user
export const createUser = async ({email, password, name} : CreateUserParams) => {
    // try catch block for handling errors while creating User
    try {
        // defines a new Account object with unique id
        const newAccount = await account.create(ID.unique(), email, password, name)

        // throws error if newAccount is undefined
        if(!newAccount) throw Error;

        // uses signIn function to create a new session and sign in a new user
        await signIn({ email, password });

        // defines user avatar
        const avatarUrl = avatars.getInitialsURL(name);

        // creates a new user document with data in the database
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );
    } catch (error) {
        throw new Error(error as string)
    }
}


// creates and exports a signIn function
export const signIn = async ({ email, password }: SignInParams) => {
    // try catch block for handling errors while signing in
    try {
        // defines a new session
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string);
    }
}

// creates and exports a function that gets CurrentUser
export const getCurrentUser = async () => {

    // try-catch block for handling errors while getting CurrentUser
    try {

        // defines current account
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        // defines current user from a database using current account id
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        // returns found user
        return currentUser.documents[0];
    }
    // throws error if something went wrong
    catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}

// creates and exports async function getMenu
export const getMenu = async ({ category, query }: GetMenuParams): Promise<MenuItem[]> => {
    // try catch block for handling errors while getting a menu
    try {

        // defines search queries
        const queries: string[] = [];

        // pushes different queries to the array depending on the parameters
        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        // gets menus from a database based on the queries
        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents as unknown as MenuItem[];
    }
    // throws error if something went wrong
    catch (e) {
        throw new Error(e as string);
    }
}

// creates and exports async function getCategories
export const getCategories = async (): Promise<Category[]> => {
    // try catch block for handling errors while getting categories
    try {

        // defines categories from a database
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents as unknown as Category[];
    }
    // throws error if something went wrong
    catch (e) {
        throw new Error(e as string);
    }
}
