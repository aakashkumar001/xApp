import { databases } from "@/lib/appwrite/config"
import { ID } from "appwrite"


const useCreateLike = async (userId:string, postId:string) => {

    try{
        await databases.createDocument(String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID), String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE), ID.unique(), {
           accountId:userId,
           reel_id:postId,
        })
    }catch(error){
        console.log(error);
    }
}

export default useCreateLike;