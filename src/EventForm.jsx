function EventForm({ onAdd, onClose, t }) {
  function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    let link = form.get("link").trim();

    if (
      link &&
      !link.startsWith("http://") &&
      !link.startsWith("https://")
    ) {
      link = "https://" + link;
    }

    const newEvent = {
      id: Date.now(),
      title: form.get("title"),
      category: form.get("category"),
      date: form.get("date"),
      time: form.get("time"),
      venue: form.get("venue"),
      description: form.get("description"),
      link: link,
      completed: false,
    };

    onAdd(newEvent);
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="modal-header">
          <h2>{t.addEvent}</h2>

          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="event-form"
        >
          <input
            name="title"
            placeholder="Event name"
            required
          />

          <select
            name="category"
            required
          >
            <option value="">
              Select category
            </option>

            <option value="Competition">
              Competition
            </option>

            <option value="Seminar">
              Seminar
            </option>

            <option value="Workshop">
              Workshop
            </option>

            <option value="Cultural">
              Cultural
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          <input
            name="date"
            type="date"
            required
          />

          <input
            name="time"
            type="text"
            placeholder="Time (e.g. 10:00 AM)"
            required
          />

          <input
            name="venue"
            placeholder="Venue"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            required
          />

          <input
            name="link"
            type="text"
            placeholder="Event link (optional)"
          />

          <button
            type="submit"
            className="primary-button"
          >
            {t.addEvent}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventForm;