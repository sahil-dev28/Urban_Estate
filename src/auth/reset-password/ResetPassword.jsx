import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../schemas";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useResetPassword } from "../../hooks/auth/useResetPassword";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { isPending, mutateAsync: resetPasswordUser } = useResetPassword();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email ?? "",
      passwordCode: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    const resetPasswordData = {
      email: data.email,
      passwordCode: data.passwordCode,
      password: data.password,
    };

    await resetPasswordUser(resetPasswordData);
    form.reset();
    navigate({
      pathname: "/auth/login",
      search: `?email=${data.email}`,
    });

    console.log(onSubmit);
  };

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-100px)] py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md p-6 bg-white rounded-xl border shadow-lg"
        >
          <h1 className="flex items-center justify-center text-2xl font-bold mb-4">
            Reset Password
          </h1>
          <p className="text-center text-sm text-gray-600 mb-2">
            Enter the code from your email and choose a new password.
          </p>
          {!email && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="passwordCode"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Reset Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter reset code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter new password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-6 w-full h-10 cursor-pointer hover:scale-105"
            disabled={isPending}
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ResetPassword;
