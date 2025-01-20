import { useState, useEffect } from "react";
import { getAllLikes } from "../services/LikesService";
import "./Favorites.css"

export const Favorites = ({ currentUser }) => {
    const [allLikes, setAllLikes] = useState([]);
    const [userLikes, setUserLikes] = useState([]);

    const fetchAllLikes = async () => {
        try {
            const likesArray = await getAllLikes();
            setAllLikes(likesArray);
            
            // Filter likes to only show current user's likes
            const currentUserLikes = likesArray.filter(
                (like) => like.userId === currentUser.id
            );
            setUserLikes(currentUserLikes);
        } catch (error) {
            console.error("Error fetching likes:", error);
        }
    };

    // Fetch likes when component mounts
    useEffect(() => {
        fetchAllLikes();
    }, []); // Empty dependency array since we only need to fetch once

    return (
        <div className="favorites-container">
            <h2>Your Favorites</h2>
            {userLikes.length === 0 ? (
                <p>You haven't liked any posts yet!</p>
            ) : (
                <div className="favorites-grid">
                    {userLikes.map((like) => (
                        <div key={like.id} className="favorite-item">
                            {/* Display the liked post information */}
                            <p>Post ID: {like.postId}</p>
                            {/* Add more post details here based on your data structure */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};