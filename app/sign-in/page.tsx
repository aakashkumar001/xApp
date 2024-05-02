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
import {
  useSignInAccount,
} from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
      console.log("user:" + user);
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
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Log in to your account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            Welcome back! Please enter your details.
          </p>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="flex flex-col gap-5 w-full mt-4"
          >
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
              {isSigningInUser || isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Log in"
              )}
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Don&apos;t have an account?
              <Link
                href="/sign-up"
                className="text-primary-500 text-small-semibold ml-1"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
}
