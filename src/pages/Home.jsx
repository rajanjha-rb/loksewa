import React, { useEffect } from "react";
// import contentServices from "../appwrite/config";
import { Container, Hero } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import AdminDashboard from "./AdminDashboard";
function Home() {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setLoading(true);
  //   contentServices.getAllPost().then((post) => {
  //     setPosts(post?.documents || []);
  //     setLoading(false);
  //   });
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="w-full py-8 mt-4 text-center">
  //       <Container>
  //         <h1 className="text-xl font-semibold">Loading...</h1>
  //       </Container>
  //     </div>
  //   );
  // }

  // if (posts.length <= 0) {
  //   return (
  //     <div className="w-full py-8 mt-4 text-center">
  //       <Container>
  //         <div className="flex flex-wrap">
  //           <div className="p-2 w-full">
  //             <h1 className="text-2xl font-bold hover:text-gray-500">
  //               Login to read posts
  //             </h1>
  //           </div>
  //         </div>
  //       </Container>
  //     </div>
  //   );
  // }

  useEffect(() => {
    if (authStatus) {
      navigate("/admin-dashboard");
    }
  }, [authStatus]);

  return (
    <div className="w-full">
      <Container>{!authStatus ? <Hero /> : <Hero />}</Container>
    </div>
  );
}

export default Home;
