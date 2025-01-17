import "./AllPosts.css"

export const HandlePostSearch = ({setSearchTerm}) => {
    return <>
    <input
    onChange={(event) => {
        setSearchTerm(event.target.value)
    }}
  type="text"
  placeholder="Search Posts"
  className="post-search"
  />     
    </>
}