export const getAllLikes = async () => {
    return fetch(`http://localhost:8088/userLikes?_expand=user&_expand=post`).then((res) => res.json())
}



export const createLikes = async (like) => {
    return fetch("http://localhost:8088/userLikes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(like),
    }).then((res) => res.json())
}

// console.log(getPostService())
