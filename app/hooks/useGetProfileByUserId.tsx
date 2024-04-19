import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { Query } from "appwrite";

const useGetProfileByUserId = async (userId:string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
     appwriteConfig.userCollectionId,
      [Query.equal("accountId", userId)]
    );

    const documents : any = await response.documents;
console.log(documents[0])
    return {
      id: documents[0]?.$id,
      accountId: documents[0]?.accountId,
      name: documents[0]?.name,
      image: documents[0]?.image,
      bio: documents[0]?.bio,
    };
  } catch (error) {
    console.log(error);
  }
};

export default useGetProfileByUserId;
