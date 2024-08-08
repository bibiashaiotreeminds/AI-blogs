import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const navigate = useNavigate();
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  const left= "<";
  const right =">";
  const login = () => {
    navigate('/login')
  };
  return (

    <header id="header" class="header fixed-top d-flex align-items-center">
        <div class="d-flex align-items-center justify-content-between">
          <a href="index.html" class="logo d-flex align-items-center">
            {/* <img src={logo} alt="calendar" className="mr-2 w-12 h-12"/> */}
            <span class="d-none d-lg-block">Calendar</span>
          </a>
          <i class="bi bi-list toggle-sidebar-btn"></i>
          <div class="pagetitle">
            <div class="search-bar">
            <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
         Today
       </button>
       <button onClick={handlePrevMonth}>
         <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
           {left}
         </span>
       </button>

       <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
           {right}
         </span>
       </button>
            </div>
          </div>
        </div>

        <a
          class="nav-link nav-profile d-flex align-items-center pe-0"
          href="#"
          data-bs-toggle="dropdown"
        >
          <h2 className="ml-4 text-xl text-gray-500 font-bold">
         {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
       </h2>
        </a>
      
      </header>
  );
}
