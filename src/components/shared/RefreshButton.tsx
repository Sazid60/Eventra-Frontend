"use client";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { revalidateAllData } from "@/services/revalidate";


interface RefreshButtonProps {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  showLabel?: boolean;
}

const RefreshButton = ({
  size = "default",
  variant = "default",
  showLabel = true,
}: RefreshButtonProps) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleRefresh = async () => {
    setIsPending(true);
    try {
      await revalidateAllData();
      const url = new URL(window.location.href);
      window.location.href = url.toString();
    } catch (error) {
      console.error("Refresh failed:", error);
      setIsPending(false);
      router.refresh();
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleRefresh}
      disabled={isPending}
      className="bg-background hover:bg-background text-muted-foreground"
    >
      <RefreshCcw
        className={`h-4 w-4 ${isPending ? "animate-spin" : ""} ${showLabel ? "mr-1" : ""
          }`}
      />
      {showLabel && "Refresh"}
    </Button>
  );
};

export default RefreshButton;
