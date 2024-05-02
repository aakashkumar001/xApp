"use client";

import { useUserContext } from "@/context/AuthContext";
import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "@/actions/stream.action";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
console.log(API_KEY)

const StreamVideoPriovider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user } = useUserContext();

  console.log(user)

  useEffect(() => {
    if (!user) return;
    if (!API_KEY) throw new Error("Stream Api Key is missing!");

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.name,
        image: user?.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user]);

  if (!videoClient) return <Loader />;

  return (
    <>
      <StreamVideo client={videoClient}>{children}</StreamVideo>
    </>
  );
};

export default StreamVideoPriovider;
