"use client";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect, useRef } from "react";

import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);


  const demoCredentials = {
    admin: { email: "admin@gmail.com", password: "Admin@12345" },
    host: { email: "host@gmail.com", password: "Host@12345" },
    client: { email: "client@gmail.com", password: "Client@12345" },
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleDemoLogin = (type: keyof typeof demoCredentials) => {
    const creds = demoCredentials[type];
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = creds.email;
      passwordRef.current.value = creds.password;
    }
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <form action={formAction} ref={formRef}>
        {redirect && <input type="hidden" name="redirect" value={redirect} />}
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="yourgmail@example.com"
                ref={emailRef}
              />
              <InputFieldError field="email" state={state} />
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                ref={passwordRef}
              />
              <InputFieldError field="password" state={state} />
            </Field>
          </div>


          <div className="flex  justify-between ">
            <Button type="button" variant="outline" className="border-[#45aaa2] text-[#45aaa2] hover:bg-[#e0f7f4]" onClick={() => handleDemoLogin("client")}>Client Login</Button>
            <Button type="button" variant="outline" className="border-[#45aaa2] text-[#45aaa2] hover:bg-[#e0f7f4]" onClick={() => handleDemoLogin("host")}>Host Login</Button>
            <Button type="button" variant="outline" className="border-[#45aaa2] text-[#45aaa2] hover:bg-[#e0f7f4]" onClick={() => handleDemoLogin("admin")}>Admin Login</Button>
          </div>

          <FieldGroup className="mt-2">
            <Field>
              <Button className="bg-[#45aaa2] hover:bg-[#3d8f8a] text-white" type="submit" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>
              <FieldDescription className="px-6 text-center">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-[#45aaa2] hover:underline">
                  Sign up
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </>
  );
};

export default LoginForm;
