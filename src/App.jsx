import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { events } from "./data";
import { translations } from "./translations";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import EventForm from "./EventForm";

function App() {
  // -----------------------------
  // STATE
  // -----------------------------

  const [eventList, setEventList] = useState(() => {
    const savedEvents = localStorage.getItem("university-events");

    return savedEvents ? JSON.parse(savedEvents) : events;
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("en");

  const t = translations[language];

  // -----------------------------
  // SAVE EVENTS
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(
      "university-events",
      JSON.stringify(eventList)
    );
  }, [eventList]);

  // -----------------------------
  // ADD EVENT
  // -----------------------------

  function addEvent(newEvent) {
    setEventList((currentEvents) => [
      ...currentEvents,
      newEvent,
    ]);

    setShowForm(false);
  }

  // -----------------------------
  // DELETE EVENT
  // -----------------------------

  function deleteEvent(id) {
    setEventList((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    );

    setSelectedEvent(null);
  }

  // -----------------------------
  // COMPLETE / UPCOMING
  // -----------------------------

  function toggleComplete(id) {
    setEventList((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id
          ? {
              ...event,
              completed: !event.completed,
            }
          : event
      )
    );

    setSelectedEvent((currentEvent) =>
      currentEvent
        ? {
            ...currentEvent,
            completed: !currentEvent.completed,
          }
        : null
    );
  }

  // -----------------------------
  // SEARCH + DATE SORTING
  // -----------------------------

  const filteredEvents = eventList
    .filter((event) => {
      const searchText = search.toLowerCase();

      return (
        event.title.toLowerCase().includes(searchText) ||
        event.category.toLowerCase().includes(searchText) ||
        event.venue.toLowerCase().includes(searchText)
      );
    })
    .sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date)
    );

  // -----------------------------
  // TODAY / TOMORROW
  // -----------------------------

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  const todayEvent = eventList.find(
    (event) => event.date === formatDate(today)
  );

  const tomorrowEvent = eventList.find(
    (event) => event.date === formatDate(tomorrow)
  );

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div className="header-title">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <div className="header-actions">

          <input
            className="header-search"
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="language-button"
            onClick={() =>
              setLanguage(
                language === "en" ? "bn" : "en"
              )
            }
          >
            {language === "en" ? "বাংলা" : "English"}
          </button>

        </div>

      </header>

      <main className="main-content">

        {/* TODAY / TOMORROW */}

        {(todayEvent || tomorrowEvent) && (
          <div className="notice-banner">

            {todayEvent && (
              <p>
                🔴 <strong>{t.today}:</strong>{" "}
                {todayEvent.title}
              </p>
            )}

            {tomorrowEvent && (
              <p>
                🟡 <strong>{t.tomorrow}:</strong>{" "}
                {tomorrowEvent.title}
              </p>
            )}

          </div>
        )}

        {/* SECTION TITLE */}

        <div className="section-header">
          <h2>{t.upcoming}</h2>
          <p>{t.stayUpdated}</p>
        </div>

        {/* EVENT CARDS */}

        <div className="event-grid">

          {/* ADD EVENT */}

          <button
            className="add-event-card"
            onClick={() => setShowForm(true)}
          >
            <span className="add-icon">+</span>
            <span>{t.addEvent}</span>
          </button>

          {/* EVENTS */}

          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}

        </div>

        {/* NO SEARCH RESULTS */}

        {filteredEvents.length === 0 && (
          <div className="empty-state">
            <h3>{t.noEvents}</h3>
            <p>{t.tryDifferent}</p>
          </div>
        )}

        {/* CALENDAR */}

        <Calendar
          events={eventList}
          onEventClick={(event) =>
            setSelectedEvent(event)
          }
        />

      </main>

      {/* EVENT DETAILS MODAL */}

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onDelete={deleteEvent}
        onToggleComplete={toggleComplete}
        t={t}
      />

      {/* ADD EVENT FORM */}

      {showForm && (
        <EventForm
          onAdd={addEvent}
          onClose={() => setShowForm(false)}
          t={t}
        />
      )}

    </div>
  );
}

export default App;