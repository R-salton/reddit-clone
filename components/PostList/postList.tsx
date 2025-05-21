import React from 'react'
import { currentUser } from '@clerk/nextjs/server'



async function PostList() {
    const user = await currentUser();
    const posts = await getPosts();
  return (
    <div>PostList</div>
  )
}

export default PostList
