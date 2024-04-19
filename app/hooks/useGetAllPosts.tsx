import { appwriteConfig, databases } from "@/lib/appwrite/config"
import { Query } from "appwrite"
import useGetProfileByUserId from "./useGetProfileByUserId";



const useGetAllPosts = async () => {
    try{
        const response = await databases.listDocuments(appwriteConfig.databaseId, String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST), [Query.orderDesc("$id")])

        const documents = response.documents;

        const objPromises = documents.map(async doc => {
            console.log((doc?.accountId))
            let profile = await useGetProfileByUserId(String(doc?.accountId));

            return {
                id:doc?.$id,
                accountId:doc?.accountId,
                video_url:doc?.video_url,
                text:doc?.text,
                created_at:doc?.created_at,
                profile:{
                    accountId:profile?.accountId,
                    name:profile?.name,
                    image:profile?.image,
                }
            }
        })

        const result = await Promise.all(objPromises)
        return result
    }catch(err){
        console.log(err);
    }
}

export default useGetAllPosts;
