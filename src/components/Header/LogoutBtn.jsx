import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutBtn = ({ className = "" }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setLoader(true);
    authService.logout().then(() => {
      dispatch(logout());
      setLoader(false);
      navigate("/");
    });
  };

  return (
    <button
      disabled={loader}
      onClick={logoutHandler}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 h-10 px-4 py-2 ${className}`}
    >
      {loader ? (
        <ClipLoader color="#ffffff" size={20} />
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </>
      )}
    </button>
  );
};

export default LogoutBtn;
