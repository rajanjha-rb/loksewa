import { Header, Footer } from "./components";
import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.userData);

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
  }, [dispatch]);

  // Only show Header on the home page ("/"), login, and signup pages, not on any dashboard or if user is admin
  const publicPaths = ["/", "/login", "/signup"];
  const isAdmin = userData?.labels?.includes("admin");
  const showHeader = publicPaths.includes(location.pathname) && !isAdmin;

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {showHeader && <Header />}
      <main className="flex-grow">
        <ScrollToTop />
        <Outlet />
        <ScrollRestoration />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
