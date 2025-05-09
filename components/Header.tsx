'use client'

import React from 'react'
import { SignedIn, UserButton, useUser, SignedOut, SignInButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import ReddishFull from '@/images/Reddish Full.png';
import ReddishLogo from '@/images/Reddish Logo Only.png';
import ReddishText from '@/images/Reddish Text Only.png';
import Image from 'next/image';
import { MenuIcon } from 'lucide-react';


const Header = () => {
    const  {user} = useUser();
  return (
    <header className="flex justify-center ">

        {/* LEft side */}
        <div>
        <MenuIcon className='h-6 w-6' />
        <Image src={ReddishLogo} alt="Reddish Logo" className='hidden md:block' height={50} width={50} />  
        <Image src={ReddishText} alt="Reddish Logo" className='block md:hidden' height={40} width={40} />

        </div>
        {/* Right side */}
        <div>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <Button asChild variant="outline">
                    <SignInButton mode="modal" />
                </Button>
            </SignedOut>
        </div>
    </header>
  )
}

export default Header