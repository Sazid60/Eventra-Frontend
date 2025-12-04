import RegisterForm from "@/components/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
