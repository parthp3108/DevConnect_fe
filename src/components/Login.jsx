import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, SetEmailId] = useState("parth3120@gmail.com");
  const [password, SetPassword] = useState("Parth@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleLogin = async () => {

   
    try {
      const res = await axios.post(
        BASE_URL + `/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.error("Error logging in: ", error);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + `/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.error("Error signing up: ", error);
    }
  };
  return (
    <div className=" flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              {!isLoginForm && (
                <>
                  {" "}
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => SetEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                placeholder="Enter the password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => SetPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm ? "New User Signup here" : "Existing user login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
