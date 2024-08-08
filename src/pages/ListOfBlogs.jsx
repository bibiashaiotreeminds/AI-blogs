import React, { useEffect, useState } from 'react';
import DisplayBlog from '../components/DisplayBlog';
import { useSelector, useDispatch } from "react-redux";
import { getBlogSchedule, getBlog, reset } from '../features/blog/blogSlice';


function ListOfBlogs() {

  const {blogs, blogScheduled, isLoading, isSuccess}= useSelector(
    (state) => state.blog
  );
  const dispatch = useDispatch();
  const allBlogs = [...blogs, ...blogScheduled];
  useEffect(() => {
  return ()=>{
    if(isSuccess){
      dispatch(reset());
    }
  }
  }, [dispatch, isSuccess]);

  useEffect(()=>{
    dispatch(getBlog());
    dispatch(getBlogSchedule());
    console.log(blogScheduled, "hiiiiiiiiiiiiiiiiiiiiiiiiii")
  }, [dispatch])

  const handlePost = () => {
    // navigate("/post");
  };

  const handleFeed = () => {
    // navigate("/feed");
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    // navigate("/login");
  };


  return (
    <div>
      <div>
        {allBlogs && [...allBlogs].reverse().map((blog) => (
          <React.Fragment key={blog.id}>
            
            {blog && (
              <DisplayBlog
                id={blog.id}
                title={blog.title}
                image={blog.image}
                content={blog.content}
                description={blog.description}
                slug={blog.slug}
                time={blog.time}
                date={blog.date}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ListOfBlogs;
