import { useEffect } from "react"
import { useState } from "react"
import { getPostService } from "../services/PostService"
import { Post } from "./Post"
import { getTopic } from "../services/TopicServices"
import { HandlePostSearch } from "./PostSearch"



export const AllPosts = () => {
    const [posts, setAllPosts] = useState([])
    const [topics, setAllTopics] = useState([])
    const [filteredPosts, setAllFilteredPosts] = useState([])
    const [selectedTopicId, setSelectedTopicId] = useState("0")
    const [searchTerm, setSearchTerm] = useState('')
    
        const fetchAllPosts = async () => {
            getPostService().then((postArray) => {
                setAllPosts(postArray)
                setAllFilteredPosts(postArray)
            })
            
        }

        const fetchAllTopics = async () => {
            getTopic().then((topicArray) => 
                setAllTopics(topicArray))
            
        }



    useEffect(() => {
       fetchAllPosts()
       fetchAllTopics()
    }, [])


    useEffect(() => {
        const foundPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setAllFilteredPosts(foundPosts)
    }, [searchTerm, posts])




    const handleTopicChange = (event) => {
        const topicId = event.target.value
        setSelectedTopicId(topicId)

        if (topicId === "0") {
            setAllFilteredPosts(posts)
        } else {
            const filtered = posts.filter(post => post.topicId === parseInt(topicId))
            setAllFilteredPosts(filtered)
        }
    }


    return <>

<h2>All Posts</h2>

<HandlePostSearch setSearchTerm={setSearchTerm}/>

<div>
        <select 
        id="topics"
        value={selectedTopicId}
        onChange={handleTopicChange}
        >
        <option value="0">All Topics</option>
        ${topics.map(
            (topic) => {
                return <option value={topic.id} key={topic.id}>{topic.topicName}</option>
            }
        )}
        </select>
        </div>




    <div className="post">{filteredPosts.map((post) => {

        return <>
        <Post post={post} key={post.id}/>
        </>
    })}
    
    </div>
    
    </>


}