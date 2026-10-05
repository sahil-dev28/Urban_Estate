import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useForgetPasswordUser } from "../../hooks/auth/useForgetPassword";
import { forgetPasswordSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Divider from "../../components/common/Divider";

function ForgetPassword() {
  const navigate = useNavigate();

  const { isPending, mutateAsync: forgetPassword } =
    useForgetPasswordUser(navigate);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),

    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    const forgetPasswordData = {
      email: data.email,
    };

    try {
      const response = await forgetPassword(forgetPasswordData);
      if (response) {
        reset();
      }
      navigate({
        pathname: "/auth/reset-password",
        search: `?email=${data.email}`,
      });
    } catch (error) {
      const status = error.response?.status;

      if (status === 409) {
        navigate({
          pathname: "/auth/reset-password",
          search: `?email=${data.email}`,
        });
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-100px)] py-10">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Reset Your Password
          </CardTitle>
          <CardDescription>
            Enter your email address and we will send you a password reset code.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {<p className="text-red-700 text-sm">{errors.email?.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <CardAction className="flex flex-col items-center w-full">
              <Button
                type="submit"
                className="w-full h-10 cursor-pointer hover:scale-105"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Reset Code"}
              </Button>
            </CardAction>
          </CardFooter>
        </form>
        <Divider />
        <p className="text-center text-sm">
          <Link
            to="/auth/login"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Go back to Login
          </Link>
        </p>
      </Card>
    </section>
  );
}

export default ForgetPassword;
