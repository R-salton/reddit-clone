import * as React from "react"
import { FlameIcon, GalleryVerticalEnd, Home, Minus, Plus, TrendingUp } from "lucide-react"
import ReddishLogo from '@/images/Reddish Logo Only.png';
import ReddishFull from '@/images/Reddish Full.png';

import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link";
import { getSubreddits } from "@/sanity/lib/subreddits/subReddits";

type sideBarData ={
  navMain: 
  {
    title: string,
    url: string,
    items: {
      title: string,
      url: string,
      isActive: boolean
    }[];
  }[];
}

// This is sample data.
const sideBarData = {
  navMain: [
    {
      title: "Communities",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
          isActive: true ,
        },
        {
          title: "Project Structure",
          url: "#",
          isActive: false,
        },
      ],
    },
    
      ],
    }
    
    
    



export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const subreddits = await getSubreddits();

  console.log(subreddits);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-lg">
                <Link href="/">
                <Image src={ReddishFull} alt="Logo" width={80} height={80} />
                </Link>
                </div>
                {/* <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-xl" style={{color: "#e2643b"}}>Reddish</span>
                  <span className=""></span>
                </div> */}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
               {/* TODO: add Community Button */}
               {/* <CreateComunityButton /> */}
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <Link href="#">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Popular</span>
                  </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <FlameIcon className="mr-2 h-4 w-4" />
                  <span>Hot/Cotrovetial</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            {sideBarData.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
