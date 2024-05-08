"use client"
import { useGetUsers } from "@/lib/react-query/queries";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function () {

  const {
    data: creator,
    isLoading: isCreatorLoading,
    isError: isCreatorError,
  } = useGetUsers();
console.log(creator)

  return (
    <>
    <div className="px-6 py-4 hidden lg:block">
      <div className="rounded-xl flex flex-col gap-6">
        <h2 className="text text-xl font-semibold text-gray-500">Who to follow</h2>
        {creator?.documents?.map((user:any,index:any) => (
 <div key={index} className="h-14 mt-2 flex">
 <Avatar>
   <AvatarImage src={user?.imageUrl}/>
   <AvatarFallback>CN</AvatarFallback>
 </Avatar>
 <div className="flex flex-col justify-center items-center ml-2">
   <p className="text-black text-sm ml-2">{user?.name}</p>
   <p className="text-gray-500 text-sm ml-2">@{user?.username}</p>
 </div> 
 </div>
        ))}  
          </div>
        </div>
      </>
  );
}
