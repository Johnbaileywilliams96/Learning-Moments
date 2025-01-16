import { Link } from "react-router-dom"
import "./allPosts.css"



export const Post = ({post, likes}) => {
    return <>
    <div className="post-list-item">
    
    <div>
    <Link to={`/postDetails/${post.id}`} key={post.id}>
        <div className="post-info">Title</div>
    </Link>

        <div>{post.title}</div>

    </div>
    <div>
        <div className="post-info">Body</div>
        <div>{post.body}</div>
    </div>
        <div className="likes">Likes: {likes.length}</div>
    </div>
    </>
}