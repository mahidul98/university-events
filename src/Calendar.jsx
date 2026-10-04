function Calendar({ events, onEventClick }) {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = today.toLocaleString("default", {
    month: "long",
  });

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  function getEventsForDay(day) {
    if (!day) return [];

    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return events.filter((event) => event.date === date);
  }

  return (
    <section className="calendar-section">
      <div className="calendar-header">
        <h2>{monthName} {year}</h2>
      </div>

      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div key={day}>{day}</div>
          )
        )}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);

          return (
            <div
              key={index}
              className={`calendar-day ${
                day === today.getDate() ? "today" : ""
              }`}
            >
              {day && <span>{day}</span>}

              {dayEvents.map((event) => (
                <button
                  key={event.id}
                  className="calendar-event"
                  onClick={() => onEventClick(event)}
                >
                  {event.title}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Calendar;