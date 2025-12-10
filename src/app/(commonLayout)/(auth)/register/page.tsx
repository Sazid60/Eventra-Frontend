import RegisterForm from "@/components/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Register - Create Your Account | Eventra",
    description: "Register for a new Eventra account to start exploring and participating in exciting events and activities around you. Join the community and stay connected with the latest happenings.",
    keywords: ["register", "create account", "eventra signup", "new user", "event participation", "community events"],
    authors: [{ name: "Eventra Team" }],
};

const RegisterPage = () => {
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl">
          <Card className=" bg-background/95">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Create an account</CardTitle>
              <CardDescription className="text-gray-500">
                Enter your details to get started with Eventra
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-background/95">
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
