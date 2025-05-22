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
import { Plus, FileTextIcon, Router } from 'lucide-react';  
import { useState,useTransition } from 'react';


import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { createCommunity } from '@/action/createCommunity';
 import { useRouter } from 'next/navigation';



const CreateCommunityButton = () => {
    const {user} = useUser();
    const [errorMessage,setErrorMessage] = useState("");
    const [name,setName] = useState(""); 
    const [slug,setSlug] = useState("");
  const [description,setDescription] = useState("");
  const [imagePreview,setImagePreview] = useState<string | null>(null);
  const [imageFile,setImageFile] = useState<File | null>(null);
  const [isLoading,startTransition] = useTransition();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [open,setOpen] = useState(false);
   const router = useRouter();


   

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      setName(value);

      //Automatically generate slug
      if(!slug || slug === generateSlug(name)){
        setSlug(generateSlug(value));

      }
     
    }

      const  generateSlug = (text: string) => {  
      return text
        .toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g,"").slice(0,21);
        };

  
        const removeImage = () => {
          setImagePreview(null);
          setImageFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        };


        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              setImagePreview(result);
            };
            reader.readAsDataURL(file);

          }
        };

        const resetForm = () => {
          setName("");
          setSlug("");
          setDescription("");
          setImagePreview(null);
          setImageFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        };
         

      const handleCreateCommunity= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!name.trim()){
          setErrorMessage("Community name is Required");
          return;
        }
        
        if(!slug.trim()){
          setErrorMessage("Community slug is Required");
          return;
        }

        setErrorMessage("");

        startTransition( async() => {
          try{
            let imageBase64: string | null = null;
            let fileName: string | null = null;
            let fileType: string | null = null;

            if(imageFile){
              const reader = new FileReader();
              imageBase64 = await new Promise<string>((resolve)=>{
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(imageFile);
              });
              fileName = imageFile.name;
              fileType = imageFile.type;
              
            }

            const result = await createCommunity(
              name.trim(),
              imageBase64,
              fileName,
              fileType,
              slug.trim(),
              description.trim() || undefined
            );

            if("error" in result && result.error){
              setErrorMessage(result.error);

            } else if ("subreddit" in result && result.subreddit){
              setOpen(false);
              resetForm();
              router.push(`/community/${result.subreddit.slug?.current}`)

              
            }

          }catch(error){
            console.error("Failed to create community",error);
            setErrorMessage("Failed to create community")
          }

        })

      };
  
   
  return (
   

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='w-full pl-5 p-2 flex items-center rounded-md cursor-pointer bg-black text-white  hover:bg-black transition-all duration-200 disabled:text-sm disabled:opacity-50 disabled:cursor-not-allowed' disabled={!user} asChild>
        <Button variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        {user ? "Create a Community" : "Sign in to create community"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a community</DialogTitle>
            
          <DialogDescription>
           Create a community/subreddit to share ideas and get feedback
          </DialogDescription>
        </DialogHeader>
        {
          errorMessage && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{errorMessage}</h3>
                </div>
              </div>
            </div>
          )
        }
       <form onSubmit={handleCreateCommunity} className="space-y-4 mt-2">
         
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 align-center">Community Name</Label>
            <Input name="name" id="name" value={name} className="w-full focus:ring-2 focus:ring-blue-500" placeholder='My community' required onChange={handleNameChange} minLength={3} maxLength={21} />
         
         
           <Label htmlFor="slug" className="text-sm font-medium text-gray-700">Community Slug</Label>
            <Input  name="slug" value={slug} className="col-span-3" placeholder="Community slug" onChange={(e) => setSlug(e.target.value)} />
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
            <Textarea id="description" name="description"  placeholder="What is is tis community about?." className="w-full focus:ring-2 focus:ring-blue-500" value={description} rows={3} onChange={(e)=> setDescription(e.target.value)} />
         </div>

         {/* Image  */}
         <div className="space-y-2">
          <Label htmlFor="image" className="text-sm mt-2 text-gray-700 font-medium">Community image(Optional)</Label>

          {
            imagePreview ? (
              <div className="relative w-24 h-24 mx-auto">
                <Image src={imagePreview} alt="Community preview" fill className="object-cover rounded-full" />
                <button type="button" onClick={removeImage} className="absolute top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">X</button>

              </div>
            ) : (
              <div className="flex items-center justify-center  w-full">
                <Label  htmlFor="community-image" className="flex flex-col item-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg 
                cursor-pointer  bg-gray-50 hover:bg-gray-100" >
                  <div className="flex flex-col items-center justif-center">
                    <ImageIcon className="w-6 h-6 mb-2 text-gray-400" />
                    <p className="text-xs text-gray-500">Click to upload an image</p>
                  </div>
                  <input
                    name='community-image'
                    id="community-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    title="Upload community image"
                    placeholder="Choose an image file"
                  />
                </Label>

              </div>
              
            )
          }

          
         </div>

          <Button className="w-full mt-4 hover:bg-black-600" type="submit" disabled ={isLoading || !user}>
            {
              isLoading ? "Creating..." : user ? "Create Community" : "Sign in to create community"
            }
          </Button>

       </form>
       
      </DialogContent>
    </Dialog>
  )
}



export default CreateCommunityButton