import { useEffect } from "react";
import { useNavigate } from "react-router";
import { profileSchema } from "../../schemas/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { useShowMeQuery } from "../../hooks/user/useShowMeQuery";
import { useProfileUpdate } from "../../hooks/user/useProfileUpdate";
import { useDeleteUser } from "../../hooks/user/useDeleteUser";
import { useLogoutUser } from "../../hooks/auth/userLogoutUser";
import pp from "../../assets/noavatar.jpg";

import _ from "lodash";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const ProfilePage = () => {
  const { name, login } = useAuthStore();
  const { data: user } = useShowMeQuery();
  const { mutate: updateData } = useProfileUpdate();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: logoutUser } = useLogoutUser();

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
      });

      if (!name) {
        login(user.name, user.email, user.role);
      }
    }
  }, [form, login, name, user]);

  const onSubmit = (data) => {
    updateData(data);
    navigate({
      pathname: "/",
    });
    console.log(data);
  };

  const deleteHandler = () => {
    deleteUser();
    navigate({
      pathname: "/",
    });
  };

  const logoutHandler = () => {
    logoutUser();
    navigate({
      pathname: "/auth/login",
    });
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-white rounded-lg shadow-md w-[350px] md:w-[450px]"
        >
          <h1 className="flex items-center justify-between text-2xl mb-6 font-bold">
            My Profile
            <span className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {user?.role || "user"}
              </Badge>
              <Badge className="bg-green-600 hover:bg-green-600 capitalize">
                {user?.verified ? "Verified" : "Not verified"}
              </Badge>
            </span>
          </h1>
          <Avatar className="w-32 h-32 relative m-auto">
            <AvatarImage src={pp} />
          </Avatar>

          <FormField
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            disabled={true}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 bg-[#fccf5d] text-black rounded-md cursor-pointer w-full hover:scale-105"
            variant="solid"
            disabled={isSubmitting}
          >
            Update Profile
          </Button>
          <Button
            type="button"
            className="mt-4 mb-4 border-red-500 text-red-500 rounded-md cursor-pointer w-full hover:scale-105"
            variant="outline"
            onClick={logoutHandler}
            disabled={isSubmitting}
          >
            Logout
          </Button>
          <div className="relative mt-4 text-center">
            <span className="absolute inset-0 flex items-center justify-center ">
              <span className="w-full px-30 bg-white text-sm text-gray-600  border-t align-middle ">
                OR
              </span>
            </span>
          </div>
          <Button
            type="button"
            className="mt-6 text-white rounded-md cursor-pointer w-full hover:scale-105"
            variant="destructive"
            onClick={deleteHandler}
            disabled={isSubmitting}
          >
            Delete Account
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ProfilePage;
