

import { GetAllPostsQueryResult } from '@/sanity.types';
import { getUserPostVoteStatus } from '@/sanity/lib/posts/getUserPostVoteStatus';
import { getPostVotes } from '@/sanity/lib/votes/getPostVotes';


interface PostProps {
    post: GetAllPostsQueryResult[number],
    userId: string | null
}

async function Post({post, userId}: PostProps) {

  const votes = await getPostVotes(post._id);
  const vote =  await getUserPostVoteStatus(post._id,userId);
  const comments =  await getPostComments(post._id,userId)
  return (
    <div>Post</div>
  )
}

export default Post