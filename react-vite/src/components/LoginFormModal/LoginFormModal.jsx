import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <i className="fa-brands fa-flickr"></i>
      <h1>Log in to Clickr </h1>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <input
            placeholder="Email address"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {errors.email && <p>{errors.email}</p>}
        <div>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.password && <p>{errors.password}</p>}
        <div
          style={{
            backgroundColor: "blue ",
            color: "white",
            boxShadow: "5px 5px 5px black",
            height: "30px",
          }}
        >
          <button type="submit">Sign In</button>
        </div>

        <div className="remember_email">
          <div>
            <h3>Remember email address</h3>
          </div>
        </div>
        <div>Forgot password?</div>
        <div>
          Not a Clickr member? <a href>Sign up here</a>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
