import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom'; // Import useHistory hook

function DisplayBlog({
  isUser,
  username,
  image,
  description,
  title,
  content,
  slug,
  id,
  date,
  time
}) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    // if (window.confirm('Are you sure you want to delete?')) {
    //     const response = await deletePostById(id);
    //     if (response.status === 200) {
    //         window.location.reload();
    //     }
    // }
  };

  const login = () => {
    navigate('/login')
  };

  const editPosts = () => {
    // history.push("/edit", { state: { id: id } }); // Use history.push to navigate to edit page
  };

  return (
    <div>
      <div class="mb-20">
        <header
          id="header"
          class="mb-40 header fixed-top d-flex align-items-center"
        >
          <div class="d-flex align-items-center justify-content-between w-100">
            <a class="logo d-flex align-items-center">
              {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRyGvyElQ5rV0CGz1sbHRuTHZfqZ5czlBARg&s"
                alt=""
              /> */}
            </a>
            <div>
              <a
                class="nav-link nav-profile d-flex align-items-center pe-0"
              >
                <button
                  onClick={login}
                  className="mr-2 p-2 rounded-full bg-blue-900 hover:bg-blue-800 focus:outline-none flex items-center"
                >
                  <span className="text-white mr-2">Login</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 13.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414zM6 5a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm7 2a1 1 0 00-1 1v5a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </header>
      </div>
      <Link
                                to={`/getBlogById/${
                                  id
                                }?title=${encodeURIComponent(
                                  title
                                )}&image=${encodeURIComponent(
                                  image
                                )}&content=${encodeURIComponent(
                                  content
                                )}&slug=${encodeURIComponent(
                                  slug
                                )}&date=${encodeURIComponent(
                                  date
                                )}&time=${encodeURIComponent(
                                  time
                                )}&description=${encodeURIComponent(
                                  description
                                )}`}
                              >
      <div className="w-50 h-100 lg:w-70 xl:w-50 2xl:w-40 mx-auto mt-8 p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl">
        <div>
          {/* {isUser && (
            <div className="flex">
              <button
                onClick={editPosts}
                className="mr-2 p-2 text-yellow-500 hover:text-yellow-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 13.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414zM6 5a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm7 2a1 1 0 00-1 1v5a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-500 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a1 1 0 011-1h8a1 1 0 011 1v1h2a1 1 0 110 2h-.553a2.5 2.5 0 01-4.894 0H8.553a2.5 2.5 0 01-4.894 0H3a1 1 0 110-2h2V4zm2 7a1 1 0 011 1v5a1 1 0 01-1 1h8a1 1 0 01-1-1v-5a1 1 0 011-1h2a1 1 0 110 2h-2v5H7v-5H5a1 1 0 01-1-1v-5a1 1 0 011-1h2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )} */}
          <div className="flex items-center">
            {/* <div className="w-10 h-10 bg-blue-900 rounded-full flex justify-center items-center"></div> */}
            <div className="w-10 h-10 flex justify-center items-center">
              <p className="text-gray-800">{title}</p>
            </div>
            <div className="ml-2">{username}</div>
          </div>

          <img
            src= {image}
            alt="Post"
            className=" rounded-md mt-2"
          />
          <hr className="my-4" />
          <p className="text-gray-800">{description}</p>
          <p className="text-gray-800">{content}</p>
          {/* <p className="text-gray-800">{slug}</p> */}
        </div>
      </div>
      </Link>
    </div>
  );
}

export default DisplayBlog;
