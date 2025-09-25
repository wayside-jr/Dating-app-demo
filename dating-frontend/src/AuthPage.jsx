import SignupForm from "./SignupForm";
import { FaTiktok, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

// Horizontal login form for navbar
function HorizontalLoginForm() {
  return (
    <form style={{ display: "flex", gap: "15px", alignItems: "center" }}>
      <input
        type="email"
        placeholder="Email"
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </form>
  );
}

export default function AuthPage() {
  return (
    <div style={{ width: "100vw", boxSizing: "border-box" }}>
      {/* Navbar */}
      <nav
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between", // logo left, login form right
          alignItems: "center",
          padding: "10px 40px",
          backgroundColor: "rgba(255,255,255,0.9)",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Gets Who Gets You</div>
        <HorizontalLoginForm />
      </nav>

      {/* Spacer */}
      <div style={{ height: "80px" }}></div>

      {/* Hero section */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          backgroundImage: "url('/sajad-nazeran-g3Wi7ud9IZA-unsplash.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: "40px",
            borderRadius: "10px",
            maxWidth: "500px",
          }}
        >
          <h1 style={{ fontSize: "60px", marginBottom: "10px" }}>Gets Who</h1>
          <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>Gets You</h1>
          <h2>Sign Up</h2>
          <SignupForm />
        </div>
      </div>

      {/* Three info divs */}
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "250px",
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "lightgray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 style={{ fontSize: "30px", textAlign: "center", color: "black" }}>
            The 1# Trusted App
          </h5>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "lightcoral",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 style={{ fontSize: "30px", textAlign: "center", color: "black" }}>
            Get a Date within 10 minutes
          </h5>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "brown",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 style={{ fontSize: "30px", textAlign: "center", color: "white" }}>
            Match and Find Love
          </h5>
        </div>
      </div>

      {/* Three images with captions */}
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "250px",
          gap: "20px",
          padding: "40px 20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="/allef-vinicius-0dXvugMScIY-unsplash.jpg"
            alt="Photo 1"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
          <h5 style={{ fontSize: "20px", marginTop: "10px" }}>Millions Have Find Love</h5>
        </div>

        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="/allef-vinicius-pOrrjxBo6i4-unsplash.jpg"
            alt="Photo 2"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
          <h5 style={{ fontSize: "20px", marginTop: "10px" }}>Finds The Person Who Matches</h5>
        </div>

        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="/freddie-addery-UlcD_8t_zek-unsplash.jpg"
            alt="Photo 3"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
          <h5 style={{ fontSize: "20px", marginTop: "10px" }}>Love That Lasts Forever</h5>
        </div>
      </div>

      {/* Footer social media icons */}
      <footer
        style={{
          width: "100%",
          backgroundColor: "#222",
          padding: "60px 20px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
          <FaTiktok size={30} color="white" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} color="white" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF size={30} color="white" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={30} color="white" />
        </a>
          <h5>HeartLink</h5>
      </footer>
    </div>
  );
}
