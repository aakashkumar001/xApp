"use client";

import { StreamVideoClient, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetCallById } from "@/app/hooks/useGetCallById";


const PersonalRoom = () => {
    const router = useRouter();
    const {user} = useUserContext();

    console.log(user.id)
    const client = useStreamVideoClient();

    const meetingId = user?.id;

    const {call} = useGetCallById(meetingId!);

    const startRoom = async () => {
        if(!client || !user) return;

        const newCall = await client.call("default", meetingId!);

        if (!call) {
          await newCall.getOrCreate({
            data: {
              starts_at: new Date().toISOString(),
            },
          });
        }
    
        router.push(`/explore/rooms/meeting/${meetingId}?personal=true`);
      };
    
      const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
    
      return (
        <section className="flex size-full flex-col gap-10 text-white">
          <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
          <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
          </div>
          <div className="flex gap-5">
            <Button className="bg-blue-1" onClick={startRoom}>
              Start Meeting
            </Button>
            <Button
              className="bg-dark-3"
              onClick={() => {
                navigator.clipboard.writeText(meetingLink);
                alert({
                  title: "Link Copied",
                });
              }}
            >
              Copy Invitation
            </Button>
          </div>
        </section>
      );
    };
    
    export default PersonalRoom;