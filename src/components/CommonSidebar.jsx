import { logout, reset } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CommonSidebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div>
      <aside id="sidebar" class="sidebar">
  <ul class="sidebar-nav" id="sidebar-nav">
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        data-bs-toggle="collapse"
        href="#components-nav"
        aria-expanded="false"
      >
        <i class="bi bi-menu-button-wide"></i>
        <span>Blogs</span>
        <i class="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul
        id="components-nav"
        class="nav-content collapse"
        data-bs-parent="#sidebar-nav"
      >
        <li>
          <a href="/">
            <i class="bi bi-circle"></i>
            <span>List</span>
          </a>
        </li>
        <li>
          <a href="/create">
            <i class="bi bi-circle"></i>
            <span>Create</span>
          </a>
        </li>
      </ul>
    </li>

    <li class="nav-item">
      <a
        class="nav-link collapsed"
        data-bs-toggle="collapse"
        href="#forms-nav"
        aria-expanded="false"
      >
        <i class="bi bi-journal-text"></i>
        <span>Schedule</span>
        <i class="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul
        id="forms-nav"
        class="nav-content collapse"
        data-bs-parent="#sidebar-nav"
      >
        <li>
          <a href="/calender">
            <i class="bi bi-circle"></i>
            <span>Calendar</span>
          </a>
        </li>
        <li>
          <a href="/creator">
            <i class="bi bi-circle"></i>
            <span>Creator</span>
          </a>
        </li>
      </ul>
    </li>

    <li class="nav-item">
      <a
        class="nav-link collapsed"
        data-bs-toggle="collapse"
        href="#tables-nav"
        aria-expanded="false"
      >
        <i class="bi bi-layout-text-window-reverse"></i>
        <span>Settings</span>
        <i class="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul
        id="tables-nav"
        class="nav-content collapse"
        data-bs-parent="#sidebar-nav"
      ></ul>
    </li>
    <li class="nav-item">
      <a class="nav-link" onClick={onLogout}>
        <i class="bi bi-file-earmark"></i>
        <span class="hi">Logout</span>
      </a>
    </li>
  </ul>
</aside>

    </div>
  )
}

export default CommonSidebar
