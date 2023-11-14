"use client";

import React, { useState } from "react";
import TextField from "./TextField";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  return (
    <>
      <h1>Edit Profile</h1>

      {/* TextField for Name */}
      <TextField
        label="Name"
        value={name}
        onChange={(newValue) => setName(newValue)}
      />

      {/* TextField for Email */}
      <TextField
        label="Email"
        value={email}
        onChange={(newValue) => setEmail(newValue)}
      />

      {/* TextField for Password */}
      <TextField
        label="Password"
        value={password}
        onChange={(newValue) => setPassword(newValue)}
      />

      {/* TextField for Role */}
      <TextField
        label="Role"
        value={role}
        onChange={(newValue) => setRole(newValue)}
      />

      {/* Additional content for saving the changes */}
      <button onClick={() => console.log("Save changes")}>Save Changes</button>
    </>
  );
}
