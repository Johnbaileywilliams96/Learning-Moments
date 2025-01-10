export const getPostService = async () => {
    return fetch(`http://localhost:8088/posts`).then((res) => res.json())
}


console.log(getPostService())