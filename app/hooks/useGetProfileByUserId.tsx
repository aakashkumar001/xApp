import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { Query } from "appwrite";

const useGetProfileByUserId = async (userId:string) => {
  console.log(userId)
  try {
    let response = await databases.listDocuments(
      appwriteConfig.databaseId,
     appwriteConfig.userCollectionId,
      [Query.equal("accountId" , userId)]
    );

    let documents = response.documents;

    return {
      id: documents[0]?.$id,
      accountId: documents[0]?.accountId,
      name: documents[0]?.name,
      image: documents[0]?.imageUrl,
      bio: documents[0]?.bio,
    };
  } catch (error) {
    console.log(error);
  }
};

export default useGetProfileByUserId;
