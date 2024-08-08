import React, { useState, useEffect } from "react";
import { logout, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createBlogSchedule,
  reset as resetBlog,
} from "../features/blog/blogSlice";
import { toast } from "react-toastify";
import CommonSidebar from "../components/CommonSidebar";
import axios from 'axios';
const API_URL = "http://localhost:5000/api/blogs/";

const Schedule = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    imagePrompt: "",
    contentPrompt: "",
    slug: "",
    date: "",
    time: "",
  });


  const { blog, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.blog
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    if (isError) {
      // toast.error(message);
    }

    //redirect
    if (isSuccess) {
      dispatch(resetBlog());
      navigate("/creator");
    }
    dispatch(resetBlog());
    console.log(calendarEventSchedule,'hhiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
  }, [dispatch, isError, isSuccess, message, navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
  setData(prevData => ({
    ...prevData,
    [name]: value
  }));
  };

  const calendarEventSchedule = {
    title: data.title,
    description: data.description,
    imagePrompt: data.imagePrompt,
    contentPrompt: data.contentPrompt,
    slug: data.slug,
    date: data.date,
    time: data.time,
  };

  const onSubmit = (e) => {
    e.preventDefault();
     dispatch(createBlogSchedule(calendarEventSchedule));
  

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
              <h1>Schedule - Creator </h1>
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
      <div className="custom-card-creator col-12 pb-10">
          <div className="row">
            <div className="col">
            <div className="flex">
            <button
                  className="p-2 text-blue-900 hover:text-red-600"
                >
                  Automatic
                </button>
            </div>
            </div>
          </div>
        </div>

        <div class="card-creator col-12">
          <div class="row">
            <div class="col">
              <div class="row">
                <h5 class="card-title">{/* <span>/Today</span> */}</h5>

                <form
                  action="forms/contact.php"
                  method="post"
                  class="creator-form"
                  onSubmit={onSubmit}
                >
                  <div class="input-container row">
                    <div class="col-md-6">
                      <input
                        type="text"
                        name="title"
                        value={data.title}
                        class="form-control"
                        placeholder="Title"
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        value={data.slug}
                        name="slug"
                        placeholder="Slug"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div class="input-container row">
                    <div class="col-md-6">
                      <input
                        type="text"
                        name="imagePrompt"
                         value={data.imagePrompt}
                        class="form-control"
                        placeholder="Image Prompt"
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        value={data.contentPrompt}
                        name="contentPrompt"
                        placeholder="Content Prompt"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div class="input-container row mb-4">
                    <div class="col-md">
                      <textarea
                        type="text"
                        class="form-control"
                        value={data.description}
                        name="description"
                        placeholder="Description"
                        onChange={onChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div class="input-container row">
                    <div class="col-md-6">
                      <input
                        type="date"
                        name="date"
                        class="form-control"
                        value={data.date}
                        placeholder="Generation Date"
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <input
                        type="time"
                        class="form-control"
                        value={data.time}
                        name="time"
                        placeholder="Generation Time"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div class="btns-container ">
                    <button class="rounded-button login-cta text-white">
                      Generate Schedule
                    </button>

                    {/* <button class="rounded-button login-cta text-white">
                      Add Generation
                    </button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule;
