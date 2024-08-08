import React, { useState, useEffect } from "react";
import { logout, reset } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import CommonSidebar from "../components/CommonSidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getBlog,
  getBlogSchedule,
  reset as resetBlog,
} from "../features/blog/blogSlice";

const Dashboard = ({ title, options, initial }) => {
  const { blogScheduled, blogs, isLoading, isSuccess } = useSelector(
    (state) => state.blog
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(resetBlog());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getBlogSchedule());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBlog());
    // console.log(blogs);
  }, [dispatch]);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <header id="header" class="header fixed-top d-flex align-items-center">
        <div class="d-flex align-items-center justify-content-between">
          {/* <a href="index.html" class="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span class="d-none d-lg-block">BlogLogo</span>
          </a> */}
          <i class="bi bi-list toggle-sidebar-btn"></i>
          <div class="pagetitle">
            <div class="search-bar">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>

        <a
          class="nav-link nav-profile d-flex align-items-center pe-0"
          href="#"
          data-bs-toggle="dropdown"
        >
          <img
            src="https://i.pinimg.com/236x/51/44/71/5144713488ef4a7f88c98ebe34fff03a.jpg"
            alt="Profile"
            class="rounded-circle custom-profile-img"
          />
        </a>
      </header>

      <CommonSidebar />

      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Upcoming Events</h1>
        </div>

        <div className="row">
          {[...blogScheduled]
            .slice(-5)
            .reverse()
            .map((blog, index) => (
              <div className="col-xxl-2 col-md-6" key={index}>
                <div className="card info-card sales-card">
                  <div className="filter">{/* Dropdown menu code */}</div>

                  <div className="card-body">
                    <h5 className="card-title">
                      {blog.title} 
                    </h5>

                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <h5 className="card-title">{blog.slug}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div class="col-12">
          <div class="row">
            <div class="col card">
              <div class="row card-body">
                <h5 class="card-title">
                  Blog List 
                </h5>
                <div id="reportsChart1"></div>

                <table class="table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Title</th>
                      <th>createdAt</th>
                    </tr>
                  </thead>
                  {[...blogs]
                    .slice(-10)
                    .reverse()
                    .map((blog, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{blog.title}</td>
                          <td>{blog.date}</td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>
            <div class="col card">
              <div class="row card-body">
                <h5 class="card-title">
                  Schedule 
                  {/* <span>/Today</span> */}
                </h5>
                <div id="reportsChart1">
                  <table className="table">
                    {/* <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Title</th>
                        <th>createdAt</th>
                        <th>Edit</th>  */}
                      {/* </tr>
                    </thead>  */}
                    <tbody>
                      {[...blogScheduled]
                        .slice(-10)
                        .reverse()
                        .map((blog, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{blog.title}</td>
                            <td>{blog.date}</td>
                            {/* Create a Link to the edit page with the blog's ID */}
                            <td>
                              <Link
                                to={`/edit/${blog.id}`}
                                state={{blog}}
                              >
                                <button className="mr-1 p-1 rounded-full bg-blue-900 hover:bg-blue-800  flex items-center">
                                  <span className="text-white mr-2">
                                    Manual
                                  </span>
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
