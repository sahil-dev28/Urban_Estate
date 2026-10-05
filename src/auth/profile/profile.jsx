import { useEffect, useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Divider from "../../components/common/Divider";
import { Input } from "@/components/ui/input";

const ProfilePage = () => {
  const { name, login } = useAuthStore();
  const { data: user } = useShowMeQuery();
  const { mutate: updateData } = useProfileUpdate();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: logoutUser } = useLogoutUser();

  const navigate = useNavigate();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

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
    <section className="flex items-center justify-center min-h-[calc(100vh-100px)] py-10">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[350px] md:max-w-[450px] p-6 bg-white rounded-xl border shadow-lg"
        >
          <h1 className="flex items-center justify-between text-2xl mb-6 font-bold">
            My Profile
            <span className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {user?.role || "user"}
              </Badge>
              <Badge
                className={`text-white capitalize ${
                  user?.verified ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                {user?.verified ? "Verified" : "Not verified"}
              </Badge>
            </span>
          </h1>
          <Avatar className="w-28 h-28 m-auto mb-6 border-4 border-[var(--cream)]">
            <AvatarImage
              className="object-cover"
              src={user?.profileImage || pp}
            />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
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
            className="mt-2 w-full h-10 cursor-pointer hover:scale-105"
            disabled={isSubmitting}
          >
            Update Profile
          </Button>
          <Button
            type="button"
            className="mt-3 mb-6 w-full h-10 cursor-pointer hover:scale-105"
            variant="outline"
            onClick={logoutHandler}
            disabled={isSubmitting}
          >
            Logout
          </Button>

          <Divider text="DANGER ZONE" />

          <Button
            type="button"
            className="mt-6 w-full h-10 text-white cursor-pointer hover:scale-105"
            variant="destructive"
            onClick={() => setOpenDeleteAlert(true)}
            disabled={isSubmitting}
          >
            Delete Account
          </Button>

          <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Your account and all your data
                  will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenDeleteAlert(false)}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={deleteHandler}
                  className="cursor-pointer"
                >
                  Delete Account
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </section>
  );
};

export default ProfilePage;
