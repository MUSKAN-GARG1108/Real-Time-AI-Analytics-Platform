import React, { useState, useEffect } from "react";
import API from "../services/api";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    API.get("/projects").then(res => setProjects(res.data));
  }, []);

  const createProject = async () => {
    const res = await API.post("/projects", { name });
    setProjects([...projects, res.data]);
  };

  return (
    <div>
      <h1>Your Projects</h1>

      <input
        placeholder="Project name"
        onChange={e => setName(e.target.value)}
      />
      <button onClick={createProject}>Create</button>

      <ul>
        {projects.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;