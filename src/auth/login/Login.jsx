"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router";
import { useLoginUser } from "../../hooks/auth/useLogin";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
import Divider from "../../components/common/Divider";
import { DEMO_ACCOUNT } from "../../utils/default";
import { Sparkles } from "lucide-react";

const Login = () => {
  const { isPending, mutateAsync: loginUser } = useLoginUser();

  const { login } = useAuthStore();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    shouldUseNativeValidation: true,
    defaultValues: {
      email: email ?? "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await loginUser(loginData);

      login({
        name: response.name,
        email: response.email,
        role: response.role,
      });

      reset();

      navigate({
        pathname: "/",
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const loginAsDemo = () => {
    setValue("email", DEMO_ACCOUNT.email);
    setValue("password", DEMO_ACCOUNT.password);
    onSubmit(DEMO_ACCOUNT);
  };

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-100px)] py-10">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        {DEMO_ACCOUNT && (
          <div className="mx-6 flex flex-col gap-3 rounded-lg border border-dashed border-[var(--brand)] bg-[var(--brand-soft)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold">Just looking around?</p>
              <p className="text-xs text-muted-foreground">
                Explore with a ready-made demo account.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={loginAsDemo}
              disabled={isPending}
            >
              <Sparkles className="h-4 w-4" />
              Try the demo
            </Button>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              <p className="text-red-700 text-sm">{errors.email?.message}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />

              <p className="text-red-700 text-sm">{errors.password?.message}</p>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-5">
            <Button
              type="submit"
              className="w-full h-10 cursor-pointer hover:scale-105"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <Divider />

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default Login;
