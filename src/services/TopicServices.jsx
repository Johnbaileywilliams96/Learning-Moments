export const getTopic = async () => {
    return fetch(`http://localhost:8088/topics`).then((res) => res.json())
}
