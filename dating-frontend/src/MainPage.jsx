import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  // Left panel info
  const username = localStorage.getItem("username") || "No username";
  const email = localStorage.getItem("email") || "No email";
  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem("profilePhoto") || ""
  );

  // Placeholder users for right panel (20 users with pictures)
  const [users, setUsers] = useState([
    { id: 1, username: "Alice", email: "alice@example.com", pic: "https://i.pravatar.cc/300?img=1", likes: 0 },
    { id: 2, username: "Bob", email: "bob@example.com", pic: "https://i.pravatar.cc/300?img=2", likes: 0 },
    { id: 3, username: "Charlie", email: "charlie@example.com", pic: "https://i.pravatar.cc/300?img=3", likes: 0 },
    { id: 4, username: "David", email: "david@example.com", pic: "https://i.pravatar.cc/300?img=4", likes: 0 },
    { id: 5, username: "Eve", email: "eve@example.com", pic: "https://i.pravatar.cc/300?img=5", likes: 0 },
    { id: 6, username: "Frank", email: "frank@example.com", pic: "https://i.pravatar.cc/300?img=6", likes: 0 },
    { id: 7, username: "Grace", email: "grace@example.com", pic: "https://i.pravatar.cc/300?img=7", likes: 0 },
    { id: 8, username: "Hannah", email: "hannah@example.com", pic: "https://i.pravatar.cc/300?img=8", likes: 0 },
    { id: 9, username: "Ian", email: "ian@example.com", pic: "https://i.pravatar.cc/300?img=9", likes: 0 },
    { id: 10, username: "Jane", email: "jane@example.com", pic: "https://i.pravatar.cc/300?img=10", likes: 0 },
    { id: 11, username: "Kevin", email: "kevin@example.com", pic: "https://i.pravatar.cc/300?img=11", likes: 0 },
    { id: 12, username: "Laura", email: "laura@example.com", pic: "https://i.pravatar.cc/300?img=12", likes: 0 },
    { id: 13, username: "Mike", email: "mike@example.com", pic: "https://i.pravatar.cc/300?img=13", likes: 0 },
    { id: 14, username: "Nina", email: "nina@example.com", pic: "https://i.pravatar.cc/300?img=14", likes: 0 },
    { id: 15, username: "Oscar", email: "oscar@example.com", pic: "https://i.pravatar.cc/300?img=15", likes: 0 },
    { id: 16, username: "Paula", email: "paula@example.com", pic: "https://i.pravatar.cc/300?img=16", likes: 0 },
    { id: 17, username: "Quinn", email: "quinn@example.com", pic: "https://i.pravatar.cc/300?img=17", likes: 0 },
    { id: 18, username: "Rachel", email: "rachel@example.com", pic: "https://i.pravatar.cc/300?img=18", likes: 0 },
    { id: 19, username: "Steve", email: "steve@example.com", pic: "https://i.pravatar.cc/300?img=19", likes: 0 },
    { id: 20, username: "Tina", email: "tina@example.com", pic: "https://i.pravatar.cc/300?img=20", likes: 0 },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePhoto");
    navigate("/");
  }

  function handleChat(user) {
    localStorage.setItem("chatUser", JSON.stringify(user));
    navigate("/chat");
  }

  function handleLike() {
    const updatedUsers = [...users];
    updatedUsers[currentIndex].likes += 1;
    setUsers(updatedUsers);
  }

  function handlePrev() {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : users.length - 1));
  }

  function handleNext() {
    setCurrentIndex((prev) => (prev < users.length - 1 ? prev + 1 : 0));
  }

  const currentUser = users[currentIndex];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Left Panel */}
      <div
        style={{
          width: "25%",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#ddd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              No Photo
            </div>
          )}
          <p style={{ margin: "5px 0 0 0", fontWeight: "bold" }}>Username: {username}</p>
          <p style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight:"bold", marginRight:"70px"}}>Email: {email}</p>
          <button
            onClick={() => navigate("/edit-profile")}
            style={{ marginTop: "10px", padding: "8px 12px", fontSize: "14px", marginRight:"120px"}}
          >
            Edit Profile
          </button>
        </div>
        <button
          onClick={handleLogout}
          style={{ padding: "10px", marginTop: "20px", marginLeft:"150px" }}
        >
          Logout
        </button>
      </div>

      {/* Right Panel */}
      <div
        style={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "280px",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={handlePrev}
        >
          ◀
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "30px",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={handleNext}
        >
          ▶
        </div>

        {currentUser && (
          <div
            style={{
              width: "400px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              marginLeft: "300px",
            }}
          >
            <img
              src={currentUser.pic}
              alt={currentUser.username}
              style={{ width: "100%", borderRadius: "15px" }}
            />
            <h2>{currentUser.username}</h2>
            <p>{currentUser.email}</p>
            <button
              onClick={() => handleChat(currentUser)}
              style={{ marginTop: "10px", padding: "8px 15px" }}
            >
              Chat
            </button>
            <div
              style={{ marginTop: "10px", fontSize: "18px", cursor: "pointer" }}
              onClick={handleLike}
            >
              ❤️ {currentUser.likes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
