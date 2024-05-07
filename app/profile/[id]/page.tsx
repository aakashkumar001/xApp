"use client";

import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { usePostStore } from "@/app/store/post"
import { useProfileStore } from "@/app/store/profile"
import PostUser from "@/components/PostUser";
import { useUserContext } from "@/context/AuthContext"
import { useEffect } from "react";
import { BiSolidPencil } from "react-icons/bi";


export default function ({params}:any) {
  const {user} = useUserContext();
  let { postsByUser, setPostsByUser } = usePostStore()
  let { setCurrentProfile, currentProfile } = useProfileStore()


  useEffect(() => {
      setCurrentProfile(params?.id)
      setPostsByUser(params?.id)
  }, [])

  return (
          <>
              <div className="pt-[90px] ml-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">

                  <div className="flex w-[calc(100vw-230px)]">

                      
                          {currentProfile ? (
                              <img className="w-[120px] min-w-[120px] rounded-full" src={currentProfile?.image} />
                          ) : (
                              <div className="min-w-[150px] h-[120px] bg-gray-200 rounded-full" />
                          )}
                      

                      <div className="ml-5 w-full">
                        
                              {(currentProfile as any)?.name ? (
                                  <div>
                                      <p className="text-[30px] font-bold truncate">{currentProfile?.name}</p>
                                      <p className="text-[18px] truncate">{currentProfile?.name}</p>
                                  </div>
                              ) : (
                                  <div className="h-[60px]" />
                              )}
                       

                          
                          {user?.id == params?.id ? (
                              <button 
                                  className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
                              >
                                  <BiSolidPencil className="mt-0.5 mr-1" size="18"/>
                                  <span>Edit profile</span>
                              </button>
                          ) : (
                              <button className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]">
                                  Follow
                              </button>
                          )}
                      </div>

                  </div>

                  <div className="flex items-center pt-4">
                      <div className="mr-4">
                          <span className="font-bold">10K</span>
                          <span className="text-gray-500 font-light text-[15px] pl-1.5">Following</span>
                      </div>
                      <div className="mr-4">
                          <span className="font-bold">44K</span>
                          <span className="text-gray-500 font-light text-[15px] pl-1.5">Followers</span>
                      </div>
                  </div>

                  
                      <p className="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
                          {currentProfile?.bio}
                      </p>
                 

                  <ul className="w-full flex items-center pt-4 border-b">
                  <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2">Posts</li>
                      <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">Videos</li>
                      <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">Liked</li>
                  </ul>

                  
                      <div className="mt-4 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-3">
                          {postsByUser?.map((post: any, index: any) => (
                              <PostUser key={index} post={post} />
                          ))}
                      </div>
                  

                  <div className="pb-20" />
              </div>
          


         {/* <div className=" flex flex-col h-screen gap-2">
            <div className=" w-full h-64 flex gap-2 ">
             <div className="w-48 ml-56 mt-8 rounded-full overflow-hidden">
               <Image src={Image3} height={180} width={180} alt={"image1"} style={{objectFit:"contain", borderRadius:"100px",padding:"10px",marginLeft:"20px"}} />
             </div>
             <div className="w-[500px] ml-24 mt-10 flex flex-col gap-2">
                 <div className="h-12 mt-2">
                   <span className="ml-10">willJacks123</span>
                    <span className="ml-24"><button>Edit Profile</button></span>
                 </div>
                 <div className="h-12">
                  <span className="ml-10">10 Posts</span>
                  <span className="ml-10">120 followers</span>
                  <span className="ml-10">
                    15 following
                  </span>
                 </div>
                 <div className="h-12 ml-10">
                    <span>Will Jacks</span>
                 </div>
             </div>
            </div>
            
            <ul className="w-full flex items-center pt-4 ml-96">
                        <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">Videos</li>
                        <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">Liked</li>
                    </ul>
                    <hr className="ml-48 mr-40"/>
            <div className="mt-2 grid lg:grid-cols-3 gap-2 pl-8 pr-8">
               <div className="">
               <Image src={Image3} alt="images"/>
               </div>
               <div>
               <Image src={Image3} alt="images"/>
               </div>
               <div>
               <Image src={Image3} alt="images"/>
               </div>
               <div>
               <Image src={Image3} alt="images"/>
               </div>
               <div>
               <Image src={Image3} alt="images"/>
               </div>
            </div>
        </div> */}
         </>
    )
}