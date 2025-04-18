import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Blog from './Blog'
// import CommentSection from './CommentSection'
export default function Blogs() {

  const [blogs, setBlogs] = useState()

  const sendRequest = async () => {
    /* const res = await axios.get("https://mern-blog-app-2022.herokuapp.com/api/blog").catch((err) => {console.log(err)}); */
    const res = await axios.get("http://localhost:5000/api/blog").catch((err) => {console.log(err)});
    const data = await res.data;
    return data
  }

  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs))

  }, [])
  //console.log(blogs)
  
  return (
    <div>
     {blogs &&
  blogs.map((blog, index) => (
    
    <div key={index}>
      <Blog
        isUser={localStorage.getItem("userId") === blog.user._id}
        blogId={blog._id}
        title={blog.title}
        description={blog.description}
        imageURL={blog.image}
        userName={blog.user.name}
        blog_Date={blog.updatedAt}
      />
     {/* <CommentSection blogId={blog._id} /> */}
    </div>
  ))}

    </div>
  )
}
