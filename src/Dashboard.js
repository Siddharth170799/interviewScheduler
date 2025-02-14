import { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import newContext from "./Context";

const localizer = momentLocalizer(moment);

const InterviewForm = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [candidateName, setCandidateName] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [duration, setDuration] = useState(30);
  const [interviewType, setInterviewType] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateTimeClick = (slotInfo) => {
    const durationInMinutes = parseInt(duration, 10);

    const newEvent = {
      title: "Interview Slot",
      start: slotInfo.start,
      end: moment(new Date(slotInfo.start))
        .add(durationInMinutes, "minutes")
        .toDate(),
    };

    setSelectedDateTime(newEvent);
    setEvents([...events, newEvent]);
  };

  const scheduleInterview = () => {
    if (!selectedDateTime) return;

    const { title, start, end } = selectedDateTime;

    const scheduleDetails = {
      candidateName,
      interviewerName,
      duration,
      interviewType,
      title,
      start,
      end,
    };

    const updatedEvents = events.filter(
      (item) => item.start !== scheduleDetails.start
    );

    setEvents([...updatedEvents, scheduleDetails]);

    const storedData = localStorage.getItem("InterviewSchedule");
    const parsedData = JSON.parse(storedData) || [];

    localStorage.setItem(
      "InterviewSchedule",
      JSON.stringify([...parsedData, scheduleDetails])
    );
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const updateEvent = ()=>{
    const eventToBeUpdated = {
      ...selectedEvent
    }
    const details = events.filter((item)=>{
      return (
        selectedEvent.start == item.start && selectedEvent.end == item.end ? {} : item 
      )
    })
    setEvents(details)
  }
  const handleConfirm = () => {
    const userResponse = window.confirm("Are you sure?");
    if (userResponse) {
      return "Yes"
    } else {
      return ""
    }
  };
  
  // Call the function when needed
  
  const deleteInterview = () => {
    const data = handleConfirm();
    console.log(data)
 
if(data){
  const updatedEvents = events.filter(
    (item) =>
      item.start !== selectedEvent.start && item.end !== selectedEvent.end
  );

  setEvents(updatedEvents);
  setSelectedEvent(null);
  localStorage.setItem("InterviewSchedule", JSON.stringify(updatedEvents));
}else{
 setSelectedEvent("")
}
    
  };

  useEffect(() => {
    const storedData = localStorage.getItem("InterviewSchedule");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const formattedEvents = parsedData.map((item) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
      }));
      setEvents(formattedEvents);
    }
  }, []);
console.log(selectedEvent)
  return (
    <>
     {/* <div className="filter-container">
        <label htmlFor="filterType">Filter By:</label>
        <select
          id="filterType"
          className="filter-dropdown"
         
        
        >
          <option value="all">All</option>
          <option value="candidate">Candidate</option>
          <option value="interviewer">Interviewer</option>
          <option value="date">Date</option>
        </select>
      </div> */}
      <div className="scroll-container">
        <div className="scroll-content">
          {events.map((event, index) => (
            <div key={index} className="scroll-item">
              {event.candidateName} - {event.interviewType} -{" "}
              {moment(event.start).format("MMM Do YYYY, h:mm A")}
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="form-container">
          <h2 className="form-title">Schedule Interview</h2>

          <div className="form-group">
            <label>Candidate Name:</label>
            <input
              type="text"
              placeholder="Enter candidate name"
              className="input-field"
              onChange={(e) => setCandidateName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Interviewer Name:</label>
            <input
              type="text"
              placeholder="Enter interviewer name"
              className="input-field"
              onChange={(e) => setInterviewerName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Duration:</label>
            <select
              className="input-field"
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="30">30 Mins</option>
              <option value="60">60 Mins</option>
              <option value="90">90 Mins</option>
            </select>
          </div>

          <div className="form-group">
            <label>Interview Type:</label>
            <select
              className="input-field"
              onChange={(e) => setInterviewType(e.target.value)}
            >
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Behavioral">Behavioral</option>
            </select>
          </div>

          <div className="form-group">
            <button
              onClick={() => setShowCalendar(true)}
              className="open-calendar-btn"
            >
              Select Date & Time
            </button>
          </div>
        </div>

        {showCalendar && (
          <div className="calendar-container">
            <button
              className="close-calendar-btn"
              onClick={() => setShowCalendar(false)}
            >
              ✖ Close
            </button>

            <Calendar
              localizer={localizer}
              selectable
              onSelectSlot={handleDateTimeClick}
              events={events}
              onSelectEvent={handleEventClick}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 300, marginTop: "10px" }}
              views={["week", "day"]}
              step={30}
              timeslots={2}
              defaultView="week"
            />

            {selectedEvent && (
              <button onClick={deleteInterview} className="delete-btn">
                Delete Selected Event
              </button>
            )}

          <div>{selectedEvent?.data}</div>  
{selectedEvent && (
              <button onClick={updateEvent} className="delete-btn">
               Update Selected Event
              </button>
            )}

            <button onClick={scheduleInterview} className="schedule-btn">
              Schedule Interview
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default InterviewForm;
