import { appwriteConfig, databases, storage } from "@/lib/appwrite/config"
import { ID } from "appwrite"


const useCreatePost = async (file:File,userId:string, caption:string) => {
    let videoId = Math.random().toString(36).slice(2,22)

    try{
        await databases.createDocument(appwriteConfig.databaseId, String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST), ID.unique(), {
            accountId:userId,
            text:caption,
            created_at:new Date().toISOString(),
            video_url:videoId,
        });

        await storage.createFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), videoId, file)
    }catch(error){
        console.log(error);
    }
}

export default useCreatePost;