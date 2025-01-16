export const getPostService = async () => {
    return fetch(`http://localhost:8088/posts`).then((res) => res.json())
}

export const getPostByPostId = async (postId) => {
    return fetch(`http://localhost:8088/posts?id=${postId}&_expand=user&_expand=topic`).then((res) => res.json())
}

export const updatePost = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(res => res.json())
}

export const createNewPost = async (post) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    }).then((res) => res.json())
}

export const getUserPosts = async (userId) => {
    const response = await fetch(`http://localhost:8088/posts?userId=${userId}`); // Adjust URL to match your API
    if (!response.ok) {
      throw new Error("Failed to fetch user posts");
    }
    return await response.json();
  };

  export const deleteMyPost = (post) => {
    return fetch(`http://localhost:8088/posts/${post}`, {
        method: "DELETE"
    })
}