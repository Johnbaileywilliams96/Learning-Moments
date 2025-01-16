export const getPostService = async () => {
    return fetch(`http://localhost:8088/posts`).then((res) => res.json())
}

export const getPostByPostId = async (postId) => {
    return fetch(`http://localhost:8088/posts?id=${postId}&_expand=user&_expand=topic`).then((res) => res.json())
}
