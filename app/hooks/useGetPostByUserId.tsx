import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { Query } from "appwrite";


const useGetPostsByUser = async (userId: string) => {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST), 
            [
                Query.equal('accountId', userId),
                Query.orderDesc("$id")
            ]
        );
        const documents = response.documents;
        const result = documents.map(doc => {
            return { 
                id: doc?.$id, 
                accountId: doc?.accountId,
                video_url: doc?.video_url,
                text: doc?.text,
                created_at: doc?.created_at,
            }
        })
        
        return result
    } catch (error) {
        throw error
    }
}

export default useGetPostsByUser