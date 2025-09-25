import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();

  // Current user info from localStorage
  const currentUsername = localStorage.getItem("username") || "No username";
  const currentEmail = localStorage.getItem("email") || "No email";
  const currentPhoto = localStorage.getItem("profilePhoto") || "";

  // Form state
  const [username, setUsername] = useState(currentUsername);
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(currentPhoto);
  const [message, setMessage] = useState("");

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPhoto(event.target.result);
      reader.readAsDataURL(file);
    }
  }

  function handlePhotoClick() {
    document.getElementById("photoUpload").click();
  }

  function handleSave(e) {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("profilePhoto", photo);
    setMessage("Profile updated successfully!");
  }

  function handleCancel() {
    navigate("/main");
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Left Panel: current profile info */}
      <div
        style={{
          width: "25%",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h2>Current Profile</h2>
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt="Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              backgroundColor: "#ddd",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
            }}
          >
            No Photo
          </div>
        )}
        <p><strong>Username:</strong> {currentUsername}</p>
        <p style={{marginBottom:"100px", marginRight:"50px"}}><strong>Email:</strong> {currentEmail}</p>
      </div>

      {/* Right Panel: profile photo + form side by side */}
      <div
        style={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          padding: "40px",
          boxSizing: "border-box",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "30px", alignItems: "flex-start", justifyContent: "center" }}>
          {/* Profile photo circle + upload button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#ddd",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={handlePhotoClick}
            >
              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  No Photo
                </span>
              )}
            </div>
            <button
              onClick={handlePhotoClick}
              style={{
                padding: "8px 12px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#2196F3",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {photo ? "Update Photo" : "Upload Photo"}
            </button>
          </div>

          {/* Form fields */}
          <form
            onSubmit={handleSave}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "300px",
            }}
          >
            <h2>Edit Profile</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
            />
          </form>
        </div>

        {/* Buttons at bottom right */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "300px" ,marginLeft:"400px" }}>
          <button
            onClick={handleCancel}
            style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#f44336", color: "#fff", border: "none" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#4CAF50", color: "#fff", border: "none" }}
          >
            Save
          </button>
        </div>

        {message && <p style={{ marginTop: "20px", color: "green", alignSelf: "center" }}>{message}</p>}

        {/* Hidden file input */}
        <input
          type="file"
          id="photoUpload"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
