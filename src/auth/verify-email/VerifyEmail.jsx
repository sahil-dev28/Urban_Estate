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
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
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
              <FormItem className>
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
            className="mt-4 bg-[#fccf5d] text-black rounded-md cursor-pointer w-full hover:scale-105"
            variant="solid"
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Verify Email"}
          </Button>

          <div className="relative mt-7 text-center">
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-full px-30 bg-white text-sm text-gray-600  border-t align-middle ">
                OR
              </span>
            </span>
          </div>
          <div className="mt-12 text-center text-sm text-gray-600">
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline"
            >
              {"Go back to Sign Up"}
            </Link>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default VerifyEmail;
