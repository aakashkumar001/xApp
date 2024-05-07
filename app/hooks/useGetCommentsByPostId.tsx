import { appwriteConfig, databases } from "@/lib/appwrite/config"
import { Query } from "appwrite"
import useGetProfileByuserId from "./useGetProfileByUserId";


const useGetCommentsByPostId = async (postId:string) => {
    try{
        const commentResult = await databases.listDocuments(appwriteConfig.databaseId, String(process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT),
    [
        Query.equal('reel_id', postId),
        Query.orderDesc("$id")
    ]
    );

    const objPromises = commentResult.documents.map(async comment => {
        const profile = await useGetProfileByuserId(comment.accountId)

        return {
            id:comment?.$id,
            accountId:comment?.accountId,
            text:comment?.text,
            created_at:comment?.created_at,
            profile:{
                accountId:profile?.accountId,
                name:profile?.name,
                image:profile?.image,
            }
        }
    })

    const result = await Promise.all(objPromises);
    return result;
    }catch(error){
        console.log(error)
    }
}

export default useGetCommentsByPostId;