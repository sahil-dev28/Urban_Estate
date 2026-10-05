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
import { DEMO_ACCOUNTS } from "../../utils/default";
import { Building2, KeyRound } from "lucide-react";

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

  const signIn = async (data, redirectTo) => {
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
        pathname: redirectTo,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onSubmit = (data) => signIn(data, "/");

  const loginAsDemo = (account) => {
    setValue("email", account.email);
    setValue("password", account.password);
    signIn(account, account.redirectTo);
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
        {DEMO_ACCOUNTS.length > 0 && (
          <div className="mx-6 rounded-lg border border-dashed border-[var(--brand)] bg-[var(--brand-soft)] p-4">
            <p className="text-sm font-semibold">Just looking around?</p>
            <p className="text-xs text-muted-foreground">
              Log in to a ready-made demo account in one click.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {DEMO_ACCOUNTS.map((account) => {
                const Icon = account.role === "landlord" ? Building2 : KeyRound;
                return (
                  <Button
                    key={account.role}
                    type="button"
                    variant="outline"
                    className="h-auto cursor-pointer justify-start py-2"
                    onClick={() => loginAsDemo(account)}
                    disabled={isPending}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex flex-col items-start leading-tight">
                      <span>Demo {account.label}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {account.hint}
                      </span>
                    </span>
                  </Button>
                );
              })}
            </div>
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
