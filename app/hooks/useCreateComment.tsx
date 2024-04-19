import { databases } from "@/lib/appwrite/config"
import { ID } from "appwrite"


const useCreateComment = async(userId:string, postId:string,comment:string) => {
    try{
        await databases.createDocument(String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID), String(process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT), ID.unique(), {
            accountId:userId,
            reel_id:postId,
            text:comment,
            created_at:new Date().toISOString(),
        })
    }catch(error){
        console.log(error);
    }
}

export default useCreateComment;