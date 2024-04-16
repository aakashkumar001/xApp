import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
    url:String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    projectId:String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    databaseId:String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    storageId:String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID),
    userCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID),
    postCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID),
    savesCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID),
}

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

