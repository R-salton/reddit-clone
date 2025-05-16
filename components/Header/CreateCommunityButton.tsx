'use client'

import React from 'react'

  import { Button } from "@/components/ui/button"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import {useUser} from '@clerk/nextjs';
import { Plus } from 'lucide-react';  

const CreateCommunityButton = () => {
    const {user} = useUser();
  return (
   

    <Dialog>
      <DialogTrigger className='w-full bg-black text-white pl-5 p-2 flex items-center rounded-md cursor-pointer hover:bg-black transition-all duration-200 disabled:text-sm disabled:opacity-50 disabled:cursor-not-allowed' disabled={!user} asChild>
        <Button variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        {user ? "Create a Community" : "Sign in to create community"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a community</DialogTitle>
            
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-center">
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}



export default CreateCommunityButton