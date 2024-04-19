import { appwriteConfig, databases } from "@/lib/appwrite/config";
import useGetProfileByuserId from "./useGetProfileByUserId";


const useGetPostById = async (id: string) => {
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId, 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST), 
            id
        );

        const profile = await useGetProfileByuserId(post?.accountId)

        return {
            id: post?.$id, 
            accountId: post?.accountId,
            video_url: post?.video_url,
            text: post?.text,
            created_at: post?.created_at,
            profile: {
                accountId: profile?.accountId,  
                name: profile?.name,
                image: profile?.image,
            }
        } 
    } catch (error) {
        throw error
    }
}

export default useGetPostById