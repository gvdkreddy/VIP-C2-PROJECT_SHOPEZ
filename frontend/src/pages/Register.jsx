import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleRegister =
    async () => {

      if (
        password !== confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      try {
        await axios.post(
          "http://localhost:5000/api/users/register",
          {
            name,
            email,
            password,
          }
        );

        alert(
          "Registration Successful"
        );

        navigate("/login");

      } catch (error) {
        alert(
          "Registration Failed"
        );
      }
    };

  return (
    <div className="register-page">
      <div className="register-card">

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;