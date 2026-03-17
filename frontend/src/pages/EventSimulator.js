import React, { useState } from "react";
import axios from "axios";

function EventSimulator() {

  const [event, setEvent] = useState({
    user_id: "",
    product: "",
    price: 0
  });

  const sendEvent = async () => {
    await axios.post("http://localhost:5000/event", event);
  };

  return (
    <div>
      <h1>Send Live Event</h1>

      <input placeholder="User ID"
        onChange={e => setEvent({ ...event, user_id: e.target.value })} />

      <input placeholder="Product"
        onChange={e => setEvent({ ...event, product: e.target.value })} />

      <input type="number" placeholder="Price"
        onChange={e => setEvent({ ...event, price: Number(e.target.value) })} />

      <button onClick={sendEvent}>Send Event</button>
    </div>
  );
}

export default EventSimulator;