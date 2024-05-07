import { appwriteConfig, databases } from "@/lib/appwrite/config"


const useDeleteLike = async (id:string) => {
    console.log(id)
    try{
        await databases.deleteDocument(appwriteConfig.databaseId, String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE), String(id))
    }catch(error){
        console.log(error)
    }
}

export default useDeleteLike;