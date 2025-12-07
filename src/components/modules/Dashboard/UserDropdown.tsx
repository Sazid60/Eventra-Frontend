"use client";

import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";
import Image from "next/image";


interface UserDropdownProps {
  userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <span className="text-sm font-semibold">
            <Image
              src={userInfo.profilePhoto}
              alt={`${userInfo.name}'s avatar`}
              width={24}
              height={24}
              className="rounded-full"
            />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground">{userInfo.email}</p>
            <p className="text-xs text-primary capitalize">
              {userInfo.role.toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 justify-center"
        >
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
