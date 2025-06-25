import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { LogOut } from "lucide-react";

function LogoutBtn() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const logoutHandler = () => {
    setLoader(true);
    authService.logout().then(() => {
      dispatch(logout());
      setLoader(false);
    });
  };

  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center px-4 py-2">
          <ClipLoader color="#DC2626" size={26} />
        </div>
      ) : (
        <button
          disabled={loader}
          onClick={logoutHandler}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold transition duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      )}
    </>
  );
}

export default LogoutBtn;
