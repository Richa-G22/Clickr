import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/photos/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   return setErrors({
    //     confirmPassword:
    //       "Confirm Password field must be the same as the Password field",
    //   });
    // }

    const validationErrors = {};
    if (!username.trim()) validationErrors.username = "Username is required";
    if (!firstname.trim()) validationErrors.firstname = "First name is required";
    if (!lastname.trim()) validationErrors.lastname = "Last name is required";
    if (!email.trim()) validationErrors.email = "Email is required";
    if (!password.trim()) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        username,
        firstname,
        lastname,
        email,
        password
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/photos/");
    }
  };

  return (
    <>
      <i className="fa-brands fa-flickr"></i>
      <h1>Sign Up for Clickr</h1>
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="First name"
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />

        {errors.firstname && (
          <p className="error-message">{errors.firstname}</p>
        )}
        <input
          placeholder="Last name"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />

        {errors.lastname && <p className="error-message">{errors.lastname}</p>}

        <input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {errors.email && <p className="error-message">{errors.email}</p>}
        {/* <label>
          Username */}
        <input
          type="text"
          placeholder="Usename"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {/* </label> */}
        {errors.username && <p className="error-message">{errors.username}</p>}

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errors.password && <p className="error-message">{errors.password}</p>}
        {/* <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
