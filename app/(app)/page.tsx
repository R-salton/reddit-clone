"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";


export default function Home() {
  const {user} = useUser();
  return (
    <div className="">
     <h1>Hello Sadev {user?.emailAddresses[0].emailAddress}</h1>
     <Button>Click me</Button>


    </div>
  );
}
