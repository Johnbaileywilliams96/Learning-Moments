import { useEffect, useState } from "react";
import { deleteMyPost, getUserPosts } from "../services/PostService";
import "./MyPost.css"
import { Link } from "react-router-dom";


export const MyPost = ({ currentUser }) => {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
      const fetchUserPosts = async () => {
          const posts = await getUserPosts(currentUser.id);
          setUserPosts(posts);

      };
  
      fetchUserPosts();
    }, [currentUser.id]); // Dependencies array includes currentUser.id if it might change

    const handleDeletedPost = async (postId) => {
        try {
            await deleteMyPost(postId)
            setUserPosts(userPosts.filter(post => post.id !== postId))

        } catch (error) {
            console.error("Error deleting post:", error)
        }
    }
  
    return (
      <div className="my-posts-container">
        <h1>My Posts</h1>
        {userPosts.length === 0 ? (
          <p>You haven't created any posts yet.</p>
        ) : (
          userPosts.map(post => (
            <div key={post.id} className="post-card">
            <Link to={`/postDetails/${post.id}`} key={post.id}>
              <h2>{post.title}</h2>
            </Link>
              <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
              <p className="post-body">{post.body}</p>
              <button
              className="post-delete"
              onClick={() => handleDeletedPost(post.id)}
              >
                Delete
              
              </button>
            </div>
          ))
        )}
      </div>
    );
  };