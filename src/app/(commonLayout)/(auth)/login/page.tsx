import LoginForm from "@/components/login-form";


import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login - Access Your Account | Eventra",
  description: "Login to your Eventra account to explore and participate in exciting events and activities around you. Connect with the community and stay updated with the latest happenings.",
  keywords: ["login", "user access", "eventra account", "event participation", "community events"],
  authors: [{ name: "Eventra Team" }],
};

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome To Eventra</h1>
          <p className="text-gray-500">
            Login and Explore Events and Activities Around You
          </p>
        </div>
        <LoginForm redirect={params.redirect} />
      </div>
    </div>
  );
};

export default LoginPage;
