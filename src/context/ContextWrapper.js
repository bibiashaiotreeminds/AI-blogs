// import React, {
//   useState,
//   useEffect,
//   useReducer,
//   useMemo,
// } from "react";
// import GlobalContext from "./GlobalContext";
// import dayjs from "dayjs";
// import axios from 'axios';

// const API_URL = "http://localhost:5000/api/blogs/";


// export const FETCH_ACTIONS = {
//   PROGRESS: 'progress',
//   ERROR: 'error',
//   SUCCESS: 'sucess',
// };


// const initialState = {
//   blogs: {},
//   loading: false,
//   error: false,
// };
// function savedEventsReducer(state, action) {
//   switch (action.type) {
//       case FETCH_ACTIONS.PROGRESS:{
//         return{
//           ...state,
//           loading:true
//         }
//       }
//       case FETCH_ACTIONS.SUCCESS:{
//         return{
//           ...state,
//           loading:false,
//           blogs:action.data
//         }
//       }
//       case FETCH_ACTIONS.ERROR:{
//         return{
//           ...state,
//           loading:true,
//           error:action.error,
//         }
//       }
//     // case "push":
//     //   return [...state, payload];
//     // case "update":
//     //   return state.map((evt) =>
//     //     evt.id === payload.id ? payload : evt
//     //   );
//     // case "delete":
//     //   return state.filter((evt) => evt.id !== payload.id);
//     //  default:
//     //   throw new Error();
//   }
// }
// // function initEvents() {
// //  const isLoading= false;
// //  const isError= false;
// //  const isSuccess= false;
// //  const message= "";
// //   const storageEvents = localStorage.getItem("savedEvents");
// //   const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
// //   return parsedEvents;
// // }

// export default function ContextWrapper(props) {
//   const [monthIndex, setMonthIndex] = useState(dayjs().month());
//   const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
//   const [daySelected, setDaySelected] = useState(dayjs());
//   const [showEventModal, setShowEventModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [labels, setLabels] = useState([]);
//   const [savedEvents, dispatchCalEvent] = useReducer(
//     savedEventsReducer,
//     {},
//     initialState
//   );
//  const {blogs,loading, error}=savedEvents;

//   const filteredEvents = useMemo(() => {
//     // return savedEvents.filter((evt) =>
//     //   labels
//     //     .filter((lbl) => lbl.checked)
//     //     .map((lbl) => lbl.label)
//     //     .includes(evt.label)
//     // );
//   }, [savedEvents, labels]);

//   // useEffect(() => {
//   //   localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
//   // }, [savedEvents]);

//   const createBlog =async (blogs)=>{
//     let response
//     try{
//        response= await axios.post(API_URL, blogs);
//       if(response.status ===201){
//         dispatchCalEvent({type:FETCH_ACTIONS.ERROR, error:error.message});
//       }
//     }catch(err){
//       console.log(err)
//       dispatchCalEvent({type:FETCH_ACTIONS.SUCCESS, data: response.data});
//     }
    
//   }
//   useEffect(() => {
//     dispatchCalEvent({type:FETCH_ACTIONS.PROGRESS});
//     createBlog(blogs);
//   }, [savedEvents, blogs, createBlog]);

//   // useEffect(() => {
//   //   setLabels((prevLabels) => {
//   //     return [...new Set(savedEvents.map((evt) => evt.label))].map(
//   //       (label) => {
//   //         const currentLabel = prevLabels.find(
//   //           (lbl) => lbl.label === label
//   //         );
//   //         return {
//   //           label,
//   //           checked: currentLabel ? currentLabel.checked : true,
//   //         };
//   //       }
//   //     );
//   //   });
//   // }, [savedEvents]);

//   useEffect(() => {
//     if (smallCalendarMonth !== null) {
//       setMonthIndex(smallCalendarMonth);
//     }
//   }, [smallCalendarMonth]);

//   useEffect(() => {
//     if (!showEventModal) {
//       setSelectedEvent(null);
//     }
//   }, [showEventModal]);

//   function updateLabel(label) {
//     setLabels(
//       labels.map((lbl) => (lbl.label === label.label ? label : lbl))
//     );
//   }

//   return (
//     <GlobalContext.Provider
//       value={{
//         monthIndex,
//         setMonthIndex,
//         smallCalendarMonth,
//         setSmallCalendarMonth,
//         daySelected,
//         setDaySelected,
//         showEventModal,
//         setShowEventModal,
//         dispatchCalEvent,
//         selectedEvent,
//         setSelectedEvent,
//         savedEvents,
//         setLabels,
//         labels,
//         updateLabel,
//         filteredEvents,
//       }}
//     >
//       {props.children}
//     </GlobalContext.Provider>
//   );
// }

import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) =>
        evt.id === payload.id ? payload : evt
      );
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
