import React, { useState, useEffect } from "react";
import { logout, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams  } from "react-router-dom";
import {
  editBlogSchedule,
  createBlogSchedule,
  reset as resetBlog,
  getBlogSchedule,
  getBlog,
} from "../features/blog/blogSlice";
import { toast } from "react-toastify";
import CommonSidebar from "../components/CommonSidebar";

const Edit = () => {
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const {
    blogScheduled,
    blogs,
    isLoading,
    isSuccess,
    isError,
    message,
  } = useSelector((state) => state.blog);

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

  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      // toast.error(message);
    }

    //redirect
    if (isSuccess) {
      dispatch(resetBlog());
    }
    dispatch(resetBlog());
  }, [dispatch, isError, isSuccess, message, navigate]);

  const [data, setData] = useState({
    title: "",
    image: "",
    content: "",
    slug: "",
    description: "",
    id: id
  });

  useEffect(() => {
    console.log(location.state)
    if(!location.state) navigate(-1)
    setData({...location.state.blog})

  }, []);
  
  



  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const onSubmit = (e) => {
    e.preventDefault();
       // Include the id in the data object
      dispatch(editBlogSchedule({id, ...data})); // Pass the updated data to the editBlogSchedule action
    
    
  };

  function toggleSubMenu() {
    setSubmenuVisible(!submenuVisible);
  }

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
                <a href="/edit" className="p-2 text-red-500 hover:text-red-600">
                  Manual
                </a>
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
                        name="image"
                        value={data.image}
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
                        value={data.content}
                        name="content"
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
                  <div class="btns-container ">
                    <button class="rounded-button login-cta text-white">
                      Update
                    </button>
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

export default Edit;
