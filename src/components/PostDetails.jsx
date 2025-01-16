import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostByPostId } from "../services/PostService"
import "./PostDetails.css"



export const PostDetails = () => {
    const {postId} = useParams()
    const [post, setPost] = useState({})
    


    useEffect(() => {
        getPostByPostId(postId).then((data) => {
            const singlePost = data[0]
            if (singlePost) {
                setPost(singlePost)
            }
        })
    }, [postId])

    return <>
    <section className="post">
        <header className="post-header">{post.user?.name}</header>
        <div>
            <span className="post-info">Body: </span>
            {post.body}
        </div>
        <div>
            <span className="post-info">Topic: </span>
            {post.topic?.topicName}
        </div>
        <div>
            <span className="post-info">Date: </span>
            {post.date}
        </div>
        <div>
            <span className="post-info">Likes: </span>
            {post.likes}
        </div>
    </section>
    </>

}