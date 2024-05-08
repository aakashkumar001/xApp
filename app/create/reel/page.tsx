"use client";

import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiKnifeLight } from "react-icons/pi";
import Registration from "@/components/LoginDialog";

import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useCreatePost from "@/app/hooks/useCreatePost";
import { Loader } from "lucide-react";
import { Switch } from "@nextui-org/react";

export default function () {
  const { user } = useUserContext();
  const router = useRouter();

  let [fileDisplay, setFileDisplay] = useState<string>("");
  let [caption, setCaption] = useState<string>("");
  let [file, setFile] = useState<File | null>(null);
  let [error, setError] = useState<any>("");
  let [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
    }
  };

  const discard = () => {
    setFileDisplay("");
    setFile(null);
    setCaption("");
  };

  const clearVideo = () => {
    setFileDisplay("");
    setFile(null);
  };

  const validate = () => {
    setError(null);

    let isError = false;

    if (!file) {
      setError({ type: "File", message: "A video is Required" });
      isError = true;
    } else if (!caption) {
      setError({ type: "caption", message: "A caption is Required" });
      isError = true;
    }
    return isError;
  };

  const createNewPost = async () => {
    let isError = validate();
    if (isError) return;
    if (!file || !user) return;
    setIsUploading(true);

    try {
      await useCreatePost(file, user.id, caption);
      router.push(`/profile/${user.id}`);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
      alert(error);
    }
  };

  return (
    <>
    
      <div className="w-full h-screen p-12 flex justify-center items-center fixed">
        <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
          <div>
            <h1 className="text-[23px] font-semibold">Upload video</h1>
            <h2 className="text-gray-400 mt-1">Post a video to your account</h2>
          </div>

          <div className="mt-8 md:flex gap-6">
            {!fileDisplay ? (
              <label
                htmlFor="fileInput"
                className="
                                    md:mx-0
                                    mx-auto
                                    mt-4
                                    mb-6
                                    flex 
                                    flex-col 
                                    items-center 
                                    justify-center 
                                    w-full 
                                    max-w-[260px] 
                                    h-[470px] 
                                    text-center 
                                    p-3 
                                    border-2 
                                    border-dashed 
                                    border-gray-300 
                                    rounded-lg 
                                    hover:bg-gray-100 
                                    cursor-pointer
                                "
              >
                <BiSolidCloudUpload size="40" color="#b3b3b1" />
                <p className="mt-4 text-[17px]">Select video to upload</p>
                <p className="mt-1.5 text-gray-500 text-[13px]">
                  Or drag and drop a file
                </p>
                <p className="mt-12 text-gray-400 text-sm">MP4</p>
                <p className="mt-2 text-gray-400 text-[13px]">
                  Up to 5 minutes
                </p>
                <p className="mt-2 text-gray-400 text-[13px]">
                  Less than 50 MB
                </p>
                <label
                  htmlFor="fileInput"
                  className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm cursor-pointer"
                >
                  Select file
                </label>
                <input
                  type="file"
                  id="fileInput"
                  hidden
                  onChange={onChange}
                  accept=".mp4"
                />
              </label>
            ) : (
              <div
                className="
                                    md:mx-0
                                    mx-auto
                                    mt-4
                                    md:mb-12
                                    mb-16
                                    flex 
                                    items-center 
                                    justify-center 
                                    w-full 
                                    max-w-[260px] 
                                    h-[540px] 
                                    p-3 
                                    rounded-2xl
                                    cursor-pointer
                                    relative
                                "
              >
                {isUploading ? (
                  <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                    <div className="mx-auto flex items-center justify-center gap-1">
                      <BiLoaderCircle
                        className="animate-spin"
                        color="#F12B56"
                        size={30}
                      />
                      <div className="text-white font-bold">Uploading...</div>
                    </div>
                  </div>
                ) : null}
                <img
                  className="absolute z-20 pointer-events-none"
                  src="/mobile-case.png"
                />
                <video
                  autoPlay
                  loop
                  src={fileDisplay}
                  className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                />

                <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
                  <div className="flex items-center truncate">
                    <AiOutlineCheckCircle size="16" className="min-w-[16px]" />
                    <p className="text-[11px] pl-1 truncate text-ellipsis">
                    {File.name}
                    </p>
                  </div>
                  <button
                    onClick={() => clearVideo()}
                    className="text-[11px] ml-2 font-semibold"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}
            <div className="mt-4 mb-6">

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-[15px]">Caption</div>
                  <div className="text-gray-400 text-[12px]">
                    {caption.length}/150
                  </div>
                </div>
                <input
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  maxLength={150}
                  type="text"
                  className="
                                        w-full
                                        border
                                        p-2.5
                                        rounded-md
                                        focus:outline-none
                                        text-gray-600
                                    "
                />
              </div>

              <div className="flex gap-3">
                <button
                  disabled={isUploading}
                  onClick={() => discard()}
                  className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
                >
                  Discard
                </button>
                <button
                  disabled={isUploading}
                  onClick={() => createNewPost()}
                  className="px-10 py-2.5 mt-8 border text-[16px] text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-sm"
                >
                  {isUploading ? <Loader size={24} /> : "post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Registration /> */}
    </>
  );
}
