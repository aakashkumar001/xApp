import { appwriteConfig, databases } from "@/lib/appwrite/config"


const useDeleteComment = async (id:string) => {
    try{
        await databases.deleteDocument(appwriteConfig.databaseId, String(process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT), id)
    }catch(error) {
        console.log(error)
    }
}

export default useDeleteComment;