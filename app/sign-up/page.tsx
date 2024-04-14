"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@nextui-org/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";


import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignupValidation } from "@/lib/validations";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queries";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/AuthContext";

export default function () {
  const router = useRouter();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  //Queries
  // const { mutateAsync: createUserAccountMutation } = useCreateUserAccount();
  // const { mutateAsync: signInAccountMutation } = useSignInAccount();
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount }:any = useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser }:any = useSignInAccount();

  //Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        alert("Failed");
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        alert("something went wrong");

        router.push("/profile")
        return;
      }
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        router.push('/sign-in');
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
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Create a new account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            To use snapgram, Please enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
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
                  <FormLabel className="shad-form_label">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="shad-button_primary">
              {isCreatingAccount || isSigningInUser || isUserLoading ? (
                <div className="flex-center gap-2">Loading...</div>
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link
                href={"/sign-in"}
                className="text-primary-500 text-small-semibold ml-1"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
}
