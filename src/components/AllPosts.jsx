import { useEffect } from "react";
import { useState } from "react";
import { getPostService } from "./../services/PostService";
import { Post } from "./Post";
import { getTopic } from "./../services/TopicServices";
import { HandlePostSearch } from "./PostSearch";
import { getAllLikes } from "./../services/LikesService";
import "./allPosts.css";

export const AllPosts = () => {
  const [posts, setAllPosts] = useState([]);
  const [topics, setAllTopics] = useState([]);
  const [filteredPosts, setAllFilteredPosts] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState("0");
  const [searchTerm, setSearchTerm] = useState("");
  const [likes, setAllLikes] = useState([]);

  const fetchAllPosts = async () => {
    getPostService().then((postArray) => {
      setAllPosts(postArray);
      setAllFilteredPosts(postArray);
    });
  };

  const fetchAllTopics = async () => {
    getTopic().then((topicArray) => setAllTopics(topicArray));
  };

  const fetchAllLikes = async () => {
    getAllLikes().then((likesArray) => {
      setAllLikes(likesArray);
    });
  };

  useEffect(() => {
    fetchAllPosts();
    fetchAllTopics();
    fetchAllLikes();
  }, []);

//   const filterPosts = () = {
//     const filtered = [...posts]
//     if (selectedTopicId == "0") {
//         filtered = filtere
//     }
//   }

  const handleTopicChange = (event) => {
    const topicId = event.target.value;
    setSelectedTopicId(topicId);

    if (topicId === "0") {
      setAllFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) => post.topicId === parseInt(topicId)
      );
      setAllFilteredPosts(filtered);
    }
  };

  useEffect(() => {
    const foundPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAllFilteredPosts(foundPosts);
  }, [searchTerm, posts]);
  return (
    <>
    <div className="my-posts-container">

      <h1>All Posts</h1>

      <HandlePostSearch setSearchTerm={setSearchTerm} />

      <div className="topics-dropdown">
        <select
          id="topics"
          value={selectedTopicId}
          onChange={handleTopicChange}
        >
          <option value="0">All Topics</option>$
          {topics.map((topic) => {
            return (
              <option value={topic.id} key={topic.id}>
                {topic.topicName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="post">
        {filteredPosts.map((post) => {
          const postLikes = likes.filter((like) => like.postId === post.id);
          return (
            
              <Post post={post} key={post.id} likes={postLikes} />
            
          );
        })}
      </div>
    </div>
    </>
  );
};
