function EventModal({
  event,
  onClose,
  onDelete,
  onToggleComplete,
  t,
}) {
  if (!event) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="event-category">
              {event.category}
            </span>

            <h2>{event.title}</h2>
          </div>

          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-info">
          <p>📅 {event.date}</p>
          <p>🕐 {event.time}</p>
          <p>📍 {event.venue}</p>
        </div>

        <p className="modal-description">
          {event.description}
        </p>

        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="event-link"
          >
            {t.eventLink}
          </a>
        )}

        <div className="modal-actions">
          <button
            className="complete-button"
            onClick={() =>
              onToggleComplete(event.id)
            }
          >
            {event.completed
              ? t.completed
              : t.markCompleted}
          </button>

          <button
            className="delete-button"
            onClick={() =>
              onDelete(event.id)
            }
          >
            {t.delete}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventModal;