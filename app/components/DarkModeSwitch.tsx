"use client";
import {SunIcon} from "@/app/components/icons/SunIcon";
import {MoonIcon} from "@/app/components/icons/MoonIcon";
import {Switch} from "@heroui/switch";
import {useEffect, useMemo} from "react";
import {useUser} from "@/app/components/providers/UserProvider";
import {toggleDarkMode} from "@/utils/data/user";



export default function DarkModeSwitch() {
  const {user, setUser} = useUser();
  const isSelected = useMemo(() => user?.darkMode ?? false, [user]);
  
  useEffect(() => {
    if (isSelected) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [isSelected])
  
  const handleDarkMode = async () => {
    const toggledUser = await toggleDarkMode();
    if (toggledUser) {
      setUser(prevUser => ({
        ...prevUser,
        ...toggledUser,
        following: prevUser!.following,
        followers: prevUser!.followers,
      }));

    }
  }
  
  return (
    <Switch
      isSelected={isSelected} onValueChange={handleDarkMode}
      className={"flex items-center justify-center"}
      defaultSelected
      size="sm"
      color="warning"
      thumbIcon={
        isSelected ? (
          <SunIcon />
        ) : (
          <MoonIcon/>
        )
      }
    />
  )
}