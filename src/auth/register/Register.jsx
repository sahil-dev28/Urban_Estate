'use client";';

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../schemas";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterUser } from "../../hooks/auth/useRegister";
import { Link, useNavigate } from "react-router";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync: registerUser } = useRegisterUser();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    shouldUseNativeValidation: true,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });

  const onSubmit = async (data) => {
    const registerData = data;
    delete registerData.confirmPassword;

    await registerUser(registerData);
    reset();

    navigate({
      pathname: "/auth/verify",
      search: `?email=${data.email}`,
    });
  };

  return (
    <section className="flex items-center justify-center h-screen  bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Create a new account to get started.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="name"
                type="name"
                placeholder="Enter your name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {<p className="text-red-700 text-sm">{errors.name?.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {<p className="text-red-700 text-sm">{errors.email?.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <p className="text-red-700 text-sm">{errors.password?.message}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Enter your confirm password"
                {...register("confirmPassword")}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              {
                <p className="text-red-700 text-sm">
                  {errors.confirmPassword?.message}
                </p>
              }
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="landlord">Landlord</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-red-700 text-sm">{errors.role?.message}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center align-middle">
            <CardAction className="flex flex-col items-center w-full">
              <Button
                className="w-full  m-4 bg-[#fccf5d] text-black py-2 px-4 rounded-md hover:scale-105 cursor-pointer"
                type="submit"
                variant="solid"
                disabled={isPending}
              >
                {isPending ? "Registering" : "Register"}
              </Button>

              <div className="relative mt-4 text-center">
                <span className="absolute inset-0 flex items-center justify-center ">
                  <span className="w-full px-30 bg-white text-sm text-gray-600  border-t align-middle ">
                    OR
                  </span>
                </span>
              </div>
              <div className="mt-9 text-center text-sm text-gray-600">
                <Link
                  to="/auth/login"
                  className="text-blue-600 hover:underline"
                >
                  {"Already have an account? Log in"}
                </Link>
              </div>
            </CardAction>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};
export default RegisterForm;
