import React, { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { createBlog, getBlogSchedule, reset  } from "../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Labels() {
  const [checkedItems, setCheckedItems] = React.useState({});

  function handleChange(blogId) {
      setCheckedItems(prevState => ({
          ...prevState,
          [blogId]: !prevState[blogId] 
      }));
  }

    const {blogScheduled, isError, isSuccess}=useSelector(
    (state)=>state.blog
  );

  const dispatch=useDispatch()

  useEffect(()=>{
    return()=>{
      if(isSuccess){
        dispatch(reset());
      }
    }
  },[dispatch, reset])

  // const fetchBlogSchedule = () => {
  //   dispatch(getBlogSchedule());   
  //   console.log(blogs) 
  // }

  useEffect(() => {
    dispatch(getBlogSchedule()); 
    // console.log(blogs)
  }, [dispatch])

  // useEffect(()=>{
  //   fetchBlogSchedule()
  // },[])

  const { labels, updateLabel } = useContext(GlobalContext);
  useEffect(()=>{
console.log(Labels)
  },[Labels])
  return (
    <React.Fragment>
      <div className="mt-10">
  <p className="text-gray-500 font-bold">Label</p>
  <div className="mt-6">
    {blogScheduled.map((blog, index) => (
      <div key={blog.id} className={`block items-center ${index !== 0 ? 'mt-4' : ''}`}>
        <span className="text-gray-500 font-bold">{blog.title}</span>
      </div>
    ))}
  </div>
</div>


    </React.Fragment>
  );
}
