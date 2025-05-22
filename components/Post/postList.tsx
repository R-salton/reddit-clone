
import { getPosts } from '@/sanity/lib/posts/getPost';
import Post from './post';
import {currentUser} from '@clerk/nextjs/server';



async function PostList() {
   
    const posts = await getPosts();
    const user =  await currentUser();
  return (
    <div className='space-y-4'>
        {
            posts.map((post)=>(
                <Post key={post._id} post={post} userId={user?.id || null} />
            ))
        }
      
    </div>
  )
}

export default PostList
