import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Welcome Back</h1>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="auth-link">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;