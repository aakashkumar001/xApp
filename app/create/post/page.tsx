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
import { Textarea } from "@/components/ui/textarea";
import { PostValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import FileUploader from "@/components/shared/FileUploader";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";
import { Input } from "@/components/ui/input";

type PostFormProps = {
  post?: Models.Document;
};

export default function ({ post }: PostFormProps) {
  const router = useRouter();
  const { user } = useUserContext();

  console.log(user);
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
    },
  });

  //Query
  const { mutateAsync: createPost, isLoading: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isLoading: isLoadingUpdate } =
    useUpdatePost();

  //Handler
  const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
    alert("values");
    console.log("values" + value);

    //Action = Create
    const newPost = await createPost({
      ...value,
      userId: user.id,
    });

    if (!newPost) {
      alert("post creation failed! Please try again");
    }

    router.push("/");
  };

  return (
    <>
      <div>
        <h1 className="text-[23px] font-semibold">Upload a Post</h1>
        <h2 className="text-gray-400 mt-1">Post a media</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full h-screen justify-center items-center gap-4"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className=" w-[640px] rounded-md h-96 object-contain">
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />

      
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bold text-1xl font-bold text-gray-800">
                    Caption
                  </FormLabel>
                  <FormControl>
                    <Input className="" {...field} />
                  </FormControl>
                  <FormMessage className="" />
                </FormItem>
              )}
            />

      
              <Button
                type="button"
                className="bg-gradient-to-r hover:from-red-500 hover:to-red-600"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
              >
                create Post
              </Button>
    

          {/* <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        /> */}
        </form>
      </Form>
    </>
  );
}
