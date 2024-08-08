import React from "react";
import Day from "./Day";
export default function Month({ month }) {
  return (
    <main id="main" class="main">
    <div class="month">
          <div class="card-calender">
    <div className="flex-1 grid grid-cols-7 grid-rows-5 h-full">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
    </div>
    </div>
    </main>
  );
}
