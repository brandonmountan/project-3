import React, { useState } from "react";
import NavBar from "./NavBar";
import Home from "./pages/Home";
import Contact from "./pages/Contact"
import About from "./pages/About";
import ProfilePost from "./pages/PostForm";
import LoginSignup from "./pages/Login-Signup";
import Profile from "./pages/Profile";
import Footer from "./Footer";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";


export default function Container() {
  const [currentPage, setCurrentPage] = useState("LoginSignup");

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
    }
    if (currentPage === "Profile") {
      return <Profile />;
    }
    if (currentPage === "About") {
      return <About />;
    }
    if (currentPage === "ProfilePost") {
      return <ProfilePost />;
    }
    if (currentPage === "LoginSignup") {
      return <LoginSignup />;
    }
    return <Contact />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
      <div className="container-fluid justify-content-center">
        <Header />
        {/* We are passing the currentPage from state and the function to update it */}
        {/* Here we are calling the renderPage method which will return a component  */}
        <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div
            className="col-md-9 d-flex justify-content-center align-items-center"
            style={{ minHeight: "70vh" }}
          >
            {renderPage()}
          </div>
        </div>
        <Footer />
      </div>
  );
}

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import Home from './pages/Home';
// import Header from './components/Header';
// import Footer from './components/pages/Footer';
// import NavBar from './components/pages/NavBar';
// import Sidebar from './components/pages/Sidebar'
// import LoginSignup from './components/pages/Login-Signup';
// import About from './components/pages/About';
// import Profile from './components/pages/Profile';
// import ProfilePost from './components/pages/Profile-Post';
// import GamePage from './components/pages/GamePage';


// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <div>
//             {/* <NavBar /> */}
//             <Header />
//             {/* <Footer />
//             <Sidebar /> */}
//             <Routes>
//               <Route
//                 path="/"
//                 element={<Home />}
              // />
              // {/* <Route
              //   path="/LoginSignup"
              //   element={<LoginSignup />}
              // />
              // <Route
              //   path="/profile"
              //   element={<Profile />}
              // />
              // <Route
              //   path="/profilepost"
              //   element={<ProfilePost />}
              // />
              // <Route
              //   path="/gamepage"
              //   element={<GamePage />}
              // />
              // <Route
              //   path="/about"
              //   element={<About />}  */}
              // {/* /> */}
//             </Routes>
//         </div>
//       </Router>
//     </ApolloProvider>
//   );
// }

// export default App;