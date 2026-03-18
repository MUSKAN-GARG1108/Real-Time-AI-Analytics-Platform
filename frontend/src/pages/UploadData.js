import React, { useState } from "react";
import axios from "axios";

function UploadData() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/upload", formData);

      setMessage("Data uploaded successfully");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Upload Dataset</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <br />
      <br />

      <button onClick={uploadFile}>Upload</button>

      {/*Message Display */}
      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.includes("success") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default UploadData;
