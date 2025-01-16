import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/AllPosts"
import { NavBar } from "../components/NavBar/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/PostDetails"
import { NewPost } from "../components/NewPost"
import { MyPost } from "../components/MyPost"
import { Favorites } from "../components/Favorites"


export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})



    useEffect(() => {
      const localLearningUser = localStorage.getItem("learning_user")
      const learningUserObject = JSON.parse(localLearningUser)
      setCurrentUser(learningUserObject)
    }, [])


    return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }>
                <Route path="allPosts">
                    <Route index element={<AllPosts currentUser={currentUser} />} />
                </Route>

                <Route path="postDetails/:postId">
                    <Route index element={<PostDetails currentUser={currentUser} />} />
                </Route>
                <Route path="newPost">
                    <Route index element={<NewPost currentUser={currentUser} />} />
                </Route>
                <Route path="myPosts">
                    <Route index element={<MyPost currentUser={currentUser} />} />
                </Route>
                <Route path="favorites">
                    <Route index element={<Favorites currentUser={currentUser} />} />
                </Route>
                <Route path="profile">
                    <Route index element={<Favorites currentUser={currentUser} />} />
                </Route>
                {/* Other nested routes go here */}
            </Route>
        </Routes>
    )
}