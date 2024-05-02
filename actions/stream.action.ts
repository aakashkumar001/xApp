"use server";

import { useUserContext } from "@/context/AuthContext";
import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const { user } = await useUserContext();
  console.log("actionuser"+ user)

  console.log(user);

  if (!user) throw new Error("user is not authenticated");
  if (!STREAM_API_KEY) throw new Error("Stream API key secret is missing");
  if (!STREAM_API_SECRET) throw new Error("Stream API secret is missing");

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000 - 60);

  const token = streamClient.createToken(user.id, expirationTime, issuedAt);

  console.log("token+"+ token)

  return token;
};
