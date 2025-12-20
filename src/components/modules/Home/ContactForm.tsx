"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/shared/InputFieldError";
import { sendContactEmail } from "@/services/home/homeServices";
import { Mail, Phone, User, MessageSquare } from "lucide-react";

const ContactForm = () => {
    const [state, formAction, isPending] = useActionState(sendContactEmail, null);
    const formRef = useRef<HTMLFormElement>(null);
    const successToastShownRef = useRef(false);

    useEffect(() => {
        if (!state) {
            successToastShownRef.current = false;
        }

        if (state?.success && !successToastShownRef.current) {
            successToastShownRef.current = true;
            toast.success(state.message || "Message sent successfully!");
            formRef.current?.reset();
        }
    }, [state]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
                <div className="flex flex-col justify-center  h-full p-6 lg:p-8 rounded-md bg-linear-to-br from-[#45aaa2]/10 to-transparent border border-[#45aaa2]/20">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 relative z-10">
                        Get in Touch
                    </h2>
                    <p className="text-muted-foreground mb-6 relative z-10">
                        Have questions or feedback? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                    </p>

                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border">
                            <div className="w-10 h-10 rounded-full bg-[#45aaa2]/20 flex items-center justify-center shrink-0">
                                <Mail className="h-5 w-5 text-[#45aaa2]" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="font-medium">support@eventra.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border">
                            <div className="w-10 h-10 rounded-full bg-[#45aaa2]/20 flex items-center justify-center shrink-0">
                                <Phone className="h-5 w-5 text-[#45aaa2]" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Phone</p>
                                <p className="font-medium">+880 1234-567890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 lg:p-8 rounded-md border shadow-lg bg-background">
                <form ref={formRef} action={formAction}>
                    <FieldGroup>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field className="sm:col-span-2">
                                <FieldLabel htmlFor="name">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-[#45aaa2]" />
                                        Full Name
                                    </div>
                                </FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    defaultValue={state?.formData?.name || ""}
                                    disabled={isPending}
                                    className="w-full"
                                />
                                <InputFieldError field="name" state={state} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-[#45aaa2]" />
                                        Email
                                    </div>
                                </FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    defaultValue={state?.formData?.email || ""}
                                    disabled={isPending}
                                    className="w-full"
                                />
                                <InputFieldError field="email" state={state} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="contactNumber">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-[#45aaa2]" />
                                        Contact Number
                                    </div>
                                </FieldLabel>
                                <Input
                                    id="contactNumber"
                                    name="contactNumber"
                                    type="text"
                                    placeholder="+880 1234-567890"
                                    defaultValue={state?.formData?.contactNumber || ""}
                                    disabled={isPending}
                                    className="w-full"
                                />
                                <InputFieldError field="contactNumber" state={state} />
                            </Field>

                            <Field className="sm:col-span-2">
                                <FieldLabel htmlFor="subject">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-[#45aaa2]" />
                                        Subject
                                    </div>
                                </FieldLabel>
                                <Input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    placeholder="How can we help you?"
                                    defaultValue={state?.formData?.subject || ""}
                                    disabled={isPending}
                                    className="w-full"
                                />
                                <InputFieldError field="subject" state={state} />
                            </Field>
                            <Field className="sm:col-span-2">
                                <FieldLabel htmlFor="message">Message</FieldLabel>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us what's on your mind..."
                                    defaultValue={state?.formData?.message || ""}
                                    disabled={isPending}
                                    className="w-full resize-none min-h-[120px]"
                                    rows={5}
                                />
                                <InputFieldError field="message" state={state} />
                            </Field>
                        </div>

                        <div className="mt-6">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-[#45aaa2] hover:bg-[#3c8f88] text-white font-medium py-3 rounded-lg transition-colors duration-200"
                            >
                                {isPending ? "Sending..." : "Send Message"}
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
