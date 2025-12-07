"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { registerClient } from "@/services/auth/register";
import Image from "next/image";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerClient, null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const successToastShownRef = useRef(false);

  console.log(state)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  useEffect(() => {
    // Reset the toast guard when state becomes falsy so future submissions can show again
    if (!state) {
      successToastShownRef.current = false;
    }

    if (state?.success && !successToastShownRef.current) {
      successToastShownRef.current = true;
      toast.success(state.message || "Account created successfully!");
      // Reset form and file on success
      formRef.current?.reset();
      setTimeout(() => {
        setSelectedFile(null);
      }, 0);
    }

    if (selectedFile && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(selectedFile);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [state, selectedFile]);
  return (
    <form ref={formRef} action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              defaultValue={state?.formData?.name || ""}
            />
            <InputFieldError field="name" state={state} />
          </Field>
          {/* Location */}
          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="City, Country"
              defaultValue={state?.formData?.location || ""}
            />
            <InputFieldError field="location" state={state} />
          </Field>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              defaultValue={state?.formData?.email || ""}
            />
            <InputFieldError field="email" state={state} />
          </Field>
          {/* Contact Number */}
          <Field>
            <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="text"
              placeholder="e.g. +8801XXXXXXXXX"
              defaultValue={state?.formData?.contactNumber || ""}
            />
            <InputFieldError field="contactNumber" state={state} />
          </Field>
          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              defaultValue={state?.formData?.password || ""}
            />

            <InputFieldError field="password" state={state} />
          </Field>
          {/* Confirm Password */}
          <Field className="">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              defaultValue={state?.formData?.confirmPassword || ""}
            />

            <InputFieldError field="confirmPassword" state={state} />
          </Field>

          {/* Profile Photo (file) */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="profilePhoto">Profile Photo</FieldLabel>
            <Input
              ref={fileInputRef}
              onChange={handleFileChange}
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
            />
            <InputFieldError field="profilePhoto" state={state} />
            {selectedFile && (
              <div className="relative w-full h-48 mt-3">
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="Profile photo preview"
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
          </Field>

          {/* Bio */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              id="bio"
              name="bio" placeholder="Short bio or description"
              defaultValue={state?.formData?.bio || ""} />
            <InputFieldError field="bio" state={state} />
          </Field>

          {/* Interests - checkboxes */}
          <Field className="md:col-span-2">
            <FieldLabel>Interests</FieldLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {[

                "MUSIC",
                "MOVIE",
                "THEATER",
                "COMEDY",
                "PARTY",
                "NIGHTLIFE",
                "CONCERT",
                "FESTIVAL",
                "SPORTS",
                "HIKING",
                "CYCLING",
                "RUNNING",
                "FITNESS",
                "CAMPING",
                "OUTDOOR",
                "ADVENTURE",
                "SOCIAL",
                "NETWORKING",
                "MEETUP",
                "COMMUNITY",
                "VOLUNTEERING",
                "CULTURE",
                "RELIGION",
                "FOOD",
                "DINNER",
                "COOKING",
                "TASTING",
                "CAFE",
                "RESTAURANT",
                "TECH",
                "WORKSHOP",
                "SEMINAR",
                "CONFERENCE",
                "EDUCATION",
                "LANGUAGE",
                "BUSINESS",
                "FINANCE",
                "ART",
                "CRAFT",
                "PHOTOGRAPHY",
                "PAINTING",
                "WRITING",
                "DANCE",
                "GAMING",
                "ESPORTS",
                "ONLINE_EVENT",
                "TRAVEL",
                "TOUR",
                "ROADTRIP",
                "OTHER"
              ].map((interest) => (
                <label key={interest} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    className="h-4 w-4"
                    defaultChecked={state?.formData?.interests?.includes(interest)}
                  />
                  <span className="select-none">{interest.toLowerCase()}</span>
                </label>
              ))}
            </div>
            <FieldDescription className="mt-2 text-xs text-muted-foreground">Choose interests to personalize your experience.</FieldDescription>
            <InputFieldError field="interests" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-[#45aaa2] hover:underline">
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
