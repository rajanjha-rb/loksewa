import { Header, Footer } from "./components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const hideHeader = location.pathname.includes("/admin-dashboard");

  console.log("Current path:", location.pathname);
  console.log("hideHeader:", hideHeader);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {!hideHeader && <Header />}
      <main className="flex-grow">
        <Outlet />
        <ScrollRestoration />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
