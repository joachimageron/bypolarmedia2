"use client"
import {useEffect, useRef, useState} from "react";
import {
  Avatar,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  useDisclosure
} from "@heroui/react";
import SearchIcon from "@/app/components/icons/SearchIcon";
import {getSearchUsers} from "@/utils/data/user";
import {User} from "@prisma/client";
import {generateRandomKey} from "@/utils/utils";
import Link from "next/link";

export default function SearchButton() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [searchValue, setSearchValue] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedValue = useRef<string>(searchValue);
  
  useEffect(() => {
    const handler = setTimeout(async () => {
      setLoading(true);
      debouncedValue.current = searchValue;
      
      const users = searchValue && await getSearchUsers(debouncedValue.current);
      
      if (users) setUsers(users);
      else setUsers([]);
      setLoading(false);
    }, 200);
    
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  
  const handleClose = () => {
    setSearchValue('');
    setUsers([]);
    onOpenChange();
  }
  
  return (
    <>
      <button onClick={onOpen} className={'flex items-center justify-center'}>
        <SearchIcon className={"fill-zinc-50"}/>
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 pt-8">
            <Input
              autoFocus
              size={"lg"}
              value={searchValue}
              onValueChange={setSearchValue}
              placeholder="Search users"
              className="w-full pr-3"
              isClearable
            />
          </ModalHeader>
          <ModalBody>
            {loading && <Spinner/>}
            <ul>
              {users.map((user) => (
                <li key={generateRandomKey()}>
                  <Divider/>
                  <div className={"flex justify-between items-center p-3"}>
                    <Link href={`/profil/${user.id}`} onClick={() => handleClose()} className="flex gap-3">
                      <Avatar showFallback className={"z-0"} size="md" src={user.image ?? undefined}/>
                      <div className="flex items-center justify-start">
                        <h4 className="text-small font-semibold leading-none text-default-600">{user.name}</h4>
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}