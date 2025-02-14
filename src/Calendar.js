
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleDateTimeClick = (slotInfo) => {
    setSelectedDateTime(slotInfo.start); // Captures date & time
    console.log("Selected Date & Time:", slotInfo.start);
  };

  return (
    <div>
      <h3>
        Selected Date & Time: {selectedDateTime ? selectedDateTime.toString() : "None"}
      </h3>
      <Calendar
        localizer={localizer}
        selectable
        onSelectSlot={handleDateTimeClick}
        events={[]} // No events for now
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400,width:400 }}
        views={[ "week", "day"]} // Enables different views
        step={30} // Time interval (30 minutes)
        timeslots={2} // 2 slots per hour (each slot = step/2 minutes)
        defaultView="week" // Default to weekly view for better time selection
      />
    </div>
  );
};

export default MyCalendar;
