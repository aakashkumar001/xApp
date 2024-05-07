"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validations";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

export default function () {
  const router = useRouter();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Queries
  // const { mutateAsync: createUserAccountMutation } = useCreateUserAccount();
  // const { mutateAsync: signInAccountMutation } = useSignInAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser }: any =
    useSignInAccount();

  //Handler
  const handleSignIn = async (user: z.infer<typeof SigninValidation>) => {
    try {
      const session = await signInAccount(user);

      if (!session) {
        alert("something went wrong");
        return;
      }
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        router.push("/");
      } else {
        alert("login failed");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      
      
      <div className=" mt-4 w-96 h-96 flex flex-col justify-center items-center ml-[420px] border-gray-300 border-1 p-4 border-2px">
        <div className="pb-4" ><h1 className="text-4xl font-bold">Instabyte</h1></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignIn)} className="flex flex-col items-center justify-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label text-gray-500">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input w-72" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label text-gray-500">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input w-72" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="shad-button_secondary bg-blue-500 w-full mt-4 hover:bg-blue-700"
            >
              {isSigningInUser || isUserLoading ? (
                <div className="flex-center gap-2">
                  <span>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> signing in
                  </span>
                </div>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </Form>
      </div>
 {/* ------------------------------- */}
      <div className="w-96 flex justify-center items-center ml-12 lg:ml-[420px] md:ml-24 border-gray-300 border-1 p-4 border-2px mt-2">
        <p className="text-gray-500">
          Don&apos;t have an account?
          <Link href="/sign-up" className="">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </p>
      </div>
      <h3 className="text-gray-500 text-center mt-3">Get The App</h3>
      <div className="w-96 flex justify-center items-center ml-12 lg:ml-[420px] md:ml-24 p-4 mt-2 gap-4">
        <Image
          src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
          alt="logo-google"
          width={180}
          height={124}
        />
        <Image
          src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
          alt="logo-google"
          width={148}
          height={56}
          style={{ borderRadius: "10px" }}
        />
      </div>
    </>
  );
}
