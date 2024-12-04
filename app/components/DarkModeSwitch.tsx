"use client";
import {SunIcon} from "@/app/components/icons/SunIcon";
import {MoonIcon} from "@/app/components/icons/MoonIcon";
import {Switch} from "@nextui-org/switch";
import {useEffect, useState} from "react";


export default function DarkModeSwitch() {
  const [isSelected, setIsSelected] = useState(false)
  
  useEffect(() => {
    if (isSelected) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [isSelected])
  
  return (
    <Switch
      isSelected={isSelected} onValueChange={setIsSelected}
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