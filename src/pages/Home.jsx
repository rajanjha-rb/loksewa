import React, { useEffect } from "react";
import { Container, Hero } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus && !userData?.labels?.includes("admin")) {
      navigate("/student-dashboard");
    }
  }, [authStatus, userData, navigate]);

  if (authStatus && userData?.labels?.includes("admin")) {
    return <AdminDashboard />;
  }

  return (
    <div className="w-full">
      <Container>
        <Hero />
      </Container>
    </div>
  );
}

export default Home;
