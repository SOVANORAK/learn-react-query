import { useQuery, useMutation } from "@tanstack/react-query";
import { createPost, getUsers } from "./utils/api";
import { UsersResponseType } from "./utils/types";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./components/ui/input";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  body: z.string().min(2).max(50),
});

function App() {
  // 1 Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  // 2 define submit function
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createPostMutation({
      ...values,
      userId: 999,
    });
    console.log(values);
  };

  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery<UsersResponseType[]>({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  const {
    mutate: createPostMutation,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: createPost,
  });

  return (
    <div className="w-screen h-screen bg-gray-700 text-white flex justify-center items-center ">
      {/* Query Example */}
      {/* <div className="text-white w-full bg-neutral-800">
        {!isLoading && usersData ? (
          usersData.map((user) => (
            <div key={user.id} className="p-4 border-b border-neutral-700">
              <p>{user.name}</p>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.website}</p>
            </div>
          ))
        ) : (
          <div className="p-4">Loading...</div>
        )}
      </div>
      <div className="p-4">
        <Button>Click me</Button>
      </div> */}

      {/* Mutation */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-[600px] bg-gray-100 p-8 text-black rounded-lg shadow-lg"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>This is your title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Input placeholder="Body" {...field} />
                </FormControl>
                <FormDescription>This is your Body!!!</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default App;
