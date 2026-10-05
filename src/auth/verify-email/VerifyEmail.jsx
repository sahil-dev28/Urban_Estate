import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { verifyEmailSchema } from "../../schemas";

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
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import { Link, useSearchParams } from "react-router";
import { useNavigate } from "react-router";
import Divider from "@/components/common/Divider";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const { isPending, mutateAsync: verifyEmailUser } = useVerifyEmail();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: email ?? "",
      verificationCode: "",
    },
  });

  const onSubmit = async (data) => {
    const verificationData = {
      email: data.email,
      verificationCode: data.verificationCode,
    };

    await verifyEmailUser(verificationData);
    form.reset();
    navigate({
      pathname: "/auth/login",
      search: `?email=${data.email}`,
    });
  };

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-100px)] py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md mx-auto p-6 bg-white rounded-xl border shadow-lg"
        >
          <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
          <p className="text-gray-600 mb-6">
            Please enter your {`${!email ? "email and the" : ""}`} verification
            code sent to your email address.
          </p>

          {!email && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
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
            name="verificationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter verification code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full h-10 cursor-pointer hover:scale-105"
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Verify Email"}
          </Button>

          <div className="mt-6">
            <Divider />
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            <Link
              to="/auth/register"
              className="font-semibold text-black underline-offset-4 hover:underline"
            >
              Go back to Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default VerifyEmail;
