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
import Divider from "../../components/common/Divider";

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
    <section className="flex items-center justify-center min-h-[calc(100vh-100px)] py-10">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Create a new account to get started.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
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
                    <SelectTrigger id="role" className="w-full">
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
                className="w-full h-10 cursor-pointer hover:scale-105"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Registering..." : "Register"}
              </Button>

              <div className="mt-5 w-full">
                <Divider />
              </div>
              <p className="mt-5 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </CardAction>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};
export default RegisterForm;
