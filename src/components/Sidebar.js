import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
export default function Sidebar() {
  return (
    // <aside className="border p-5 w-64">
    //   <CreateEventButton />
    //   <SmallCalendar />
    //   <Labels />
    // </aside>
    <aside id="sidebar" class="sidebar">
      <ul class="sidebar-nav" id="sidebar-nav">
        <li class="nav-item">
          <CreateEventButton />
          <SmallCalendar />
          <Labels />
        </li>
      </ul>
    </aside>
  );
}
