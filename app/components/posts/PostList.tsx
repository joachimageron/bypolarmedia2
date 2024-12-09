import {PostsByUser} from "@/utils/types/data";
import PostCard from "@/app/components/posts/PostCard";


export const PostList = ({posts}: { posts: PostsByUser }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} displayFollow={false}/>
        </li>
      ))}
    </ul>
  )
}