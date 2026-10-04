function EventCard({ event, onClick }) {
  return (
    <div
  className={`event-card ${
    event.completed ? "completed" : ""
  }`}
  onClick={onClick}
>
      <div className="event-category">{event.category}</div>

      <h2>{event.title}</h2>

      <div className="event-info">
        <p>📅 {event.date}</p>
        <p>🕐 {event.time}</p>
        <p>📍 {event.venue}</p>
      </div>
    </div>
  );
}

export default EventCard;