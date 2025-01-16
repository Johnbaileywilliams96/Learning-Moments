import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/AllPosts"
import { NavBar } from "../components/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/PostDetails"

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
                    <Route index element={<PostDetails />} />
                </Route>
                {/* Other nested routes go here */}
            </Route>
        </Routes>
    )
}