import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import Schedule from "./pages/Schedule";
import Calender from "./Calender";
import ContextWrapper from "./context/ContextWrapper";
import Create from "./pages/Create";
import ListOfBlogs from "./pages/ListOfBlogs";
import DummyCalender from "./DummyCalender";
import Edit from "./pages/Edit";
import DisplayPage from "./pages/DisplayPage";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <div>
      <ContextWrapper>
      <Router>
      <Routes>
        <Route path="/login" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route path="/creator" element={<PrivateRoute/>}>
        <Route path="/creator" element={<Schedule/>}/>
        </Route>
        <Route path="/create" element={<PrivateRoute/>}>
        <Route path="/create" element={<Create/>}/>
        </Route>
        <Route path="/calender" element={<PrivateRoute/>}>
        <Route path="/calender" element={<Calender/>}/>
        </Route>
        <Route path="/edit/:id" element={<PrivateRoute/>}>
        <Route path="/edit/:id" element={<Edit/>}/>
        </Route>
        <Route path="/getBlogById/:id" element={<PrivateRoute/>}>
        <Route path="/getBlogById/:id" element={<DisplayPage/>}/>
        </Route>
        <Route path="/" element={<ListOfBlogs/>}/>
      </Routes>
    </Router> 
    <ToastContainer />
      </ContextWrapper>
    </div>
  );
}

export default App;
