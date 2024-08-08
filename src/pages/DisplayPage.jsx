import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogSchedule, getBlog, reset } from "../features/blog/blogSlice";

function DisplayPage() {
  const { blogs, blogScheduled, isLoading, isSuccess } = useSelector(
    (state) => state.blog
  );
  const dispatch = useDispatch();
  const allBlogs = [...blogs, ...blogScheduled];
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getBlog());
    dispatch(getBlogSchedule());
    console.log(blogScheduled, "hiiiiiiiiiiiiiiiiiiiiiiiiii");
  }, [dispatch]);

  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [data, setData] = useState({
    title: searchParams.get("title"),
    image: searchParams.get("image"),
    content: searchParams.get("content"),
    slug: searchParams.get("slug"),
    description: searchParams.get("description"),
    date: searchParams.get("date"),
    time: searchParams.get("time"),
    id: id,
  });
  return (
    <div>
      <div id="bg"></div>
      <div className="blg_hea">
        <h2>Blog</h2>
        <p>By: Aisha Kadmeshwar</p>
      </div>

      <div className="blg_row">
        <div className="blg_left_column">
          <div className="blg_card">
            <div className="pg_main">
              <h1>{data.title}</h1>
              <hr />

              <h2>{data.date}</h2>
              <p>{data.time}</p>
              <div className="pg_content">
                <img src={data.image} alt="Bear" style={{ width: "100%" }} />
                <h3>{data.title}</h3>
                <p>{data.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="blg_right_column">
          <div className="blg_card">
            <h2>About Me</h2>
            <img
              src="https://www.w3schools.com/w3images/avatar_hat.jpg"
              alt="avatar_hat"
              className="image"
            />
            <p>Software developer</p>
          </div>
          <div className="blg_card">
            <h3>Popular Blog</h3>
            {allBlogs &&
              [...allBlogs]
                .slice(-3)
                .reverse()
                .map((blog) => (
                  <>
                    <div className="blg_fake">{blog.title}</div>
                    <br />
                  </>
                ))}
          </div>
          <div className="blg_card">
            <h3>Follow Me</h3>
            <p>@aisha</p>
          </div>
        </div>
      </div>

      <div className="blg_foo">
        <h2>CREDITS</h2>
      </div>
    </div>
  );
}

export default DisplayPage;
