"use client";

import { PostList } from "@/components/PostList/postList";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";


export default function Home() {
  const {user} = useUser();
  return (
    <>
    {/* Barnner Section */}
    <section className="bg-white border-b">
      <div className="mx-aut0 max-w-7xl px-4 py-6">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold">Home</h1>
            <p className="text-sm text-gray-680">Recent posts from al communities</p>
          </div>

        </div>
        
      </div>
    </section>

    {/* Post Section */}

    <section className="my-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-4">
          <PostList />

        </div>
      </div>
    </section>
    </>
  );
}
