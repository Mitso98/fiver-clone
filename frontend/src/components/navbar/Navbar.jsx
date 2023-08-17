import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => window.removeEventListener("scroll", isActive);
  }, []);

  const currentUser = {
    id: 1,
    username: "John Doe",
    isSeller: true,
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Sign in</span>
          {!currentUser?.isSeller && <span>Become A Seller</span>}
          {!currentUser && <button>Join</button>}
          {/* User Info*/}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" to="/">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {active ||
        (pathname !== "/" && (
          <>
            <hr />
            <div className="menu">
              <Link to="/" className="link">
                <span>Graphics & Design</span>
              </Link>
              <Link to="/" className="link">
                <span>Videos & Animation</span>
              </Link>
              <Link to="/" className="link">
                {" "}
                <span>All Services</span>
              </Link>
              <Link to="/" className="link">
                {" "}
                <span>Digital Marketing</span>
              </Link>
              <Link to="/" className="link">
                {" "}
                <span>Music & Audio</span>
              </Link>
              <Link to="/" className="link">
                {" "}
                <span>Programming & Tech</span>
              </Link>
              <Link to="/" className="link">
                {" "}
                <span>Business</span>
              </Link>
              <Link to="/" className="link">
                <span>Lifestyle</span>
              </Link>
            </div>
          </>
        ))}
    </div>
  );
};
export default Navbar;
