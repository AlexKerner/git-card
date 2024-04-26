import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/services/axios";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ModeToggle } from "./toggle/mode-togle";
import { CaretRightIcon } from "@radix-ui/react-icons";

interface IUser {
  login: string;
  name: string;
  id: number;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
  html_url: string
}

export const CardUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.get(`${searchValue}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="flex flex-col mt-[5%] justify-center items-center ">
      <div className="flex flex-col gap-2 justify-center w-8/12 m-auto">
        <div>
          <form onSubmit={handleSearch} className="flex gap-1">
            <Input
              value={searchValue}
              onChange={handleSearchChange}
              className="p-3 shadow"
              placeholder="Search for users on GitHub"
            />
            <Button
              type="submit"
              variant="outline"
              className="shadow hover:bg-zinc-950 hover:text-white duration-200 dark:hover:bg-zinc-50 dark:hover:text-black"
            >
              Search
            </Button>
          </form>
        </div>
        <Card className="shadow-lg">
          <CardTitle className="m-3">
            <div className="flex justify-between items-center">
              <h3 className="scroll-m-20 ml-2 text-2xl font-semibold tracking-tight">
                {user?.login}
              </h3>
              <div className="mr-">
                <ModeToggle />
              </div>
            </div>
          </CardTitle>

          <CardHeader className="flex items-center mb-2">
            <Avatar className="w-[12rem] h-[12rem]">
              <AvatarImage src={user?.avatar_url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <p className="text-lg font-medium">{user?.name}</p>
            {user?.bio && <p className=" line-clamp-2 text-sm">{user.bio}</p>}
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <p>Followers: {user?.followers}</p>
            <p>Following: {user?.following}</p>
            <p>Public Repository: {user?.public_repos}</p>
          </CardFooter>
          <div className="flex justify-end mr-4 mb-4">
             <a href={user?.html_url} target="_blank" className="font-semibold flex items-center gap-1 border pl-4 pr-2 py-2 rounded-[6px] shadow hover:bg-zinc-950 hover:text-white duration-200 dark:hover:bg-zinc-50 dark:hover:text-black">Visit profile <CaretRightIcon className="font-bold"/> </a>
          </div>
         
        </Card>
      </div>
    </div>
  );
};
