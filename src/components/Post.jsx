import { Link } from "react-router-dom"
import "./Post.css"



export const Post = ({post, likes}) => {
    return <>
    <div className="post-list-item">
    
    <div>
    <Link to={`/postDetails/${post.id}`} key={post.id}>
        <div className="post-title-deetz">{post.title}</div>
    </Link>


    </div>
    <div className="body">
        <div className="post-info">Body: </div>
        <div>{post.body}</div>
    </div>
        <div className="likes">Likes: {likes.length}</div>
    </div>
    </>
}