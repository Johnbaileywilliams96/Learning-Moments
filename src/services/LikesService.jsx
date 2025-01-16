export const getAllLikes = async () => {
    return fetch(`http://localhost:8088/userLikes?_expand=user&_expand=post`).then((res) => res.json())
}

// console.log(getPostService())
