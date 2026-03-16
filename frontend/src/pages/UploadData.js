import React, { useState } from "react";
import axios from "axios";

function UploadData() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/upload-data", formData);
  };

  return (
    <div>
      <h1>Upload Dataset</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default UploadData;