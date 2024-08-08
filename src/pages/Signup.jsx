import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/authSlice";

function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log(data)
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
       navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, dispatch, isError, isSuccess, message]);



  const onChange = (e) => {
    setData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
      const userData={
        username, email, password
      }
      console.log(userData)
      dispatch(register(userData))
    
  };

  return (
    <div className="login-Whole-container">
      <div className="login-container">
        <div className="onboarding">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide color-1">
                <div className="slide-image">
                  <img
                    src="https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/startup-launch.png"
                    loading="lazy"
                    alt=""
                  />
                </div>
                {/* <div className="slide-content">
                  <h2>Turn your ideas into reality.</h2>
                  <p>
                    Consistent quality and eperience across all platform and
                    devices
                  </p>
                </div> */}
              </div>
              {/* <div className="swiper-slide color-1">
                <div className="slide-content">
                  <h2>Turn your ideas into reality.</h2>
                  <p>
                    Consistent quality and eperience across all platform and
                    devices
                  </p>
                </div>
              </div> */}
            </div>

            <div className="swiper-pagination"></div>
          </div>
        </div>
        <div className="login-form">
          <div className="login-form-inner">
            <div className="logo">
              <svg
                height="512"
                viewBox="0 0 192 192"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724 111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z" />
              </svg>
            </div>
            <h1>Register</h1>
            <p className="body-text">Create Blogs!</p>
            <form onSubmit={onSubmit}>
            <div className="login-form-group">
              <label for="username">
                Username <span className="required-star">*</span>
              </label>
              <input type="text" placeholder="Username" name="username" value={username} id="username"  onChange={onChange} required/>
              <label for="email">
                Email <span className="required-star">*</span>
              </label>
              <input type="text" placeholder="email@website.com"  name="email" value={email} id="email"  onChange={onChange} required/>
            </div>
            <div className="login-form-group">
              <label for="pwd">
                Password <span class="required-star">*</span>
              </label>
              <input
                autocomplete="off"
                type="text"
                name="password"
              value={password}
                placeholder="Minimum 8 characters"
                id="pwd"
                onChange={onChange}
                required
              />
            </div>

            {/* <a href="#" className="rounded-button login-cta">
              Create account
            </a> */}
            <div >
            <button className="rounded-button login-cta">Submit</button>
          </div>
            </form>
          </div>
          
          <div class="register-div">
            Already registered?{" "}
            <a href="/" class="link create-account">
              Login ?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
