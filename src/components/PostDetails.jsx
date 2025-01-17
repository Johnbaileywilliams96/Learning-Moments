import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostByPostId } from "./../services/PostService";
import "./PostDetails.css";
import {
  createLikes,
  deleteLike,
  getAllLikes,
} from "./../services/LikesService";

export const PostDetails = ({ currentUser }) => {
  const { postId } = useParams();
//   const navigate = useNavigate()
  const [post, setPost] = useState({});
  const [likes, setAllLikes] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
//   const [isEditing, setIsEditing] =useState(false)
//   const [editedPost, setEditedPost] = useState({})

  const hasUserLiked = postLikes.some((like) => like.userId === currentUser.id);

//   const isPostOwner = post.userId === currentUser.id;

  const fetchAllLikes = async () => {
    getAllLikes().then((likesArray) => {
      setAllLikes(likesArray);
      // Filter likes for current post
      const currentPostLikes = likesArray.filter(
        (like) => like.postId === parseInt(postId)
      );
      setPostLikes(currentPostLikes);
    });
  };

  const handleLike = async () => {
    if (!currentUser) return;

    if (hasUserLiked) {
      const likeToDelete = postLikes.find(
        (like) => like.userId === currentUser.id
      );
      if (likeToDelete) {
        await deleteLike(likeToDelete.id);
      }
    } else {
      const newLike = {
        userId: currentUser.id,
        postId: parseInt(postId),
      };
      await createLikes(newLike);
    }
    fetchAllLikes();
  };

//   const handleEdit = async () => {
//     setIsEditing(true)
//     setEditedPost({...post})
//   }

//   const handleSave = async () => {
//     await updatePost(editedPost)
//     setPost(editedPost)
//     setIsEditing(false)
//   }

  useEffect(() => {
    fetchAllLikes();
  }, [postId]);

  useEffect(() => {
    getPostByPostId(postId).then((data) => {
      const singlePost = data[0];
      if (singlePost) {
        setPost(singlePost);
      }
    });
  }, [postId]);

  return (
    <>
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
          <button onClick={handleLike} className={hasUserLiked ? "liked" : ""}>
            {hasUserLiked ? "Unlike" : "Like"}
          </button>
           <Link to="/allposts">
          <button>
            <span>All posts</span>
          </button>
           </Link>
      
        </div>
      </section>
    </>
  ); 
};
