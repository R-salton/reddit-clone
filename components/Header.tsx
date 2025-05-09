'use client'

import React from 'react'
import { SignedIn, UserButton, useUser, SignedOut, SignInButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import ReddishFull from '@/images/Reddish Full.png';
import ReddishLogo from '@/images/Reddish Logo Only.png';
import ReddishText from '@/images/Reddish Text Only.png';
import Image from 'next/image';
import { ArrowBigLeft, ChevronLeft, MenuIcon } from 'lucide-react';
import { useSidebar } from './ui/sidebar';


const Header = () => {
    const  {user} = useUser();
    const {toggleSidebar,open, isMobile} = useSidebar();
  return (
    <header className="flex justify-between items-center p-2 border-b border-grey-200">

        {/* LEft side */}
        
        <div className='flex items-center gap-2'>
            {
                open && !isMobile ? <ChevronLeft className='h-6 w-6' onClick={toggleSidebar}  />  :
            
         

        
        <div className="flex items-center gap-2">

        <MenuIcon className='h-6 w-6' onClick={toggleSidebar}  />
        <Image src={ReddishFull} alt="Reddish Logo" className='hidden md:block' height={80} width={80} />
        <Image src={ReddishText} alt="Reddish Logo" className='block md:hidden' height={40} width={40} />
        </div>
        
            }
        </div>
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

        {/* Right side */}
        
    </header>
  )
}

export default Header