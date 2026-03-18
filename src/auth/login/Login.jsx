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

const Login = () => {
  const { isPending, mutateAsync: loginUser } = useLoginUser();

  const { login } = useAuthStore();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    shouldUseNativeValidation: true,
    defaultValues: {
      email: email ?? "",
      password: "",
      role: "",
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
        search: `?email=${data.email}`,
      });

      console.log("It worked", data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
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
              <Label htmlFor="password">Password</Label>
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

          <CardFooter className="flex-col gap-5 ">
            <Button
              type="submit"
              className=" bg-[#fccf5d] text-black rounded-md cursor-pointer w-full hover:scale-105"
              variant="solid"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setValue("role", "tenant")}
              {...register("role", {
                required: "Role is required",
              })}
              className="cursor-pointer w-full hover:scale-105"
            >
              Set Tenant
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setValue("role", "landlord")}
              {...register("role", {
                required: "Role is required",
              })}
              className="cursor-pointer w-full hover:scale-105"
            >
              Set Landlord
            </Button>

            <div className="relative mt-4 text-center">
              <span className="absolute inset-0 flex items-center justify-center mt-4">
                <span className="w-full px-30 bg-white text-sm text-gray-600  border-t align-middle ">
                  OR
                </span>
              </span>
            </div>
            <div className=" text-center text-sm mt-6">
              Don't have an account?
              <div className="text-blue-600 hover:underline underline-offset-4">
                <Link
                  to="/auth/register"
                  className="text-blue-600 text-sm hover:underline underline-offset-4"
                >
                  Sign Up
                </Link>
              </div>
              <div className="text-sm mt-3 ">
                <Link
                  to="/auth/forgot-password"
                  className="text-blue-600 hover:underline underline-offset-4"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default Login;
