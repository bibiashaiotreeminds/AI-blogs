import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, createBlogSchedule } from "../features/blog/blogSlice";
import moment from "moment"; 

// import { logout, reset } from "../features/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createBlog, reset as resetBlog } from "../features/blog/blogSlice";
// import { FETCH_ACTIONS } from "../context/ContextWrapper";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  //context
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  //initialize all the elements
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  const [image, setImage] = useState(selectedEvent ? selectedEvent.image : "");

  const [content, setContent] = useState(
    selectedEvent ? selectedEvent.content : ""
  );

  const [slug, setSlug] = useState(selectedEvent ? selectedEvent.slug : "");
  const [time, setTime] = useState(selectedEvent ? selectedEvent.time : "");

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  //redux
  const { blog, isSuccess, isError, message } = useSelector(
    (state) => state.blog
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/calender");
    }
    dispatch(reset());
  }, [isSuccess, dispatch, isError]);

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEventSchedule = {
      title,
      description,
      image,
      content,
      slug,
      date: moment(daySelected).format("YYYY-MM-DD"),
      time
    };
    const calendarEvent = {
      title,
      description,
      image,
      content,
      slug,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatch(createBlogSchedule(calendarEventSchedule));
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  // const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
  //   useContext(GlobalContext);

  // const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  // const [description, setDescription] = useState(
  //   selectedEvent ? selectedEvent.description : ""
  // );

  // const [image, setImage] = useState(selectedEvent ? selectedEvent.image : "");

  // const [content, setContent] = useState(
  //   selectedEvent ? selectedEvent.content : ""
  // );

  // const [slug, setSlug] = useState(selectedEvent ? selectedEvent.slug : "");

  // const [selectedLabel, setSelectedLabel] = useState(
  //   selectedEvent
  //     ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
  //     : labelsClasses[0]
  // );

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const calendarEvent = {
  //     title,
  //     description,
  //     image,
  //     content,
  //     slug,
  //     label: selectedLabel,
  //     day: daySelected.valueOf(),
  //     id: selectedEvent ? selectedEvent.id : Date.now(),
  //   };
  //   if (selectedEvent) {
  //     dispatchCalEvent({ type: "update", payload: calendarEvent });
  //   } else {
  //     dispatchCalEvent({ type:FETCH_ACTIONS.PROGRESS, payload: calendarEvent });
  //   }

  //   setShowEventModal(false);
  // }

  return (
    <div class="">
      <div className="eventModal fixed left-0 top-0 flex justify-center items-center">
        <form className="bg-white rounded-lg shadow-2xl w-1/3">
          <header className="bg-white-100 px-4 py-2 flex justify-between items-center">
            {" "}
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400 mr-50">
                <img
                  src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/close.png"
                  alt="create_event"
                  className="w-7 h-7"
                />
              </span>
            </button>
          </header>
          <div className="p-3">
            <div className="grid grid-cols-1/5 items-end gap-y-7">
              <div></div>
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className="pt-1 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="pt-1 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500">
                Schedule
              </span>
              <p>{daySelected.format("dddd, MMMM DD")}</p>
              <span className="pt-1 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500">
                Description
              </span>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={description}
                required
                className="pt-1 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="pt-1 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500">
                Image
              </span>
              <input
                type="text"
                name="image"
                placeholder="Add a Image"
                value={image}
                required
                className="pt-1 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setImage(e.target.value)}
              />
              <span className="pt-1 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500">
                Content
              </span>
              <input
                type="text"
                name="content"
                placeholder="content"
                value={content}
                required
                className="pt-1 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setContent(e.target.value)}
              />
              <span className="pt-1 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500">
                Slug
              </span>
              <input
                type="text"
                name="slug"
                placeholder="slug"
                value={slug}
                required
                className="pt-1 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setSlug(e.target.value)}
              />
              <span className="mr-20 pt-1 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500">
                Time
              </span>
              <div className="flex gap-x-2">
                {/* {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass && (
                      <span className="material-icons-outlined text-white text-sm"></span>
                    )}
                  </span>
                ))} */}
                <input
                  type="time"
                  className="pt-1 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                  name="time"
                  value={time}
                  placeholder="Generation Time"
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <footer className="flex justify-end border-t p-1 mt-1">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            >
              Save
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
