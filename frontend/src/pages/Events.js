import React, { useState } from "react";
import axios from "axios";

function Events() {

  const [userId, setUserId] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");

  const sendEvent = async () => {
    try {
      await axios.post("http://localhost:5000/event", {
        user_id: userId,
        product: product,
        price: Number(price)
      });

      alert("Event Sent");

    } catch (err) {
      console.error(err);
      alert("Error sending event");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Send Live Event</h1>

      <input
        placeholder="User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Product"
        value={product}
        onChange={e => setProduct(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <br /><br />

      <button onClick={sendEvent}>Send Event</button>
    </div>
  );
}

export default Events;