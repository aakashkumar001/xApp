import { appwriteConfig, databases } from "@/lib/appwrite/config"
import { Query } from "appwrite"


const useGetLikesByPostId = async (postId:string) => {
console.log(postId)
    try{
       const response = await databases.listDocuments(appwriteConfig.databaseId, String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE),[
        Query.equal('reel_id', postId)
       ]);

       const documents = response.documents;
       
       const result = documents.map(doc => {
        return {
            id:doc?.$id,
            accountId:doc?.accountId,
            reel_id:doc?.reel_id
        }
       })

       console.log(result)
       return result
    }catch(error){
        console.log(error);
    }
}

export default useGetLikesByPostId