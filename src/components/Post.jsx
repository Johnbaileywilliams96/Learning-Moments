import "./allPosts.css"



export const Post = ({post}) => {
    return <>
    <div className="post-list-item">
    
    <div>
        <div className="post-info">Title</div>
        <div>{post.title}</div>
    </div>
    <div>
        <div className="post-info">Body</div>
        <div>{post.body}</div>
    </div>
    </div>
    </>
}