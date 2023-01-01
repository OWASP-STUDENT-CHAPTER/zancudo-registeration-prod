import { createContext, useState, useEffect } from "react";
import axios from "./axios";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [compLoading, setCompLoading] = useState(true);
  const [events, setEvents] = useState([]);
  console.log("events", events);
  const loadEvents = async () => {
    try {
      const res = await axios.get("/event/all");
      setEvents(res.data.body);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (events) {
      setCompLoading(false);
    }
  }, [events]);

  return (
    <EventContext.Provider value={{ compLoading, events }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventProvider, EventContext };
