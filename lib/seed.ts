// imports libraries
import { ID } from "react-native-appwrite";
// imports appwrite configuration
import { appwriteConfig, databases, storage } from "./appwrite";
// imports dummy data
import dummyData from "./data";


// defines category interface
interface Category {
    name: string;
    description: string;
}

// defines customization interface
interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

// defines menu item interface
interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[]; // list of customization names
}

// defines dummy data interface
interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

// ensure dummyData has a correct shape
const data = dummyData as DummyData;

// creates async function that clears all documents from a collection
async function clearAll(collectionId: string): Promise<void> {
    try {
        const list = await databases.listDocuments(
            appwriteConfig.databaseId,
            collectionId
        );

        if (list.documents.length > 0) {
            await Promise.all(
                list.documents.map((doc) =>
                    databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
                )
            );
        }
    } catch (error) {
        console.error(`Error clearing collection ${collectionId}:`, error);
        // Continue even if clearing fails
    }
}

// creates an async function that clears all files from storage
async function clearStorage(): Promise<void> {
    try {
        const list = await storage.listFiles(appwriteConfig.bucketId);

        if (list.files.length > 0) {
            await Promise.all(
                list.files.map((file) =>
                    storage.deleteFile(appwriteConfig.bucketId, file.$id)
                )
            );
        }
    } catch (error) {
        console.error('Error clearing storage:', error);
        // Continue even if clearing fails
    }
}

// creates an async function that uploads an image to storage
async function uploadImageToStorage(imageUrl: string) {
    try {
        // For now, skip image upload and use original URLs
        // React Native fetch + Appwrite file upload has compatibility issues
        // This can be fixed later with proper file handling libraries
        console.log(`Skipping upload for: ${imageUrl}`);
        return imageUrl;
        
        // Future implementation with proper file handling:
        // const response = await fetch(imageUrl);
        // const formData = new FormData();
        // formData.append('fileId', ID.unique());
        // formData.append('file', {
        //     uri: imageUrl,
        //     type: 'image/jpeg',
        //     name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
        // });
        
        // const result = await fetch(`${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     body: formData,
        // });
        
        // return storage.getFileViewURL(appwriteConfig.bucketId, result.$id);
    } catch (error) {
        console.error('Error uploading image:', error);
        // Return original URL as fallback
        return imageUrl;
    }
}

// creates async function that seeds the database
async function seed(): Promise<void> {
    // 1. Clear all
    await clearAll(appwriteConfig.categoriesCollectionId);
    await clearAll(appwriteConfig.customizationsCollectionId);
    await clearAll(appwriteConfig.menuCollectionId);
    await clearAll(appwriteConfig.menuCustomizationsCollectionId);
    await clearStorage();

    // 2. Create Categories
    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
        const doc = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
            ID.unique(),
            cat
        );
        categoryMap[cat.name] = doc.$id;
    }

    // 3. Create Customizations
    const customizationMap: Record<string, string> = {};
    for (const cus of data.customizations) {
        const doc = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.customizationsCollectionId,
            ID.unique(),
            {
                name: cus.name,
                price: cus.price,
                type: cus.type,
            }
        );
        customizationMap[cus.name] = doc.$id;
    }

    // 4. Create Menu Items
    const menuMap: Record<string, string> = {};
    for (const item of data.menu) {
        const uploadedImage = await uploadImageToStorage(item.image_url);

        const doc = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            ID.unique(),
            {
                name: item.name,
                description: item.description,
                image_url: uploadedImage,
                price: item.price,
                rating: item.rating,
                calories: item.calories,
                protein: item.protein,
                categories: categoryMap[item.category_name],
            }
        );

        menuMap[item.name] = doc.$id;

        // 5. Create menu_customizations
        for (const cusName of item.customizations) {
            await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.menuCustomizationsCollectionId,
                ID.unique(),
                {
                    menu: doc.$id,
                    customizations: customizationMap[cusName],
                }
            );
        }
    }

    console.log("✅ Seeding complete.");
}

export default seed;