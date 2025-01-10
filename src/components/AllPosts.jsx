import { useEffect } from "react"
import { useState } from "react"
import { getPostService } from "../services/PostService"
import { Post } from "./Post"
import { getTopic } from "../services/TopicServices"



export const AllPosts = () => {
    const [posts, setAllPosts] = useState([])
    const [topics, setAllTopics] = useState([])
    
        const fetchAllPosts = async () => {
            getPostService().then((postArray) => 
                setAllPosts(postArray))
            
        }

        const fetchAllTopics = async () => {
            getTopic().then((topicArray) => 
                setAllTopics(topicArray))
            
        }



    useEffect(() => {
       fetchAllPosts()
       fetchAllTopics()
       
    }, [])




    return <>

<h2>All Posts</h2>

<input
//   onChange={(event) => {
//     setSearchTerm(event.target.value)

//   }}
  type="text"
  placeholder="Search Posts"
  className="post-search"
  /> 

<div>
        <select id="topics">
        <option value="0">Choose Topic</option>
        ${topics.map(
            (topic) => {
                return <option value={topic.id}>{topic.topicName}</option>
            }
        )}
        </select>
        </div>




    <div className="post">{posts.map((post) => {

        return <>
        <Post post={post}/>
        </>
    })}
    
    </div>
    
    </>


}