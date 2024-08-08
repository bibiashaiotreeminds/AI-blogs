import {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signin() {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = data;

  const dispatch = useDispatch();
  const navigate= useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    //redirect when logged in
    if(isSuccess || user){
      navigate('/dashboard')
    }
    // dispatch(reset())
  },[user, navigate, dispatch, isError, isSuccess, message])


  const onChange = (e) => {
    setData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit= (e)=>{
    e.preventDefault();
    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }



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
            <h1>Login</h1>
            <p className="body-text">
              Create Blogs!
            </p>
            <form onSubmit={onSubmit}>
            <div className="login-form-group">
              {/* <label className="" for="email">
                Email <span className="required-star">*</span>
              </label> */}
              <input type="text" placeholder="Enter Email" id="email"  name="email" value={email} onChange={onChange} required/>
            </div>
            <div className="login-form-group">
              {/* <label for="pwd">
                Password <span class="required-star">*</span>
              </label> */}
              <input
                autocomplete="off"
                type="text"
                name="password"
              value={password}
                placeholder="Enter Password"
                id="pwd"
                onChange={onChange}
                required
              />
            </div>

            <div >
            <button className="rounded-button login-cta">Login</button>
          </div>
            </form>
          </div>

          <div class="register-div">Not registered yet? <a href="/sign-up" class="link create-account" >Create an account ?</a></div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
