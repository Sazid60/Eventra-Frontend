"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { Calendar } from "lucide-react";
import { Input } from "../ui/input";

interface DateFilterProps {
    placeholder?: string;
    paramName?: string;
}

const DateFilter = ({ placeholder = "Date", paramName = "date" }: DateFilterProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const initial = searchParams.get(paramName) || "";

    console.log(placeholder)
    const [value, setValue] = useState<string>(initial);

    // Keep local value in sync when search params change externally
    useEffect(() => {
        const newVal = searchParams.get(paramName) || "";
        if (newVal !== value) {
            setValue(newVal);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, paramName]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const initialValue = searchParams.get(paramName) || "";

        if (value === initialValue) return;

        if (value) {
            params.set(paramName, value); // ?date=YYYY-MM-DD
            params.set("page", "1");
        } else {
            params.delete(paramName);
            params.delete("page");
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, paramName, router]);

    return (
        <div className="relative">
            <Input
                type="date"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="uppercase text-muted-foreground"
                aria-label="SELECT DATE"
            />
        </div >
    );
};

export default DateFilter;