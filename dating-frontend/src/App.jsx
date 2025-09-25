import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import MainPage from "./MainPage";
import EditProfilePage from "./EditProfilePage"; // ✅ new import
import ChatPage from "./ChatPage"; // ✅ added ChatPage import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} /> {/* new route */}
        <Route path="/chat" element={<ChatPage />} /> {/* ✅ new ChatPage route */}
      </Routes>
    </Router>
  );
}

export default App;
