import { useEffect, useState } from "react";
import { getTopic } from "../services/TopicServices";
import "./NewPost.css"
import { createNewPost } from "../services/PostService";


export const NewPost = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topics, setAllTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState("0");

  const fetchAllTopics = async () => {
    getTopic().then((topicArray) => setAllTopics(topicArray));
  };

  useEffect(() => {
    fetchAllTopics();
  }, []);

  const handleTopicChange = (event) => {
    const topicId = event.target.value;
    setSelectedTopicId(topicId);
  };

  const handleNewPost = () => {
    if (!title && selectedTopicId === "0" && !body) {
        window.alert("fill in new post")
    } else {
        const newPost = {
            title: title,
            body: body,
            topicId: parseInt(selectedTopicId),
            userId: currentUser.id,
            date: new Date().toISOString()
        }
        createNewPost(newPost)
        .then(() => {
            // Clear form
            setTitle("")
            setBody("")
            setSelectedTopicId("0")
            
            // Show success message
            window.alert("Post created successfully!")
            
            // Optionally redirect to posts list
            // navigate("/posts")  // Requires importing useNavigate from react-router-dom
        })
        .catch(error => {
            window.alert("Failed to create post: " + error.message)
        })
    }
  }

  return (
    <>
    <div className="new-post-container">

      <h1>New Post</h1>


      <div className="input-group">
        <span className="post-title">Title: </span>
        <input
          type="text"
          placeholder="Enter post title..."
          className="post-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <select
          id="topics"
          value={selectedTopicId}
          onChange={handleTopicChange}
        >
          <option value="0">Topic</option>$
          {topics.map((topic) => {
            return (
              <option value={topic.id} key={topic.id}>
                {topic.topicName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="input-group">
  <span className="input-label">Body: </span>
  <textarea
    placeholder="Enter post body"
    className="post-body-input"
    value={body}
    onChange={(e) => setBody(e.target.value)}
  />
</div>

      <div>
          <button 
          className="post-save"
          onClick={handleNewPost}
          >
            Save
          </button>
     </div>
    </div>



    </>
  );
};
