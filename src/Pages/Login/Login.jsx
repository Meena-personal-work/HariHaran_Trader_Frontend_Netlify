// import React, { useState } from "react";
// import "./login.css";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Default check: you can replace with your actual default credentials
//     if (username === "admin" && password === "1234") {
//       alert("Login successful!");
//     } else {
//       alert("Invalid username or password!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Username</label>
//             <input
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="login-btn">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // ✅ import toast
// import "react-toastify/dist/ReactToastify.css"; // ✅ ensure styles are imported
// import "./login.css";

// export default function Login({ onLoginSuccess }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (username === "admin" && password === "1234") {
//       toast.success("Login successful!");
      
//       // ✅ Update parent AdminApp state
//       if (onLoginSuccess) onLoginSuccess();

//       // ✅ Navigate to admin home (ex: /admin/dashboard or /admin)
//       navigate("/admin");
//     } else {
//       toast.error("Invalid username or password!");
//     }
//   };


//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Username</label>
//             <input
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//                 autoComplete="username" 
//             />
//           </div>
//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//                 autoComplete="current-password"
//             />
//           </div>
//           <button type="submit" className="login-btn">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  // ✅ Load saved creds from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");
    if (savedUser && savedPass) {
      setUsername(savedUser);
      setPassword(savedPass);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      toast.success("Login successful!");

      if (remember) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }

      if (onLoginSuccess) onLoginSuccess();
      navigate("/admin");
    } else {
      toast.error("Invalid username or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label>Remember me</label>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
