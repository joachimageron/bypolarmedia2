import {getPostsByUser} from "@/utils/types/data";
import PostCard from "@/app/components/PostCard";


export const PostList = ({posts}: { posts: getPostsByUser }) => {
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