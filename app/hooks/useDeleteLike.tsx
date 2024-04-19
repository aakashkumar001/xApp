import { appwriteConfig, databases } from "@/lib/appwrite/config"


const useDeleteLike = async (id:string) => {
    try{
        await databases.deleteDocument(appwriteConfig.databaseId, String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE), id)
    }catch(error){
        console.log(error)
    }
}

export default useDeleteLike;