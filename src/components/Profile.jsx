import { useEffect, useState } from "react"
import { getUser } from "../services/userService"
import './Profile.css'



export const Profile = ({currentUser}) => {
    const [allUsers, setAllUsers] = useState([])
    const [cUser, setCUser] = useState([])
    // const [bUser, setBUser] = useState([])

    const fetchAllUsers = async () => {
        try {
            const userArray = await getUser()
            setAllUsers(userArray)

            const currentUserProfile = userArray.filter(
                (user) => user.id === currentUser.id
            )
            setCUser(currentUserProfile)
        }

     catch (error) {
        console.error("Error fetching likes:", error);
    }

}


useEffect(() => {
    fetchAllUsers()
}, [])

 
return (
    <div className="Profile-container">
        <h2>Profile</h2>
            <div className="Profile-grid">
                {cUser.map((user) => (
                    <div key={user.id} className="Profile-item">
                        <p>Cohort: {user.cohort}</p>
                        <p>Name: {user.fullName}</p>
                        <p>Email: {user.email}</p>
                    </div>
                ))}
            </div>
    </div>
);

}






    


