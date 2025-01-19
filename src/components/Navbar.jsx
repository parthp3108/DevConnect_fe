import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout=async()=>{
try {
  axios.post(BASE_URL+"/logout",{},{withCredentials:true})
  dispatch(removeUser())
  return navigate("/login")
} catch (error) {
  console.error("Error logging out: ", error.message);
  
}
  }
  return (
    <div className="navbar bg-base-300">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">DevConnect</Link>
    </div>
   { user && <div className="flex-none gap-2">
      <div className="form-control">
        Welcome,{user.firstName}
      </div>
      <div className="dropdown dropdown-end mx-5 flex">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="user pic"
              src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile"className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><Link to="/connections">Connection</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>}
  </div>
  )
}

export default Navbar
