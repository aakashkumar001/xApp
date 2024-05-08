import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { Query } from "appwrite";

const useGetProfileByUserPost = async (userId:string) => {
  console.log(userId)
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
     appwriteConfig.userCollectionId,
      [Query.equal("accountId" , userId)]
    );

    const documents = response.documents;

    console.log(documents)

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

export default useGetProfileByUserPost;
