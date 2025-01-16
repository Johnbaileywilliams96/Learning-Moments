import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostByPostId } from "./../services/PostService"
import "./PostDetails.css"
import { createLikes, getAllLikes } from "./../services/LikesService"



export const PostDetails = ({ currentUser }) => {
    const {postId} = useParams()
    // const navigate = useNavigate()
    const [post, setPost] = useState({})
    const [likes, setAllLikes] = useState([])
    const [postLikes, setPostLikes] = useState([])

    // const hasUserLiked = postLikes.some(like => like.userId === currentUser.id)

    // const isPostOwner = post.userId === currentUser.id
    const fetchAllLikes = async () => {
        getAllLikes().then((likesArray) => {
            setAllLikes(likesArray)
            // Filter likes for current post
            const currentPostLikes = likesArray.filter(like => like.postId === parseInt(postId))
            setPostLikes(currentPostLikes)
        })
    }

    const handleLike = async () => {
        if (currentUser) { 

            const newLike = {
                userId: currentUser.id,
                postId: parseInt(postId),
            }
            await createLikes(newLike)
        } 
        fetchAllLikes()

        }
    

useEffect(() => {
   fetchAllLikes()
}, [postId])


    useEffect(() => {
        getPostByPostId(postId).then((data) => {
            const singlePost = data[0]
            if (singlePost) {
                setPost(singlePost)
            }
        })
    }, [postId])

    return <>

    <h1>Post Details</h1>
    <section className="post">
        <header className="post-header">{post.user?.name}</header>
        <div>
        <span className="post-info">Title: </span>
                {post.title}
        </div>
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
            {postLikes.length}
        </div>
        <div>
            <button onClick={handleLike}>Like</button>
        </div>
    </section>
    </>

}